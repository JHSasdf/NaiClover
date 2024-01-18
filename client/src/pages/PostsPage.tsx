import Post from '../components/postspage/Post';
import Search from '../components/postspage/Search';
import Header from '../components/postspage/Header';
import Category from '../components/postspage/Category';
import Topbar from '../components/postspage/Topbar';
import '../styles/PostsPage.scss';

function PostsPage() {
  return (
    <div className='postspage-container'>
      <Topbar />
      <Header />
      <Search />
      <Category />
      <div className='posts-container'>
        <Post />
        <Post />
      </div>
    </div>
  );
}

export default PostsPage;
