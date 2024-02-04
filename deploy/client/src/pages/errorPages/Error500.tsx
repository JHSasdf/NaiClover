import { useNavigate } from 'react-router-dom';
import '../../styles/ErrorPage.scss';

function Error500() {
    const navigate = useNavigate();

    return (
        <>
            <div className="error-page-404">
                <div className="naka-container">
                    <img
                        className="error-img"
                        src="/images/errorImg/page500.jpg"
                        alt="page500"
                    />

                    <img
                        className="toMainBtn"
                        src="/images/ToMain.png"
                        alt="to main"
                        onClick={() => navigate('/')}
                    />
                </div>
            </div>
        </>
    );
}

export default Error500;
