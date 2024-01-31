import '../../styles/MonoChatChinese.scss';

function ChineseChatRoom() {
    return ( 
        <>
            <div className='chinesechatroom-container'>
                <div className='chineseheader-container'>
                    <div className='chinese-title'>CN</div>
                    <div className='chinesechatroom-title'>Human Resources</div>
                </div>
                <div className='chinesefooter-container'>
                    <div className='chinese-participants-container'>
                        <div className='chinese-participant-container'>
                            <div className="chinese-participant"></div>
                            <div className='chinese-flag'></div>
                        </div>
                        <div className='chinese-participant-container'>
                            <div className="chinese-participant"></div>
                            <div className='chinese-flag'></div>
                        </div>
                        <div className='chinese-participant-container'>
                            <div className="chinese-participant"></div>
                            <div className='chinese-flag'></div>
                        </div>
                    </div>
                    <div className='chinese-participants'>32 participants</div>
                </div>
            </div>
        </>
     );
}

export default ChineseChatRoom;