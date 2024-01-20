import '../../styles/MypageProfile.scss';

function MypageProfile() {
    return (
        <div className="mypageProfile-C">
            <div className="introduce-C">
                <div className="introduce-C-Header">
                    <div className="header-title">자기 소개</div>
                    <div className="modify-C">
                        <div className="modifyImg">
                            <img src="/images/ModifyLogo.png" alt="" />
                        </div>
                        <div className="modify-title">수정</div>
                    </div>
                </div>
                <div className="textarea-C">
                    <textarea
                        className="introduce-textarea"
                        readOnly
                    ></textarea>
                </div>
            </div>
            <div className="nativLang-C">
                <div className="nativLang-C-Header">
                    <div className="header-title">모국어</div>
                </div>
                <div className="native-result-c">
                    <div className="nativeResultDiv">Korean</div>
                </div>
            </div>
            <div className="learnLang-C">
                <div className="learnLang-C-Header">
                    <div className="header-title">학습 언어</div>
                    <div className="modify-C">
                        <div className="modifyImg">
                            <img src="/images/ModifyLogo.png" alt="" />
                        </div>
                        <div className="modify-title">수정</div>
                    </div>
                </div>
                <div className="learn-result-c">
                    <div className="learnResultDiv">Japanese</div>
                    <div className="learnResultDiv">Japanese</div>
                </div>
            </div>
            {/* 구글 api 사용해보자 */}
            <div className="location-C">
                <div className="location-C-Header">
                    <div className="header-title">거주 지역</div>
                    <div className="modify-C">
                        <div className="modifyImg">
                            <img src="/images/ModifyLogo.png" alt="" />
                        </div>
                        <div className="modify-title">수정</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MypageProfile;
