import Topbar from "../components/Topbar";
import Comment from "../components/postdetailpage/Comment";
import PostDetailHeader from "../components/postdetailpage/PostDetailHeader";
import CulturePost from "../components/postspage/CulturePost";
import '../styles/PostDetailPage.scss'

function CulturePostDetailPage() {
    return ( 
        <>
            <div className="postdetailpage-container">
                <Topbar/>
                <PostDetailHeader/>
                <CulturePost/>
                <Comment/>
            </div>
        </>
     );
}

export default CulturePostDetailPage;