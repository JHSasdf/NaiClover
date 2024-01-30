import '../../styles/MonoChatKorean.scss';

function KoreanChatRoom() {
    return ( 
        <>
            <div className='koreanchatroom-container'>
                <div className='koreanheader-container'>
                    <div className='korean-title'>KR</div>
                    <div className='koreanchatroom-title'>Human Resources</div>
                </div>
                <div className='koreanfooter-container'>
                    <div className='korean-participants-container'>
                        <div className='korean-participant-container'>
                            <div className="korean-participant"></div>
                            <div className='korean-flag'></div>
                        </div>
                        <div className='korean-participant-container'>
                            <div className="korean-participant"></div>
                            <div className='korean-flag'></div>
                        </div>
                        <div className='korean-participant-container'>
                            <div className="korean-participant"></div>
                            <div className='korean-flag'></div>
                        </div>
                    </div>
                    <div className='korean-participants'>32 participants</div>
                </div>
            </div>
        </>
     );
}

export default KoreanChatRoom;