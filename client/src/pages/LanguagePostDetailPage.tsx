import Topbar from "../components/Topbar";
import Comment from "../components/postdetailpage/Comment";
import PostDetailHeader from "../components/postdetailpage/PostDetailHeader";
import LanguagePost from "../components/postspage/LanguagePost";
import '../styles/PostDetailPage.scss'

function LanguagePostDetailPage() {
    return ( 
        <>
            <div className="postdetailpage-container">
                <Topbar/>
                <PostDetailHeader/>
                <LanguagePost/>
                <Comment />
                <Comment />
                <Comment />
            </div>
        </>
     );
}

export default LanguagePostDetailPage;