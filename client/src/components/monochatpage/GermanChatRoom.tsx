import '../../styles/MonoChatGerman.scss';

function GermanChatRoom() {
    return ( 
        <>
            <div className='germanchatroom-container'>
                <div className='germanheader-container'>
                    <div className='german-title'>DE</div>
                    <div className='germanchatroom-title'>Human Resources</div>
                </div>
                <div className='germanfooter-container'>
                    <div className='german-participants-container'>
                        <div className='german-participant-container'>
                            <div className="german-participant"></div>
                            <div className='german-flag'></div>
                        </div>
                        <div className='german-participant-container'>
                            <div className="german-participant"></div>
                            <div className='german-flag'></div>
                        </div>
                        <div className='german-participant-container'>
                            <div className="german-participant"></div>
                            <div className='german-flag'></div>
                        </div>
                    </div>
                    <div className='german-participants'>32 participants</div>
                </div>
            </div>
        </>
     );
}

export default GermanChatRoom;