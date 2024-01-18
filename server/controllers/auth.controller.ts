import { Request, Response, NextFunction } from 'express';
import * as bcrypt from 'bcrypt';
import { db } from '../model';
const User = db.User;

export async function login(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> {
  const { userid, password } = req.body;

  if (!userid || userid.trim().length === 0) {
    return res.json({
      msg: '아이디를 입력해주세요.',
      isLoggedin: false,
      userid: null,
    });
  }

  if (!password || password.trim().length === 0) {
    return res.json({
      msg: '비밀번호를 입력해주세요.',
      isLoggedin: false,
      userid: null,
    });
  }
  let existingUser;
  try {
    existingUser = await User.findOne({ where: { userid: userid } });
  } catch (err) {
    return res.json({ msg: 'gsggs', err: err });
  }
  if (!existingUser) {
    return res.json({
      msg: '아이디 혹은 비밀번호가 다릅니다.',
      isLoggedin: false,
    });
  }

  if (!bcrypt.compareSync(password, existingUser.password)) {
    return res.json({
      msg: '아이디 혹은 비밀번호가 다릅니다.',
      isLoggedin: false,
    });
  }

  res.json({ msg: '로그인 성공', isLoggedin: true, userid: userid });
}

export async function signup(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
  const {
    userid,
    password,
    confirmPassword,
    name,
    gender,
    isUnique,
    country,
    firLang,
    learnLang,
  } = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({
      where: { userid: req.body.userid },
    });
  } catch (err) {
    return next(err);
  }

  if (!isUnique || JSON.parse(isUnique) == false || existingUser) {
    return res.json({
      msg: '중복검사를 실시해주세요',
      isError: true,
    });
  }

  if (!userid || userid.trim().length <= 3) {
    return res.json({
      msg: '아이디를 4자 이상으로 입력해주세요.',
      isError: true,
    });
  }

  if (!password || password.trim().length <= 5) {
    return res.json({
      msg: '비밀번호를 6자 이상으로 입력해주세요.',
      isError: true,
    });
  }

  if (!(password === confirmPassword)) {
    return res.json({
      msg: '비밀번호와 비밀번호 확인이 다릅니다.',
      isError: true,
    });
  }

  if (!name || name.trim().length < 2) {
    return res.json({
      msg: '두 글자 이상의 이름을 입력해주세요.',
      isError: true,
    });
  }

  const hashPW: string = bcrypt.hashSync(password, 12);
  try {
    const result = await User.create({
      userid: userid,
      name: name,
      password: hashPW,
      gender: gender,
      country: country,
      firLang: firLang,
      learnLang: learnLang,
    });
  } catch (err) {
    return next(err);
  }
  return res.json({ msg: '완료.', isError: false });
}

export async function existAlready(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { userid } = req.body;
  if (userid.trim().length < 4) {
    return res.json({
      msg: '아이디를 4자 이상으로 입력해주세요.',
      isUnique: false,
    });
  }
  let existingUser;
  try {
    existingUser = await User.findOne({
      where: { userid: userid },
    });
  } catch (err) {
    return next(err);
  }
  if (existingUser) {
    res.json({ msg: '이미 존재하는 아이디입니다.', isUnique: false });
  } else {
    res.json({ msg: '아이디 생성 가능합니다.', isUnique: true });
  }
}
