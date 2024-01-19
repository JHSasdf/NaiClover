import '../../styles/MypageProfile.scss';

function MypageProfile() {
    return (
        <div className="mypageProfile-C">
            <div className="introduce-C">
                <div className="introduce-C-Header">
                    <div className="introduce-title">자기 소개</div>
                    <div className="modify-C">
                        <div className="modifyImg">
                            <img src="/images/ModifyLogo.png" alt="" />
                        </div>
                        <div className="modify-title">수정</div>
                    </div>
                </div>
                <div className="textarea-C">
                    <textarea id="introduce-textarea"></textarea>
                </div>
            </div>
            <div className="navtivLang-C">
                <div className="navtivLang-C-Header">
                    <div className="navtivLang-title">모국어</div>
                    <div className="modify-C">
                        <div className="modifyImg">
                            <img src="/images/ModifyLogo.png" alt="" />
                        </div>
                        <div className="modify-title">수정</div>
                    </div>
                </div>
                <div className="navtive-result-C">
                    <div className="nativeResultDiv">Japanese</div>
                    <div className="nativeResultDiv">Japanese</div>
                </div>
            </div>
            <div className="learnLang-C">
                <div className="learnLang-C-Header">
                    <div className="learnLang-title">학습 언어</div>
                    <div className="modify-C">
                        <div className="modifyImg">
                            <img src="/images/ModifyLogo.png" alt="" />
                        </div>
                        <div className="modify-title">수정</div>
                    </div>
                    <div className="learn-result-C">
                        <div className="leranResultDiv">Japanese</div>
                        <div className="leranResultDiv">Japanese</div>
                    </div>
                </div>
                <div>2</div>
            </div>
            <div className="location-C">
                <div className="location-C-Header">
                    <div className="location-title">거주 지역</div>
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
