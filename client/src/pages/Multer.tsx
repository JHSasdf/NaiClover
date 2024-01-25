import { useRef } from 'react';
import axios from 'axios';
function Multer() {
    const images = useRef<any>(null);
    const text = useRef<HTMLInputElement>(null);

    const postMulter = async () => {
        const formData = new FormData();

        console.log(images.current.files);
        for (let i = 0; i < images.current.files.length; i++) {
            formData.append('files', images.current.files[i]);
        }
        await axios({
            method: 'post',
            url: '/multertest',
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            withCredentials: true,
        });
    };
    return (
        <>
            <form action="">
                <input
                    type="file"
                    multiple
                    ref={images}
                    accept=".jpg, .png, .jpeg"
                />
                <button type="button" onClick={postMulter}>
                    {' '}
                    전송
                </button>
            </form>
            <img src="/public/posts/userid1706176813586.jpg" alt="" />
        </>
    );
}

export default Multer;
