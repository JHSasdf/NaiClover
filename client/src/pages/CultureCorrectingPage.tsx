import Topbar from '../components/Topbar';
import CorrectingPageHeader from '../components/correctingpage/CorrectingPageHeader';
import '../styles/CorrectingPage.scss';
import SentenceCorrection from '../components/correctingpage/SentenceCorrection';

function CultureCorrectingPage() {
    return ( 
        <div className='correctingpage-container'>
            <Topbar/>
            <CorrectingPageHeader/>
            <div className='sentences-container'>
                <SentenceCorrection/>
                <SentenceCorrection/>
            </div>
        </div>
     );
}

export default CultureCorrectingPage;