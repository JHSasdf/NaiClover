import React, { useEffect, useState } from 'react';
import CommentAlert from './CommentAlert';
import FollowAlert from './FollowAlert';
import MonotalkAlert from './MonotalkAlert';
import PostAlert from './PostAlert';
import axios from 'axios';
import '../../styles/AlertPageAlertsList.scss';

function AlertsList(props: any) {
    const { userid } = props;
    const [alarmList, setAlarmList] = useState([]);

    const getAlarms = async () => {
        try {
            const res = await axios({
                method: 'get',
                url: `${process.env.REACT_APP_SERVERURL}/getAlarmList`,
                params: {
                    userid: userid,
                },
                withCredentials: true,
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
            <div className="alertslist-container">
                {alarmList?.reduceRight(
                    (accumulator: any, element: any, key: any) => {
                        const createdAtDate = new Date(element.createdAt);
                        const currentDate = new Date();
                        const validTime =
                            currentDate.getTime() - createdAtDate.getTime() <
                            30 * 60 * 1000; // 이건 30분
                        // ) > 3일 * 24시간 * 60분 * 60초 * 1000; 이게 3일
                        if (element.alarmType == 0) {
                            accumulator.push(
                                <div key={key}>
                                    <CommentAlert
                                        alarmObj={element}
                                        validTime={validTime}
                                    />
                                </div>
                            );
                        } else if (element.alarmType == 1) {
                            accumulator.push(
                                <div key={key}>
                                    <FollowAlert
                                        alarmObj={element}
                                        validTime={validTime}
                                    />
                                </div>
                            );
                        } else if (element.alarmType == 2) {
                            accumulator.push(
                                <div key={key}>
                                    <PostAlert
                                        alarmObj={element}
                                        validTime={validTime}
                                    />
                                </div>
                            );
                        } else if (element.alarmType == 3) {
                            accumulator.push(
                                <li key={key}>
                                    <MonotalkAlert
                                        alarmObj={element}
                                        validTime={validTime}
                                    />
                                </li>
                            );
                        }
                        return accumulator;
                    },
                    []
                )}
            </div>
        </>
    );
}

export default AlertsList;
