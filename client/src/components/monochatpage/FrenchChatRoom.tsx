import '../../styles/MonoChatFrench.scss';

function FrenchChatRoom() {
    return ( 
        <>
            <div className='frenchchatroom-container'>
                <div className='frenchheader-container'>
                    <div className='french-title'>FR</div>
                    <div className='frenchchatroom-title'>Human Resources</div>
                </div>
                <div className='frenchfooter-container'>
                    <div className='french-participants-container'>
                        <div className='french-participant-container'>
                            <div className="french-participant"></div>
                            <div className='french-flag'></div>
                        </div>
                        <div className='french-participant-container'>
                            <div className="french-participant"></div>
                            <div className='french-flag'></div>
                        </div>
                        <div className='french-participant-container'>
                            <div className="french-participant"></div>
                            <div className='french-flag'></div>
                        </div>
                    </div>
                    <div className='french-participants'>32 participants</div>
                </div>
            </div>
        </>
     );
}

export default FrenchChatRoom;