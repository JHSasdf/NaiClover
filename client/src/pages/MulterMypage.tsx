import { useRef, useState } from 'react';
import axios from 'axios';
function MulterMypage() {
    const image = useRef<any>(null);
    const userid = useRef<HTMLInputElement>(null);
    const [pathState, setPathState] = useState('');

    const postMulter = async () => {
        const formData = new FormData();
        console.log(image.current.files);
        formData.append('file', image.current.files[0]);
        formData.append('userid', userid.current?.value || 'userid');
        const res = await axios({
            method: 'post',
            url: '/multermypage',
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            withCredentials: true,
        });
        setPathState(res.data.path);
    };
    return (
        <>
            <form action="">
                <input type="file" ref={image} accept=".jpg, .png, .jpeg" />
                <input type="text" ref={userid} />
                <button type="button" onClick={postMulter}>
                    {' '}
                    전송
                </button>
            </form>
            <img src={pathState} alt="" width="300" height="300" />
        </>
    );
}

export default MulterMypage;
