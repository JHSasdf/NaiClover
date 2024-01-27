import { useState, useEffect } from 'react';
import '../../styles/AlertPagePostAlert.scss';

function PostAlert(props: any) {
    const { alarmObj, validTime } = props;
    const [alarmClassName, setAlarmClassName] = useState(
        'monotalkalert-container'
    );

    useEffect(() => {
        if (!validTime && alarmObj.checked) {
            setAlarmClassName('monotalkalert-oldcontainer');
        }
    }, []);
    return (
        <>
            <div className={alarmClassName}>
                <div className="postalert-title">
                    <span className="postalert-username">
                        {alarmObj.otherUserId}
                    </span>
                    님이 새 포스트를 작성했습니다
                </div>
                <div className="postalert-content">{alarmObj.preview}</div>
                <div>{alarmObj.createdAt}</div>
            </div>
            <div className="bottom-line"></div>
        </>
    );
}

export default PostAlert;
