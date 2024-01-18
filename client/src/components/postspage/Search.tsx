import '../../styles/Search.scss'

function Search() {
    return(
        <>
            <div className='search-container'>
                <div className='searchbar'>
                    <input type="text" placeholder='검색어를 입력해주세요.' />
                </div>
                <button className="search">검색</button>
            </div>
        </>
    )
}

export default Search;