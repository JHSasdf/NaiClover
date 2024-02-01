import Footer from '../components/Footer';
import Topbar from '../components/Topbar';
import BeforeAfter from '../components/errorlogpage/BeforeAfter';
import ErrorLogHeader from '../components/errorlogpage/ErrorLogHeader';
import '../styles/ErrorLogPage.scss';

function ErrorLogPage() {
    return ( 
        <div className="errorlogpage-container">
            <Topbar/>
            <ErrorLogHeader/>
            <div className='beforeafters-container'>
                <BeforeAfter/>
                <BeforeAfter/>
            </div>
            <Footer/>
        </div>
     );
}

export default ErrorLogPage;