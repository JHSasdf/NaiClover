import { useRef } from 'react';
import '../../styles/NewPostWritePost.scss';

function WritePost() {
    const textarea = useRef<any>(null);

    return (
        <>
            <div className="writepost-container">
                <div className="writepost-inner-container">
                    <div className="writepost-title">포스트 내용</div>
                    <select name="category" id="">
                        <option value="language">language</option>
                        <option value="culture">culture</option>
                    </select>
                </div>
                <textarea
                    placeholder="포스트 내용을 작성해 주세요..."
                    ref={textarea}
                    rows={1}
                ></textarea>
            </div>
        </>
    );
}

export default WritePost;
