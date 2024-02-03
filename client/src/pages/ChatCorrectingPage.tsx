import { useParams } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import Topbar from '../components/Topbar';
import ChatCorrectingPageHeader from '../components/correctingpage/ChatCorrectingPageHeader';
import SentenceCorrection from '../components/correctingpage/SentenceCorrection';
import '../styles/CorrectingPage.scss';
import { useEffect, useState } from 'react';
import { cookieConfig } from '../utils/cookieConfig';

const customSplit = (str: string): string[] => {
    let i = -1;
    let result: string[] = [];
    while (str[++i]) {
        if (
            str[i + 2] &&
            (str[i] == '.' || str[i] == '?' || str[i] == '!') &&
            str[i + 1] == ' '
        ) {
            result.push(str.substring(0, i + 1));
            str = str.substring(i + 2);
            i = -1;
        }
    }
    result.push(str);
    return result;
};

function ChatCorrectingPage(props: any) {
    const [cookies, setCookies, removeCookies] = useCookies(['id', 'content']);
    const { roomNum, toWhom } = useParams();
    // const { roomNum, toWhomName, toWhomId } = useParams();
    const cookieId = cookies['id'];
    const [correctLines, setCorrectLines] = useState<string[]>([]);
    const [tempLines, setTempLines] = useState<string[]>([]);

    const cleanCookie = () => {
        removeCookies('content', cookieConfig);
    };
    useEffect(() => {
        if (cookies['content']) {
            console.log('before', cookies['content']);
            const content = customSplit(cookies['content']);
            console.log('after', content);
            setCorrectLines(content);
            setTempLines(content);
        }
    }, [cookies]);
    return (
        <div className="correctingpage-container">
            <Topbar />
            <ChatCorrectingPageHeader
                roomNum={roomNum}
                userid={cookieId}
                cleanCookie={cleanCookie}
                tempLines={tempLines}
                setContent={setCorrectLines}
                content={correctLines}
                toWhom={toWhom}
                // toWhom={toWhomName}
                // toWhomId={toWhomId}
            />
            <div className="sentences-container">
                {tempLines.map((line, index) => (
                    <SentenceCorrection
                        key={index}
                        index={index}
                        line={line}
                        content={correctLines}
                        tempLines={tempLines}
                        setTempLines={setTempLines}
                    />
                ))}
            </div>
        </div>
    );
}

export default ChatCorrectingPage;
