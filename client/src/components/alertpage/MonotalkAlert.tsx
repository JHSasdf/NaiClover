import '../../styles/AlertPageMonotalkAlert.scss';

function MonotalkAlert() {
    return ( 
        <>
            <div className='monotalkalert-container'>
                <div className='monotalkalert-title'>
                    <span className='monotalkalert-username'>Username</span>님이 새 모노톡을 개설했습니다
                </div>
                <div className='monotalkalert-content'>
                    Let's talk!
                </div>
            </div>
            <div className='bottom-line'></div>
        </>
     );
}

export default MonotalkAlert;