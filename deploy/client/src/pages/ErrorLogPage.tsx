import { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Topbar from '../components/Topbar';
import BeforeAfter from '../components/errorlogpage/BeforeAfter';
import ErrorLogHeader from '../components/errorlogpage/ErrorLogHeader';
import '../styles/ErrorLogPage.scss';
import axios from 'axios';

function ErrorLogPage() {
    const [langRevisedLists, setLangRevisedLists] = useState<string[]>([]);
    const [culRevisedLists, setCulRevisedLists] = useState<string[]>([]);
    const [chatRevisedLists, setChatRevisedLists] = useState<string[]>([]);
    const getRevisedLists = async () => {
        try {
            const res = await axios({
                method: 'get',
                url: `${process.env.REACT_APP_SERVERURL}/getRevisedLists`,
                withCredentials: true,
            });
            setLangRevisedLists(res.data.langRes);
            setCulRevisedLists(res.data.culRes);
            setChatRevisedLists(res.data.chatRes);
        } catch (error) {
            alert(`Error: ${error}`);
        }
    };

    useEffect(() => {
        getRevisedLists();
    }, []);
    return (
        <div className="errorlogpage-container">
            <div className="errorlogpage">
                <Topbar />
                <ErrorLogHeader />
                <div className="beforeafters-container">
                    {culRevisedLists.map((elem: any, index) => {
                        return <BeforeAfter key={index} comment={elem} />;
                    })}
                    {langRevisedLists.map((elem: any, index) => {
                        return <BeforeAfter key={index} comment={elem} />;
                    })}
                    {chatRevisedLists.map((elem: any, index) => {
                        return <BeforeAfter key={index} comment={elem} />;
                    })}
                </div>
                <Footer />
            </div>
        </div>
    );
}

export default ErrorLogPage;
