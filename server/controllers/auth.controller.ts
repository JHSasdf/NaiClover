import { Request, Response, NextFunction } from 'express';
import * as bcrypt from 'bcrypt';
import { db } from '../model';
const User = db.User;
const Lang = db.Lang;

export async function login(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void | Response> {
    // isLoggedin이 true일 경우 userid 값을 쿠키에 넣어줌. 이걸로 프론트 단에서 로그인 기능 구현
    const { userid, password } = req.body;
    if (!userid || userid.trim().length === 0) {
        return res.json({
            msg: 'Please input ID.',
            isLoggedin: false,
            userid: null,
        });
    }

    if (!password || password.trim().length === 0) {
        return res.json({
            msg: 'Please input Password.',
            isLoggedin: false,
            userid: null,
        });
    }
    let existingUser;
    try {
        existingUser = await User.findOne({ where: { userid: userid } });
    } catch (err) {
        return res.json({
            msg: 'An Error Occurred ',
            isLoggedin: false,
            userid: null,
        });
    }
    if (!existingUser) {
        return res.json({
            msg: 'No account finded! Check ID and Password input.',
            isLoggedin: false,
            userid: null,
        });
    }

    if (!bcrypt.compareSync(password, existingUser.password)) {
        return res.json({
            msg: 'No account finded! Check ID and Password input.',
            isLoggedin: false,
            userid: null,
        });
    }

    req.session.userid = userid;
    res.json({ msg: null, isLoggedin: true, userid: userid });
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
        nation,
        firLang,
        learningLang,
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
            msg: 'Please Execute ID Valid check',
            isError: true,
        });
    }

    if (!userid || userid.trim().length <= 3) {
        return res.json({
            msg: 'ID should be at least 4 characters long.',
            isError: true,
        });
    }

    if (!password || password.trim().length <= 5) {
        return res.json({
            msg: 'Password should be at least 4 characters long.',
            isError: true,
        });
    }

    if (!(password === confirmPassword)) {
        return res.json({
            msg: `There's a difference between password and confirm password`,
            isError: true,
        });
    }

    if (!name || name.trim().length < 2) {
        return res.json({
            msg: 'Name should be at least 2 characters long',
            isError: true,
        });
    }

    if (!(gender === 'm' || gender === 'f')) {
        return res.json({
            msg: 'Please Select your Gender.',
            isError: true,
        });
    }
    if (!nation || nation.trim().length < 2) {
        return res.json({
            msg: 'Please Select your nation.',
            isError: true,
        });
    }

    if (!firLang || firLang.trim().length < 2) {
        return res.json({
            msg: 'Please Select your first Language.',
            isError: true,
        });
    }

    if (!learningLang || learningLang.length < 1) {
        return res.json({
            msg: 'Plase Select some Languages at least 1',
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
            nation: nation,
            firLang: firLang,
        });
        for (const lang of learningLang) {
            await Lang.create({
                userid: userid,
                learningLang: lang,
            });
        }
    } catch (err) {
        return next(err);
    }
    return res.json({ msg: null, isError: false });
}

export async function existAlready(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const { userid } = req.body;
    if (userid.trim().length < 4) {
        return res.json({
            msg: 'ID should be at least 4 characters long.',
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
        res.json({ msg: 'ID already exists.', isUnique: false });
    } else {
        res.json({ msg: 'ID can be generated.', isUnique: true });
    }
}
