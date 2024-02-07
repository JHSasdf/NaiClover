import { cookieConfig } from '../utils/cookieConfig';
import { useCookies } from 'react-cookie';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { ListFormat } from 'typescript';
import { User } from '../types/types';
import useErrorHandler from '../utils/useErrorHandler';

function FollowPage() {
    const { errorHandler } = useErrorHandler();
    const [cookies, setCookies, removeCookies] = useCookies(['id']);
    // setCookies('id', '유저아이디', cookieConfig);
    const [followingNum, setFollowingNum] = useState<Number>(0);
    const [followerNum, setFollowerNum] = useState<Number>(0);
    const [followingList, setFollowingList] = useState<User[]>([]);
    const [followerList, setFollowerList] = useState<User[]>([]);
    const [newAlarmNum, setNewAlarmNum] = useState<Number>(0);
    const idCookie = cookies['id'];
    const target = useRef<any>();
    const here = useRef<any>();

    const followNumGet = async () => {
        try {
            const res = await axios({
                method: 'get',
                url: `${process.env.REACT_APP_SERVERURL}/followNumGet`,
                params: {
                    userid: idCookie,
                },
                withCredentials: true,
            });
            setFollowingNum(res.data.followingNumber);
            setFollowerNum(res.data.followerNumber);
        } catch (error: any) {
            errorHandler(error.response.status);
            console.log('error:', error);
        }
    };
    const followListGet = async () => {
        try {
            const res = await axios({
                method: 'get',
                url: `${process.env.REACT_APP_SERVERURL}/followListGet`,
                params: {
                    userid: idCookie,
                },
                withCredentials: true,
            });
            setFollowingList(res.data.followingList);
            setFollowerList(res.data.followerList);
        } catch (error: any) {
            errorHandler(error.response.status);
            console.log('error:', error);
        }
    };
    const newAlarmNumGet = async () => {
        try {
            const res = await axios({
                method: 'get',
                url: `${process.env.REACT_APP_SERVERURL}/newAlarmNumGet`,
                params: {
                    userid: idCookie,
                },
                withCredentials: true,
            });
            setNewAlarmNum(res.data.newAlarmNumber);
        } catch (error: any) {
            errorHandler(error.response.status);
            console.log('error:', error);
        }
    };
    useEffect(() => {
        followNumGet();
        followListGet();
        newAlarmNumGet();
    }, []);
    const followinput = useRef<HTMLInputElement>(null);
    const follow = async () => {
        const res = await axios({
            method: 'post',
            url: `${process.env.REACT_APP_SERVERURL}/followexec`,
            data: {
                userid: idCookie,
                followId: followinput.current?.value,
            },
            withCredentials: true,
        });
    };
    const unfollow = async () => {
        const res = await axios({
            method: 'post',
            url: `${process.env.REACT_APP_SERVERURL}/unfollowexec`,
            data: {
                userid: idCookie,
                followId: followinput.current?.value,
            },
            withCredentials: true,
        });
    };
    const border = {
        border: '5px solid black',
    };
    const correctionTrial = () => {
        here.current.defaultValue = target.current?.innerText;
    };
    const identWord = (sen1: string, sen2: string): boolean | undefined => {
        let i = 0;
        for (let i = 0; i < sen1.length; i++) {
            if (!sen2[i] || sen1[i] !== sen2[i]) return false;
        }
        return true;
    };
    const correctionExec = () => {
        let i = 0;
        let j = 0;
        let pivot;
        let origin: string = target.current.innerText;
        let corrected: string = here.current.value;

        console.log(origin);
        console.log(corrected);
    };
    return (
        <>
            <div style={border} ref={target}>
                ㅇㄹㅇㄹㅇㄹ
            </div>
            <button onClick={() => correctionTrial()}>수정</button>
            <input type="text" ref={here} />
            <button onClick={() => correctionExec()}>수정완료</button>
            <br />
            <textarea name="" id="" cols={30} rows={10}></textarea>
            나: {{ idCookie } ? <p>{idCookie}</p> : <p>로그인안됨</p>}
            <br />
            상대방 :{' '}
            <input type="text" placeholder="otherUser" ref={followinput} />
            <br />
            <button onClick={() => follow()}>follow</button>
            <br />
            <button onClick={() => unfollow()}>unfollow</button>
            <br />
            팔로워 수 : {followerNum}
            <br />
            팔로잉 수 : {followingNum}
            <br />
            알람갯수: {newAlarmNum}
            <br />
            나를 팔로잉한 사람 :
            <ul>
                {followerList.map((follower) => (
                    <li key={`follower_${follower.userid}`}>{follower.name}</li>
                ))}
            </ul>
            <br />
            내가 팔로우한 사람 :
            <ul>
                {followingList.map((following) => (
                    <li key={`following_${following.userid}`}>
                        {following.name}
                    </li>
                ))}
            </ul>
            <a href="alarm">알람페이지</a>
        </>
    );
}

export default FollowPage;
