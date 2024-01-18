import '../../styles/PostCategory.scss';

function Category() {
    return ( 
        <>
        <div className='category-component'>
            <button className='btn_all'>전체</button><br/>
            <button className='btn_lang'>언어</button><br/>
            <button className='btn_culture'>문화</button><br/>
        </div>
        </>
     );
}

export default Category;