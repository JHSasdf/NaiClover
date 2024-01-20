import '../../styles/CulturePost.scss'

function CulturePost() {
    return(
    <>
        <div className='cul-post'>
            <div className='cul-profile-container'>
                <div className='cul-image-container'>
                    <div className='cul-profile-image'></div>
                    <div className='cul-flag-image'></div>
                </div>

                <div className='cul-info-container'>
                    <div className='cul-info'>
                        <div className='cul-gender cul-male'></div>
                        <div className='cul-name'>Diam sem</div>
                    </div>
                    <div className='cul-location'>Seoul | South Korea</div>

                    <div className='cul-language-container'>
                        <div className='cul-native-language'>EN</div>
                        <div className='cul-arrow'></div>
                        <div className='cul-learning-language'>KR</div>
                    </div>
                </div>
            </div>

            <div className='cul-more-container'>
                <div className='cul-time'>Today 10:30</div>
                <div className='cul-more'></div>
            </div>

            <div className='cul-content-text'>Hello. I am a Korean-American who wants to learn Korean. If you are a Korean who wants to learn English, study together!</div>

            <div className='cul-reaction-container'>
                <div className='cul-likes-container'>
                    <div className='cul-likes'></div>
                    <div className='cul-likes-count'>524</div>
                </div>

                <div className='cul-comments-container'>
                    <div className='cul-comments'></div>
                    <div className='cul-comments-count'>8</div>
                </div>

                <div className='cul-bookmark-container'>
                    <div className='cul-bookmark'></div>
                    <div className='cul-bookmark-text'>저장</div>
                </div>
            </div>
        </div>
        <div className='cul-line'></div>
    </>
    )
}

export default CulturePost;