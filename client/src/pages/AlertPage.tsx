import Topbar from "../components/Topbar";
import AlertPageHeader from "../components/alertpage/AlertPageHeader";
import AlertsList from "../components/alertpage/AlertsList";
import '../styles/AlertPage.scss';

function AlertPage() {
    return ( 
        <>
            <div className='alertpage-container'>
                <Topbar/>
                <AlertPageHeader/>
                <AlertsList/>
            </div>
        </>
     );
}

export default AlertPage;