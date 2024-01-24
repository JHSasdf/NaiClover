import '../../styles/AlertPageFollowAlert.scss';

function FollowAlert() {
    return ( 
        <>
            <div className='followalert-container'>
                <div className='followalert-title'>
                    <span className='followalert-username'>Username</span>님이 팔로우를 했습니다
                </div>
            </div>
            <div className='bottom-line'></div>
        </>
     );
}

export default FollowAlert;