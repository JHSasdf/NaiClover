import { useRef } from 'react';
import '../../styles/MypageProfile.scss';

function SearchUserProfile(props: any) {
    const { userData, learningLang } = props;
    const intro = useRef<HTMLTextAreaElement>(null);
    return (
        <div className="mypageProfile-C">
            <div className="introduce-C">
                <div className="introduce-C-Header">
                    <div className="header-title">자기 소개</div>
                </div>
                <div className="textarea-C">
                    <textarea
                        className="introduce-textarea"
                        readOnly
                        ref={intro}
                        placeholder="Hello World!"
                        defaultValue={userData.introduction || ''}
                    ></textarea>
                </div>
            </div>
            <div className="nativLang-C">
                <div className="nativLang-C-Header">
                    <div className="header-title">모국어</div>
                </div>
                <div className="native-result-c">
                    <div className="nativeResultDiv">{userData.firLang}</div>
                </div>
            </div>
            <div className="learnLang-C">
                <div className="learnLang-C-Header">
                    <div className="header-title">학습 언어</div>
                </div>
                <div className="learn-result-c">
                    {learningLang.map((element: any, key: any) => (
                        <div className="learnResultDiv" key={key}>
                            {element}
                        </div>
                    ))}
                </div>
            </div>
            <div className="location-C">
                <div className="location-C-Header">
                    <div className="header-title">거주 지역</div>
                </div>
                {/* Map */}
                <div className="map-Container">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d202405.34241565314!2d126.97413929999999!3d37.5648761!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca2012d5c39cf%3A0x7e11eca1405bf29b!2z7ISc7Jq47Yq567OE7Iuc!5e0!3m2!1sko!2skr!4v1705836598468!5m2!1sko!2skr"
                        loading="lazy"
                        allowFullScreen
                    ></iframe>
                </div>
            </div>
        </div>
    );
}

export default SearchUserProfile;
