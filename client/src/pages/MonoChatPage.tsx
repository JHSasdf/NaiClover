import Footer from "../components/Footer";
import Topbar from "../components/Topbar";
import ChineseChatRoom from "../components/monochatpage/ChineseChatRoom";
import EnglishChatRoom from "../components/monochatpage/EnglishChatRoom";
import FrenchChatRoom from "../components/monochatpage/FrenchChatRoom";
import GermanChatRoom from "../components/monochatpage/GermanChatRoom";
import JapaneseChatRoom from "../components/monochatpage/JapaneseChatRoom";
import KoreanChatRoom from "../components/monochatpage/KoreanChatRoom";
import MonoChatHeader from "../components/monochatpage/MonoChatHeader";
import Search from "../components/postspage/Search";
import '../styles/MonoChatPage.scss';

import {useRef, useState} from 'react';

function MonoChatPage() {

    // state 설정
    let [selectedLanguage, setSelectedLanguage] = useState('korean');

    // ref 지정
    const koreanchange = useRef<any>(null);
    const englishchange = useRef<any>(null);
    const japanesechange = useRef<any>(null);
    const chinesechange = useRef<any>(null);
    const frenchchange = useRef<any>(null);
    const germanchange = useRef <any>(null);


    const handleLanguageChange = (language: any) => {
        setSelectedLanguage(language);
    }

    return ( 
        <div className='monochatpage-container'>
            <Topbar/>
            <MonoChatHeader/>
            <Search/>
            <div className='change-language-container'>
                <div className='change-language' ref={koreanchange} onClick={()=>handleLanguageChange('korean')}>
                    <div className='language-flag koreanflag'></div>
                    <div className='language-text'>한국어</div>
                </div>
                <div className='change-language' ref={englishchange} onClick={()=>handleLanguageChange('english')}>
                    <div className='language-flag englishflag'></div>
                    <div className='language-text'>English</div>
                </div>
                <div className='change-language' ref={japanesechange} onClick={()=>handleLanguageChange('japanese')}>
                    <div className='language-flag japaneseflag'></div>
                    <div className='language-text'>日本語</div>
                </div>
                <div className='change-language' ref={chinesechange} onClick={()=>handleLanguageChange('chinese')}>
                    <div className='language-flag chineseflag'></div>
                    <div className='language-text'>中國語</div>
                </div>
                <div className='change-language' ref={frenchchange} onClick={()=>handleLanguageChange('french')}>
                    <div className='language-flag frenchflag'></div>
                    <div className='language-text'>Français</div>
                </div>
                <div className='change-language' ref={germanchange} onClick={()=>handleLanguageChange('german')}>
                    <div className='language-flag germanflag '></div>
                    <div className='language-text'>Deutsch</div>
                </div>
            </div>
            <div className="chatroom-container">
                {/* div가 korean-chatrooms-container 자체로 바뀌게.. ex-english-chatrooms-container */}
                <div className={`${selectedLanguage}-chatrooms-container`}>
                    {selectedLanguage === 'korean' && (
                        <>
                            <KoreanChatRoom/>
                            <KoreanChatRoom/>

                        </>
                    )}

                    {selectedLanguage === 'english' && (
                        <>
                            <EnglishChatRoom/>
                            <EnglishChatRoom/>
                        </>
                    )}

                    {selectedLanguage === 'japanese' && (
                        <>
                            <JapaneseChatRoom/>
                            <JapaneseChatRoom/>
                        </>
                    )}

                    
                    {selectedLanguage === 'chinese' && (
                        <>
                            <ChineseChatRoom/>
                            <ChineseChatRoom/>
                        </>
                    )}

                    
                    {selectedLanguage === 'french' && (
                        <>
                            <FrenchChatRoom/>
                            <FrenchChatRoom/>
                        </>
                    )}

                    
                    {selectedLanguage === 'german' && (
                        <>
                            <GermanChatRoom/>
                            <GermanChatRoom/>
                        </>
                    )}
                    
                </div>

            </div>
            <Footer/>
        </div>
     );
}

export default MonoChatPage;