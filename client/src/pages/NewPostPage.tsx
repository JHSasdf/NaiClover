import React from 'react';
import Topbar from '../components/Topbar';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import '../styles/NewPostButton.scss';
import '../styles/NewPostHeader.scss';
import '../styles/NewPostPage.scss';
import '../styles/NewPostPhotos.scss';
import '../styles/NewPostWritePost.scss';

function NewPostPage() {
    const [cookies, setCookies, removeCookies] = useCookies(['id']);
    const idCookie = cookies['id'];

    const navigate = useNavigate();

    const textareaRef = useRef<any>(null);
    const images = useRef<any>(null);
    const handleResizeHeight = () => {
        textareaRef.current.style.height = 'auto';
        textareaRef.current.style.height =
            textareaRef.current.scrollHeight + 'px';
    };

    const [selectedCategory, setSelectedCategory] = React.useState('lang');

    let selectRef = useRef<any>(null);

    async function submitPost() {
        const option = selectRef.current?.value;
        if (option === 'lang') {
            try {
                console.log(`/${option}/posts/createpost`);
                const res = await axios({
                    method: 'post',
                    url: `/${option}/posts/createpost`,
                    data: {
                        userid: idCookie,
                        content: textareaRef.current?.value,
                    },
                });
                console.log(res.data);
                if (res.data.isError === false) {
                    navigate('/posts');
                }
            } catch (error) {
                console.log(error);
            }
        } else {
            try {
                const formData = new FormData();
                for (let i = 0; i < images.current.files.length; i++) {
                    formData.append('files', images.current.files[i]);
                }
                formData.append('userid', idCookie);
                formData.append('content', textareaRef.current?.value);
                console.log(images.current.files);
                const res = await axios({
                    method: 'post',
                    url: `/${option}/posts/createpost`,
                    data: formData,
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    withCredentials: true,
                });
                console.log(res.data);
                if (res.data.isError === false) {
                    navigate('/posts');
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <div className="newpostpage-container">
            <Topbar />
            <img src="/public\\posts\\aaaa1706235325370.jpg" alt="" />
            <div className="newpost-header-container">
                <div className="back-arrow" onClick={() => navigate(-1)}></div>
                <div className="newpost-header-text">새 포스트</div>
            </div>

            <div className="writepost-container">
                <div className="writepost-inner-container">
                    <div className="writepost-title">포스트 내용</div>
                    <select
                        name="category"
                        required
                        ref={selectRef}
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        <option value="lang">language</option>
                        <option value="cul">culture</option>
                    </select>
                </div>
                <textarea
                    placeholder="포스트 내용을 작성해 주세요..."
                    ref={textareaRef}
                    rows={1}
                    onChange={handleResizeHeight}
                ></textarea>
            </div>

            {selectedCategory === 'cul' ? (
                <div className="newpost-photos-container">
                    <input
                        type="file"
                        multiple
                        ref={images}
                        accept=".jpg, .png, .jpeg"
                    />

                    <div className="camera"></div>
                    <div className="image"></div>
                    <div className="image"></div>
                    <div className="image"></div>
                    <div className="image"></div>
                    <div className="image"></div>
                </div>
            ) : null}

            <div className="newpost-button-container">
                <button onClick={() => submitPost()}>포스팅</button>
            </div>
        </div>
    );
}
export default NewPostPage;
