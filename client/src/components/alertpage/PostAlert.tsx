import '../../styles/AlertPagePostAlert.scss';

function PostAlert(props: any) {
    const { alarmObj, validTime } = props;
    return (
        <>
            <div className="postalert-container">
                <div className="postalert-title">
                    <span className="postalert-username">
                        {alarmObj.otherUserId}
                    </span>
                    님이 새 포스트를 작성했습니다
                    {!validTime && alarmObj.checked ? 'old' : 'new'}
                </div>
                <div className="postalert-content">{alarmObj.preview}</div>
            </div>
            <div className="bottom-line"></div>
        </>
    );
}

export default PostAlert;
