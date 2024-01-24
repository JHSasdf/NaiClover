import '../../styles/AlertPageCommentAlert.scss';

function CommentAlert() {
    return ( 
        <>
            <div className='commentalert-container'>
                <div className='commentalert-title'>
                    <span className='commentalert-username'>Username</span>님이 댓글을 작성했습니다.
                </div>
                <div className='commentalert-content'>
                    Hello. Nice to meet you!
                </div>
            </div>
            <div className='bottom-line'></div>
        </>
     );
}

export default CommentAlert;