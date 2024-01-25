import '../../styles/AlertPageFollowAlert.scss';

function FollowAlert(props: any) {
    const { alarmObj, validTime } = props;
    return (
        <>
            <div className="followalert-container">
                <div className="followalert-title">
                    <span className="followalert-username">
                        {alarmObj.otherUserId}
                    </span>
                    님이 팔로우를 했습니다
                    {!validTime && alarmObj.checked ? 'old' : 'new'}
                </div>
            </div>
            <div className="bottom-line"></div>
        </>
    );
}

export default FollowAlert;
