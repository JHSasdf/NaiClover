import { cookieConfig } from '../utils/cookieConfig';
import { useCookies } from 'react-cookie';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { ListFormat } from 'typescript';
import { User } from '../types/types';

function FollowPage() {
    const [cookies, setCookies, removeCookies] = useCookies(['id']);
    // setCookies('id', '유저아이디', cookieConfig);
    const [followingNum, setFollowingNum] = useState<Number>(0);
    const [followerNum, setFollowerNum] = useState<Number>(0);
    const [followingList, setFollowingList] = useState<User[]>([]);
    const [followerList, setFollowerList] = useState<User[]>([]);
    const idCookie = cookies['id'];

    const followNumGet = async () => {
        try {
            const res = await axios({
                method: 'get',
                url: '/followNumGet',
                params: {
                    userid: idCookie,
                },
            });
            setFollowingNum(res.data.followingNumber);
            setFollowerNum(res.data.followerNumber);
        } catch (error) {
            console.log('error:', error);
        }
    };
    const followListGet = async () => {
        try {
            const res = await axios({
                method: 'get',
                url: '/followListGet',
                params: {
                    userid: idCookie,
                },
            });
            setFollowingList(res.data.followingList);
            setFollowerList(res.data.followerList);
        } catch (error) {
            console.log('error:', error);
        }
    };
    useEffect(() => {
        followNumGet();
        followListGet();
    }, []);
    const followinput = useRef<HTMLInputElement>(null);
    const follow = async () => {
        const res = await axios({
            method: 'post',
            url: '/followexec',
            data: {
                userid: idCookie,
                followId: followinput.current?.value,
            },
        });
    };
    const unfollow = async () => {
        const res = await axios({
            method: 'post',
            url: '/unfollowexec',
            data: {
                userid: idCookie,
                followId: followinput.current?.value,
            },
        });
    };

    return (
        <>
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
            팔로잉리스트 :
            {followingList.forEach((element) => {
                <div>{element.userid}</div>;
            })}
            ;
        </>
    );
}

export default FollowPage;
