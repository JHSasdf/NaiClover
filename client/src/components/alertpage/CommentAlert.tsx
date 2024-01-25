import { useState, useEffect } from 'react';
import '../../styles/AlertPageCommentAlert.scss';

function CommentAlert(props: any) {
    const { alarmObj, validTime } = props;
    const [alarmClassName, setAlarmClassName] = useState(
        'monotalkalert-container'
    );

    useEffect(() => {
        if (!(validTime && alarmObj.checked)) {
            setAlarmClassName('monotalkalert-oldcontainer');
        }
    }, [validTime, alarmObj.checked]);
    return (
        <>
            <div className={alarmClassName}>
                <div className="commentalert-title">
                    <span className="commentalert-username">
                        {alarmObj.otherUserId}
                    </span>
                    님이 댓글을 작성했습니다.
                </div>
                <div className="commentalert-content">{alarmObj.preview}</div>
            </div>
            <div className="bottom-line"></div>
        </>
    );
}

export default CommentAlert;
