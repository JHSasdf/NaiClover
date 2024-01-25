import '../../styles/AlertPageCommentAlert.scss';

function CommentAlert(props: any) {
    const { alarmObj, validTime } = props;
    return (
        <>
            <div className="commentalert-container">
                <div className="commentalert-title">
                    <span className="commentalert-username">
                        {alarmObj.otherUserId}
                    </span>
                    님이 댓글을 작성했습니다.
                    {!validTime && alarmObj.checked ? 'old' : 'new'}
                </div>
                <div className="commentalert-content">{alarmObj.preview}</div>
            </div>
            <div className="bottom-line"></div>
        </>
    );
}

export default CommentAlert;
