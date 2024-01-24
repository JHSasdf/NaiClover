
import '../../styles/PostDetailSendComment.scss';
import {useRef} from 'react';

function SendComment() {

    return ( 
    <>
        <div className='entire-comment-container'>
            <div className='send-comment-container'>
                <input type="text" placeholder="Type something here..." />
                <div className="send-comment"></div>
            </div>
        </div>
    </>
     );
}

export default SendComment;