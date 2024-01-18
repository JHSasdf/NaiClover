import Topbar from "../components/Topbar";
import NewPostHeader from "../components/newpostpage/NewPostHeader";
import WritePost from "../components/newpostpage/WritePost";
import '../styles/NewPostPage.scss';

function NewPostPage() {
    return ( 
        <div className='newpostpage-container'>
            <Topbar />
            <NewPostHeader/>
            <WritePost />
        </div>
     );
}

export default NewPostPage;