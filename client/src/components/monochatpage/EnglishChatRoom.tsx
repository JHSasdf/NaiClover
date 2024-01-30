import '../../styles/MonoChatEnglish.scss';

function EnglishChatRoom() {
    return ( 
        <>
            <div className='englishchatroom-container'>
                <div className='englishheader-container'>
                    <div className='english-title'>EN</div>
                    <div className='englishchatroom-title'>Human Resources</div>
                </div>
                <div className='englishfooter-container'>
                    <div className='english-participants-container'>
                        <div className='english-participant-container'>
                            <div className="english-participant"></div>
                            <div className='english-flag'></div>
                        </div>
                        <div className='english-participant-container'>
                            <div className="english-participant"></div>
                            <div className='english-flag'></div>
                        </div>
                        <div className='english-participant-container'>
                            <div className="english-participant"></div>
                            <div className='english-flag'></div>
                        </div>
                    </div>
                    <div className='english-participants'>32 participants</div>
                </div>
            </div>
        </>
     );
}

export default EnglishChatRoom;