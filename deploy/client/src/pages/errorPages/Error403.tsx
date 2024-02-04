import { useNavigate } from 'react-router-dom';
import '../../styles/ErrorPage.scss';

function Error403() {
    const navigate = useNavigate();

    return (
        <>
            <div className="error-page-404">
                <div className="naka-container">
                    <img
                        className="error-img"
                        src="/images/errorImg/page401.jpg"
                        alt="page403"
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

export default Error403;
