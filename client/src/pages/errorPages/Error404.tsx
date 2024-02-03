import { useNavigate } from 'react-router-dom';
import '../../styles/ErrorPage.scss';

function Error404() {
    const navigate = useNavigate();

    return (
        <>
            <div className="error-page-404">
                <div className="naka-container">
                    <img
                        className="error-img"
                        src="/images/errorImg/page404.jpg"
                        alt="page404"
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

export default Error404;
