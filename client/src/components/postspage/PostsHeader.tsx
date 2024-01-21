import '../../styles/PostHeader.scss';
import {useNavigate} from 'react-router-dom';

function Header() {
    
    const navigate = useNavigate();

    return ( 
        <>
            <div className='header-container'>
                <div className='posts-title'></div>
                <div className='alert'></div>
                <button className='create-post' onClick={() => navigate('/newpost')}></button>
            </div>
        </>
     );
}

export default Header;