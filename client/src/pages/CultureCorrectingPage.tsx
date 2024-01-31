import Topbar from '../components/Topbar';
import CorrectingPageHeader from '../components/correctingpage/CorrectingPageHeader';
import '../styles/CorrectingPage.scss';
import SentenceCorrection from '../components/correctingpage/SentenceCorrection';
import { cookieConfig } from '../utils/cookieConfig';
import { useCookies } from 'react-cookie';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

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

function CultureCorrectingPage() {
    const [cookies, setCookies, removeCookies] = useCookies(['id', 'content']);
    const { id } = useParams();
    const cookieId = cookies['id'];
    const [correctLines, setCorrectLines] = useState<string[]>([]);
    useEffect(() => {
        if (cookies['content']) {
            const content = customSplit(cookies['content']);
            setCorrectLines(content);
            console.log(content); // << content 확인해보세요
        }
    }, [cookies]);
    const cleanCookie = () => {
        removeCookies('content', cookieConfig);
    };

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
                {correctLines.map((line, index)=>(
                    <SentenceCorrection key={index} content={line}/>
                ))}
            </div>
        </div>
    );
}

export default CultureCorrectingPage;
