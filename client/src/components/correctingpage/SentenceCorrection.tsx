import '../../styles/CorrectingPageSentence.scss';
import { useState } from 'react';

function SentenceCorrection(props:any) {

    const [showInput, setShowInput] = useState(false);

    const handleCorrectingClick = () => {
        setShowInput(true);
    }

    return ( 
        <>
            <div className='sentence-container'>
                <div className='sentence-header'>
                    <div className='sentence-content'>{props.content}</div>
                    <div className='correcting' onClick={handleCorrectingClick}></div>
                </div>
                {showInput && (
                    <div>
                        <input type="text"
                        placeholder={props.content}
                        className="inputcorrecting"
                        autoFocus
                        onBlur={()=>setShowInput(true)} />
                    </div>
                )}
            </div>
        </>
     );
}

export default SentenceCorrection;