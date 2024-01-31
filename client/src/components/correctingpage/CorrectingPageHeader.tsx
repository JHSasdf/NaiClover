import '../../styles/NewPostHeader.scss';
import {useNavigate} from 'react-router-dom';

function CorrectingPageHeader() {

    const navigate = useNavigate();

    return (  
        <>
            <div className='newpost-header-container'>
                <div className='back-arrow' onClick={() => navigate(-1)}></div>
                <div className='newpost-header-text'>Correcting</div>
                <div className='create-correction'>전송</div>
            </div>
        </>
    );
}

export default CorrectingPageHeader;