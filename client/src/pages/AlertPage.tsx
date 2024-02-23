import Footer from '../components/Footer';
import Topbar from '../components/Topbar';
import AlertPageHeader from '../components/alertpage/AlertPageHeader';
import AlertsList from '../components/alertpage/AlertsList';
import '../styles/AlertPage.scss';
import { useCookies } from 'react-cookie';

function AlertPage() {
    const [cookies, setCookies, removeCookies] = useCookies(['id']);
    const idCookie = cookies['id'];
    return (
        <>
            <AlertPageHeader />
            <div className="alertpage-container">
                <div className="alertpage">
                    <AlertsList userid={idCookie} />
                </div>
            </div>
            <Footer />
        </>
    );
}

export default AlertPage;
