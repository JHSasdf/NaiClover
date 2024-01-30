import '../../styles/MonoChatJapanese.scss';

function JapaneseChatRoom() {
    return ( 
        <>
            <div className='japanesechatroom-container'>
                <div className='japaneseheader-container'>
                    <div className='japanese-title'>JP</div>
                    <div className='japanesechatroom-title'>Human Resources</div>
                </div>
                <div className='japanesefooter-container'>
                    <div className='japanese-participants-container'>
                        <div className='japanese-participant-container'>
                            <div className="japanese-participant"></div>
                            <div className='japanese-flag'></div>
                        </div>
                        <div className='japanese-participant-container'>
                            <div className="japanese-participant"></div>
                            <div className='japanese-flag'></div>
                        </div>
                        <div className='japanese-participant-container'>
                            <div className="japanese-participant"></div>
                            <div className='japanese-flag'></div>
                        </div>
                    </div>
                    <div className='japanese-participants'>32 participants</div>
                </div>
            </div>
        </>
     );
}

export default JapaneseChatRoom;