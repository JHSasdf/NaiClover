import { useState, useEffect } from 'react';
import '../../styles/AlertPageFollowAlert.scss';
function FollowAlert(props: any) {
    const { alarmObj, validTime } = props;
    const [alarmClassName, setAlarmClassName] = useState(
        'monotalkalert-container'
    );

    useEffect(() => {
        console.log('validTime:', validTime);
        console.log('alarmObj', alarmObj);

        if (!validTime && alarmObj.checked) {
            setAlarmClassName('monotalkalert-oldcontainer');
        }
    }, []);
    return (
        <>
            <div className={alarmClassName}>
                <div className="followalert-title">
                    <span className="followalert-username">
                        {alarmObj.otherUserId}
                    </span>
                    님이 팔로우를 했습니다
                </div>
            </div>
            <div className="bottom-line"></div>
        </>
    );
}

export default FollowAlert;
