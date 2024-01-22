import Topbar from "../components/Topbar";
import ChoosePhotos from "../components/newpostpage/ChoosePhotos";
import NewPostButton from "../components/newpostpage/NewPostButton";
import NewPostHeader from "../components/newpostpage/NewPostHeader";
import WritePost from "../components/newpostpage/WritePost";
import '../styles/NewPostPage.scss';

function NewPostPage() {
    return ( 
        <div className='newpostpage-container'>
            <Topbar />
            <NewPostHeader/>
            <WritePost />
            <ChoosePhotos />
            <NewPostButton />
        </div>
     );
}

export default NewPostPage;