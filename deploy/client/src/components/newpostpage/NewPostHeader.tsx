import '../../styles/NewPostHeader.scss';
import {useNavigate} from 'react-router-dom';

function NewPostHeader() {

    const navigate = useNavigate();

    return (  
        <>
            <div className='newpost-header-container'>
                <div className='back-arrow' onClick={() => navigate(-1)}></div>
                <div className='newpost-header-text'>새 포스트</div>
                <div className='newpost-header-space'></div>
            </div>
        </>
    );
}

export default NewPostHeader;