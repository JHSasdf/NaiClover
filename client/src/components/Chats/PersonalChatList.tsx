import '../../styles/PersonalChatList.scss';

function PersonalChatList() {
    return (
        <>
            <div className="persnoalChatList-container">
                {/* 채팅 프로필 이미지 */}
                <div className="chat-ImageDiv">
                    <div className="chat-ProfileImage">
                        <img src="/images/flag/korea.png" alt="" />
                    </div>
                    <div className="chat-FlagImage">
                        <img src="/images/flag/japan.png" alt="" />
                    </div>
                </div>
                {/* 채팅 내용 */}
                <div className="chat-content">
                    {/* 닉네임 */}
                    <div className="chat-nickname">name</div>
                    {/* 날짜 */}
                    <div className="chat-date">2024-01-15</div>
                </div>
            </div>
        </>
    );
}

export default PersonalChatList;
