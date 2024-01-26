import { useRef, useState } from 'react';
import axios from 'axios';
function MulterMypage() {
    const image = useRef<any>(null);
    const [pathState, setPathState] = useState('');

    const change = () => {
        // URL.createObjectURL 함수 사용하여 이미지 파일 업로드 시 바로 사진 변경
        setPathState(URL.createObjectURL(image.current.files[0]));
        console.log(URL.createObjectURL(image.current.files[0]));
    };

    const postMulter = async () => {
        const formData = new FormData();
        console.log('이미지 파일 이름 출력', image.current.files[0].name);
        formData.append('file', image.current.files[0]);

        const res = await axios({
            method: 'post',
            url: '/multermypage',
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            // 세션 쿠키 한번에
            withCredentials: true,
        });
        console.log(res.data);
    };
    return (
        <>
            <form action="">
                <input
                    type="file"
                    ref={image}
                    accept=".jpg, .png, .jpeg"
                    // 이미지 업로드시 파일 바로 변환
                    onChange={change}
                />
                {/* 서버에 데이터 전송 */}
                <button type="button" onClick={postMulter}>
                    {' '}
                    전송
                </button>
            </form>
            {/* 이미지 출력 공간 */}
            <div>
                <img src={pathState} alt="" width="56px" height="56px" />
            </div>
        </>
    );
}

export default MulterMypage;
