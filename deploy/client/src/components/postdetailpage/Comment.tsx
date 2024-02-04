import '../../styles/PostDetailComment.scss';

function Comment(props: any) {
    return ( 
        <>
            <div className='comment-container'>
                <div className='comment-image-container'>
                    <div className='comment-profile-pic'></div>
                    <div className='comment-flag-pic'></div>
                </div>

                <div className='comment-inside-container'>
                    <div className='comment-header-container'>
                        <div className='comment-username'>{props.name}</div>
                        <div className='comment-more'></div>
                    </div>
                    <div className='comment-content'>{props.content}</div>
                    <div className='comment-footer-container'>
                        <div className='comment-date'>2024-01-22</div>
                    </div>
                </div>
            </div>
        </>
     );
}

export default Comment;