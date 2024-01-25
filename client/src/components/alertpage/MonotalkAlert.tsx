import '../../styles/AlertPageMonotalkAlert.scss';

function MonotalkAlert(props: any) {
    const { alarmObj, validTime } = props;
    return (
        <>
            <div className="monotalkalert-container">
                <div className="monotalkalert-title">
                    <span className="monotalkalert-username">
                        {alarmObj.otherUserId}
                    </span>
                    님이 새 모노톡을 개설했습니다{' '}
                    {!validTime && alarmObj.checked ? 'old' : 'new'}
                </div>
                <div className="monotalkalert-content">{alarmObj.preview}</div>
            </div>
            <div className="bottom-line"></div>
        </>
    );
}

export default MonotalkAlert;
