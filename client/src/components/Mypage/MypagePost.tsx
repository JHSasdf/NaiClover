import { Link } from 'react-router-dom';
import '../../styles/MypagePost.scss';

function MypagePost() {
    return (
        <div>
            <div className="addPostImg">
                <Link to={'/newpost'}>
                    <img src="/images/addpost.png" alt="" />
                </Link>
            </div>
        </div>
    );
}

export default MypagePost;
