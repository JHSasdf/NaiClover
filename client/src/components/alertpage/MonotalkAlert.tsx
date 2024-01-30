import { useEffect, useRef, useState } from 'react';
import '../../styles/AlertPageMonotalkAlert.scss';

function MonotalkAlert(props: any) {
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
                <div className="monotalkalert-title">
                    <span className="monotalkalert-username">
                        {alarmObj.otherUserId}
                    </span>
                    님이 새 모노톡을 개설했습니다{' '}
                </div>
                <div className="monotalkalert-content">
                    {alarmObj.createdAt}
                </div>
            </div>
            <div className="bottom-line"></div>
        </>
    );
}

export default MonotalkAlert;
