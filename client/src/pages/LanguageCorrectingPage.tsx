import { useParams } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import Topbar from '../components/Topbar';
import CorrectingPageHeader from '../components/correctingpage/CorrectingPageHeader';
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
            str = str.substring(i + 1);
        }
    }
    result.push(str);
    return result;
};

function LanguageCorrectingPage() {
    const [cookies, setCookies, removeCookies] = useCookies(['id', 'content']);
    const { id } = useParams();
    const cookieId = cookies['id'];
    const [correctLines, setCorrectLines] = useState<string[]>([]);
    if (cookies['content']) {
        const content = customSplit(cookies['content']);
        setCorrectLines(content);
        console.log(content); // << content 확인해보세요
    }
    const cleanCookie = () => {
        removeCookies('content', cookieConfig);
    };

    useEffect(() => {});
    return (
        <div className="correctingpage-container">
            <Topbar />
            <CorrectingPageHeader
                cleanCookie={cleanCookie}
                content={correctLines}
                id={id}
                postUserId={cookieId}
            />
            <div className="sentences-container">
                <SentenceCorrection />
                <SentenceCorrection />
                <SentenceCorrection />
                <SentenceCorrection />
            </div>
        </div>
    );
}

export default LanguageCorrectingPage;
