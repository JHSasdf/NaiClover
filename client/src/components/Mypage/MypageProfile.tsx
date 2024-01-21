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
                    <div className="learnResultDiv">English</div>
                </div>
            </div>
            {/* 구글 api 사용해보자 */}
            {/* 구글 api까지 쓸 필요는 없을거 같다. iframe으로 하자 */}
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
                {/* Map */}
                <div className="map-Container">
                    <iframe
                        // 회원가입때 주소를 입력 받고 iframe 주소를 db에 저장해서 가져오도록 해야함.
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d202405.34241565314!2d126.97413929999999!3d37.5648761!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca2012d5c39cf%3A0x7e11eca1405bf29b!2z7ISc7Jq47Yq567OE7Iuc!5e0!3m2!1sko!2skr!4v1705836598468!5m2!1sko!2skr"
                        loading="lazy"
                        allowFullScreen
                    ></iframe>
                </div>
            </div>
        </div>
    );
}

export default MypageProfile;
