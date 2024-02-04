import '../../styles/PostSearch.scss'
import '../../styles/Font.scss';

function Search() {
    return(
        <>
            <div className='search-container'>
                <div className='searchbar'>
                    <input className='searchbar-input' type="text" placeholder='Type something here...' />
                </div>
                <button className="search-button">Search</button>
            </div>
        </>
    )
}

export default Search;