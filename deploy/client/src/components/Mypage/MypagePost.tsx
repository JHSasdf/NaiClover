import { Link } from 'react-router-dom';
import '../../styles/MypagePost.scss';
import CulturePost from '../postspage/CulturePost';
import LanguagePost from '../postspage/LanguagePost';

function MypagePost() {
    return (
        <div>
            <div className="addPostImg">
                <Link to={'/newpost'}>
                    <img src="/images/addpost.png" alt="" />
                </Link>
            </div>
            <div className='mypage-post-container'>
                <LanguagePost/>
                <CulturePost/>
            </div>
        </div>
    );
}

export default MypagePost;
