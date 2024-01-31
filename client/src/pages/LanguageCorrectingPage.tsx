import Topbar from '../components/Topbar';
import CorrectingPageHeader from '../components/correctingpage/CorrectingPageHeader';
import SentenceCorrection from '../components/correctingpage/SentenceCorrection';
import '../styles/CorrectingPage.scss';

function LanguageCorrectingPage() {
    return ( 
        <div className='correctingpage-container'>
            <Topbar/>
            <CorrectingPageHeader/>
            <div className='sentences-container'>
                <SentenceCorrection/>
                <SentenceCorrection/>
                <SentenceCorrection/>
                <SentenceCorrection/>
            </div>
        </div>
     );
}

export default
LanguageCorrectingPage;