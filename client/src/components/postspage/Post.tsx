import '../../styles/Post.scss'

function Post() {
    return(
    <>
        <div className='post'>
            <div className='profile-container'>
                <div className='image-container'>
                    <div className='profile-image'></div>
                    <div className='flag-image'></div>
                </div>

                <div className='info-container'>
                    <div className='info'>
                        <div className='gender male'></div>
                        <div className='name'>Diam sem</div>
                    </div>
                    <div className='location'>Seoul | South Korea</div>

                    <div className='language-container'>
                        <div className='native-language'>EN</div>
                        <div className='arrow'></div>
                        <div className='learning-language'>KR</div>
                    </div>
                </div>
            </div>

            <button className='follow'>팔로우</button>

            <div className='more-container'>
                <div className='time'>Today 10:30</div>
                <div className='more'></div>
            </div>

            <div className='content-text'>Hello. I am a Korean-American who wants to learn Korean. If you are a Korean who wants to learn English, study together!</div>

            <div className='hashtag-container'>
                <div className='hashtag'>#native</div>
                <div className='hashtag'>#원어민</div>
                <div className='hashtag'>#korean</div>
                <div className='hashtag'>#english</div>
            </div>

            <div className='reaction-container'>
                <div className='likes-container'>
                    <div className='likes'></div>
                    <div className='likes-count'>524</div>
                </div>

                <div className='comments-container'>
                    <div className='comments'></div>
                    <div className='comments-count'>8</div>
                </div>

                <div className='bookmark-container'>
                    <div className='bookmark'></div>
                    <div className='bookmark-text'>저장</div>
                </div>
            </div>
        </div>
        <div className='line'></div>
    </>
    )
}

export default Post;