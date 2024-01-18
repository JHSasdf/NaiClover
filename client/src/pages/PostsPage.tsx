import Post from '../components/postspage/Post';
import Search from '../components/postspage/Search';
import Header from '../components/postspage/Header';
import Category from '../components/postspage/Category';

function PostsPage() {
  return (
    <>
      <Header />
      <Search />
      <Category />
      <Post />
      <Post />
    </>
  );
}

export default PostsPage;
