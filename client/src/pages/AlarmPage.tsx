import { useCookies } from 'react-cookie';
import { useEffect, useRef, useState } from 'react';
import { User } from '../types/types';
import axios from 'axios';

function AlarmPage() {
    const [cookies, setCookies, removeCookies] = useCookies(['id']);
    // setCookies('id', '유저아이디', cookieConfig);
    const idCookie = cookies['id'];
    const [alarmList, setAlarmList] = useState([]);

    const getAlarms = async () => {
        try {
            const res = await axios({
                method: 'get',
                url: '/getAlarmList',
                params: {
                    userid: idCookie,
                },
            });
            setAlarmList(res.data.list);
        } catch (error) {
            alert(`잘못된 접근입니다. Error: ${error}`);
        }
    };

    useEffect(() => {
        getAlarms();
    }, []);

    return (
        <>
            <h1>{idCookie}의 알람</h1>
            <br />
            <a href="/follow">follow로 돌아가기</a>
            <br />
            {alarmList.map((element: any, key: any) => {
                const createdAtDate = new Date(element.createdAt);
                const currentDate = new Date();
                const validTime =
                    currentDate.getTime() - createdAtDate.getTime() <
                    30 * 60 * 1000; // 이건 30분
                // ) > 3일 * 24시간 * 60분 * 60초 * 1000; 이게 3일
                if (element.alarmType == 0) {
                    return (
                        <li key={key}>
                            {element.otherUserId}님이 게시물에 댓글을
                            달았습니다.
                            {!validTime && element.checked ? 'old' : 'new'}
                        </li>
                    );
                } else if (element.alarmType == 1) {
                    return (
                        <li key={key}>
                            {element.otherUserId}님이 팔로우 하셨습니다.{' '}
                            {!validTime && element.checked ? 'old' : 'new'}
                        </li>
                    );
                } else if (element.alarmType == 2) {
                    return (
                        <li key={key}>
                            {element.otherUserId}님이 질문을 등록 하셨습니다.{' '}
                            {!validTime && element.checked ? 'old' : 'new'}
                        </li>
                    );
                } else if (element.alarmType == 3) {
                    return (
                        <li key={key}>
                            {element.otherUserId}님이 모노톡방을 개설
                            하셨습니다.{' '}
                            {!validTime && element.checked ? 'old' : 'new'}
                        </li>
                    );
                } else {
                    return null;
                }
            })}
        </>
    );
}

export default AlarmPage;
