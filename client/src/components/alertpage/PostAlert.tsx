import '../../styles/AlertPagePostAlert.scss';

function PostAlert() {
    return ( 
        <>
            <div className='postalert-container'>
                <div className='postalert-title'>
                    <span className='postalert-username'>Username</span>님이 새 포스트를 작성했습니다
                </div>
                <div className='postalert-content'>
                    Hello. I am a Korean-American who wants to ...
                </div>
            </div>
            <div className='bottom-line'></div>
        </>
     );
}

export default PostAlert;