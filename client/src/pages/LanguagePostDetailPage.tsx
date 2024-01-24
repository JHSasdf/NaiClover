import Topbar from "../components/Topbar";
import Comment from "../components/postdetailpage/Comment";
import CommentsList from "../components/postdetailpage/CommentsList";
import PostDetailHeader from "../components/postdetailpage/PostDetailHeader";
import SendComment from "../components/postdetailpage/SendComment";
import LanguagePost from "../components/postspage/LanguagePost";
import '../styles/PostDetailPage.scss'

function LanguagePostDetailPage() {
    return ( 
        <>
            <div className="postdetailpage-container">
                <Topbar/>
                <PostDetailHeader/>
                <LanguagePost/>
                <CommentsList />
                <SendComment/>
            </div>
        </>
     );
}

export default LanguagePostDetailPage;