import { useParams } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import Topbar from '../components/Topbar';
import CorrectingPageHeader from '../components/correctingpage/CorrectingPageHeader';
import SentenceCorrection from '../components/correctingpage/SentenceCorrection';
import '../styles/CorrectingPage.scss';
import { useEffect, useState } from 'react';
import { cookieConfig } from '../utils/cookieConfig';

const customSplit = (str: string): string[] => {
    let result: string[] = [];
    let i = -1;
    while (str[++i]) {
        if (
            (str[i] == '.' || str[i] == '?' || str[i] == '!') &&
            (str[i + 1] == ' ' || str[i + 1] == '\n')
        ) {
            result.push(str.substring(0, i + 1));
            str = str.substring(i + 2);
            i = -1;
        } else if (i != 0 && str[i] == '\n' && str[i + 1] != '\n') {
            result.push(str.substring(0, i - 1));
            str = str.substring(i + 1);
            i = -1;
        }
    }
    if (!result[0]) {
        result[0] = str;
        return result;
    } else {
        result.push(str);
    }
    return result;
};

function CultureCorrectingPage(props: any) {
    const [cookies, setCookies, removeCookies] = useCookies(['id', 'content']);
    const { id } = useParams();
    const cookieId = cookies['id'];
    const [correctLines, setCorrectLines] = useState<string[]>([]);
    const [tempLines, setTempLines] = useState<string[]>([]);
    const cleanCookie = () => {
        removeCookies('content', cookieConfig);
    };

    useEffect(() => {
        if (cookies['content']) {
            const content = customSplit(cookies['content']);
            setCorrectLines(content);
            setTempLines(content);
        }
    }, [cookies]);
    return (
        <div className="correctingpage-container">
            <div className="correctingpage">
                <Topbar />
                <CorrectingPageHeader
                    cleanCookie={cleanCookie}
                    tempLines={tempLines}
                    setContent={setCorrectLines}
                    content={correctLines}
                    id={id}
                    postUserId={cookieId}
                    postType="cul"
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
        </div>
    );
}

export default CultureCorrectingPage;
