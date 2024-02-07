import '../../styles/PersonalChat.scss';
import Topbar from '../Topbar';
import Footer from '../Footer';
import PersonalChatList from './PersonalChatList';

// Message 부분
function PersonalChat() {
    return (
        <>
            <Topbar />
            <div className="chatList-container">
                {/* 설정 헤드 부분 */}
                <div className="chatList-C-Header">
                    <div>
                        <img src="/images/ChatList.png" alt="" />
                    </div>
                </div>

                <div className="chatList-Content">
                    <PersonalChatList />
                </div>
            </div>
            <Footer />
        </>
    );
}

export default PersonalChat;
