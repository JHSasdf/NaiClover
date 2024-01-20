import axios from 'axios';
import { useRef } from 'react';
import { useState } from 'react';
import '../styles/conditions.scss';
import { useNavigate } from 'react-router-dom';

function SignupPage() {
    const navigate = useNavigate();
    const [isUnique, setIsUnique] = useState<boolean>(false);
    const [existErrorMsg, setExistErrorMsg] = useState<string>('');
    const [signupErrorMsg, setSignupErrorMsg] = useState<string>('');
    const idRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const confirmPasswordRef = useRef<HTMLInputElement>(null);
    const nameRef = useRef<HTMLInputElement>(null);
    const genderRef = useRef<HTMLInputElement>(null);
    const nationRef = useRef<HTMLInputElement>(null);
    const firLangRef = useRef<HTMLInputElement>(null);
    const learningLang1Ref = useRef<HTMLInputElement>(null);
    const learningLang2Ref = useRef<HTMLInputElement>(null);
    const learningLang3Ref = useRef<HTMLInputElement>(null);

    const submitForm = async (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        const learningLangs: Array<string | null | undefined> = [];
        if (
            learningLang1Ref.current?.value.trim() !== '' &&
            learningLang1Ref.current?.value.trim()
        ) {
            learningLangs.push(learningLang1Ref.current?.value.trim());
        }
        if (
            learningLang2Ref.current?.value.trim() !== '' &&
            learningLang2Ref.current?.value.trim()
        ) {
            learningLangs.push(learningLang2Ref.current?.value.trim());
        }
        if (
            learningLang3Ref.current?.value.trim() !== '' &&
            learningLang3Ref.current?.value.trim()
        ) {
            learningLangs.push(learningLang3Ref.current?.value.trim());
        }

        const res = await axios({
            method: 'post',
            url: '/signup',
            data: {
                userid: idRef.current?.value,
                password: passwordRef.current?.value,
                confirmPassword: confirmPasswordRef.current?.value,
                name: nameRef.current?.value,
                gender: genderRef.current?.value,
                isUnique: isUnique,
                nation: nationRef.current?.value,
                firLang: firLangRef.current?.value,
                learningLang: learningLangs,
            },
        });
        console.log(res.data);
        setSignupErrorMsg(res.data.msg);
        if (!res.data.isError) {
            navigate('/');
        }
    };
    const existAlready = async (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        const res = await axios({
            method: 'post',
            url: '/existAlready',
            data: {
                userid: idRef.current?.value,
            },
        });
        console.log(res.data);
        setIsUnique(res.data.isUnique);
        setExistErrorMsg(res.data.msg);
    };
    return (
        <div>
            <form>
                <input type="text" name="id" placeholder="id" ref={idRef} />
                <button
                    onClick={(e: React.MouseEvent<HTMLElement>) => {
                        existAlready(e);
                    }}
                >
                    중복검사
                </button>
                <div className={isUnique ? 'getgreen' : 'getred'}>
                    {existErrorMsg}
                </div>
                <input
                    type="password"
                    name="password"
                    placeholder="password"
                    ref={passwordRef}
                />
                <input
                    type="password"
                    name="confirmpassword"
                    placeholder="confirmpassword"
                    ref={confirmPasswordRef}
                />
                <input
                    type="text"
                    name="name"
                    placeholder="name"
                    ref={nameRef}
                />
                <input
                    type="text"
                    name="gender"
                    placeholder="gender"
                    ref={genderRef}
                />
                <input
                    type="text"
                    name="nation"
                    placeholder="nation"
                    ref={nationRef}
                />
                <input
                    type="text"
                    name="firlang"
                    placeholder="firstlang"
                    ref={firLangRef}
                />
                <input
                    type="text"
                    name="learninglang1"
                    placeholder="learninglang2"
                    ref={learningLang1Ref}
                />
                <input
                    type="text"
                    name="learninglang2"
                    placeholder="learninglang2"
                    ref={learningLang2Ref}
                />
                <input
                    type="text"
                    name="learninglang3"
                    placeholder="learninglang3"
                    ref={learningLang3Ref}
                />
                <button
                    onClick={(e: React.MouseEvent<HTMLElement>) =>
                        submitForm(e)
                    }
                >
                    회원가입
                </button>
                <div className="getred">{signupErrorMsg}</div>
            </form>
        </div>
    );
}

export default SignupPage;
