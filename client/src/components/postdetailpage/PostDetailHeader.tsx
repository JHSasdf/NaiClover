import '../../styles/PostDetailHeader.scss';
import { useNavigate } from 'react-router-dom';

function PostDetailHeader(props: any) {
    const navigate = useNavigate();

    return (
        <>
            <div className="postdetail-header-container">
                <div
                    className="back-arrow"
                    onClick={() => navigate('/posts')}
                ></div>
                <div className="postdetail-header-text">상세 포스트</div>
            </div>
        </>
    );
}

export default PostDetailHeader;
