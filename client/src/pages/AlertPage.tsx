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
            <div className="alertpage-container">
                <Topbar />
                <AlertPageHeader />
                <AlertsList userid={idCookie} />
            </div>
        </>
    );
}

export default AlertPage;
