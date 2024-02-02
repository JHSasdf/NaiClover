import '../../styles/ErrorLogPageBeforeAfter.scss';

function BeforeAfter() {
    return ( 
        <>
            <div className="beforeafter-container">
                <div className='before-container'>
                    <div className='before-text'></div>
                    <div className='before-content'>안녕하세용</div>
                </div>
                <div className='after-container'>
                    <div className='after-text'></div>
                    <div className='after-content'>안녕하세요dddddddddddddddddddddddddddddddddddddddddddddddddddddd</div>
                </div>
            </div>
            <div className='line'></div>
        </>
     );
}

export default BeforeAfter;