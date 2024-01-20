import axios from 'axios';
import { useRef } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/conditions.scss';

function SignupPage() {
    const navigate = useNavigate();
    const [isUnique, setIsUnique] = useState<boolean>(false);
    const [existErrorMsg, setExistErrorMsg] = useState<string>('');
    const [passwordsNotSameMsg, setPasswordsNotSameMsg] = useState('');
    const [signupErrorMsg, setSignupErrorMsg] = useState<string>('');
    const [displayToggle, setDisplayToggle] = useState<boolean>(true);
    const [learningLang2Toggle, setLearningLang2Toggle] =
        useState<boolean>(false);
    const [learningLang3Toggle, setLearningLang3Toggle] =
        useState<boolean>(false);
    const idRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const confirmPasswordRef = useRef<HTMLInputElement>(null);
    const nameRef = useRef<HTMLInputElement>(null);
    const genderRef = useRef<HTMLSelectElement>(null);
    const nationRef = useRef<HTMLSelectElement>(null);
    const firLangRef = useRef<HTMLSelectElement>(null);
    const learningLang1Ref = useRef<HTMLSelectElement>(null);
    const learningLang2Ref = useRef<HTMLSelectElement>(null);
    const learningLang3Ref = useRef<HTMLSelectElement>(null);

    const Toggle = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        if (!isUnique) {
            return setPasswordsNotSameMsg('Please check the ID validity');
        }
        if (
            passwordRef.current?.value === undefined ||
            passwordRef.current?.value.length < 6
        ) {
            return setPasswordsNotSameMsg(
                `Password should be at least 6 characters long.`
            );
        }
        if (
            !(passwordRef.current?.value === confirmPasswordRef.current?.value)
        ) {
            return setPasswordsNotSameMsg(
                `There's a difference between password and confirm password`
            );
        }
        setPasswordsNotSameMsg('');
        setDisplayToggle(!displayToggle);
    };

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
    const existAlready = async (e: React.FocusEvent<HTMLInputElement>) => {
        e.preventDefault();
        const res = await axios({
            method: 'post',
            url: '/existAlready',
            data: {
                userid: idRef.current?.value,
            },
        });
        setIsUnique(res.data.isUnique);
        setExistErrorMsg(res.data.msg);
    };
    return (
        <>
            <header>
                <img
                    src="/images/backBtn.png"
                    alt="back"
                    className={
                        !displayToggle ? 'dblock backbtn' : 'dnone backbtn'
                    }
                    onClick={(e: React.MouseEvent<HTMLElement>) => {
                        Toggle(e);
                    }}
                />
                <img src="/images/loginPageLogo.png" alt="logo" />
            </header>
            <div className="signupcontainer">
                <form>
                    <fieldset className={displayToggle ? 'dblock' : 'dnone'}>
                        <input
                            onBlur={(e: React.FocusEvent<HTMLInputElement>) =>
                                existAlready(e)
                            }
                            type="text"
                            name="id"
                            placeholder="id"
                            ref={idRef}
                        />
                        <br />
                        {existErrorMsg.length > 0 && (
                            <div className={isUnique ? 'getgreen' : 'getred'}>
                                {existErrorMsg}
                            </div>
                        )}
                        <input
                            type="password"
                            name="password"
                            placeholder="password"
                            ref={passwordRef}
                        />
                        <br />
                        <input
                            type="password"
                            name="confirmpassword"
                            placeholder="confirmpassword"
                            ref={confirmPasswordRef}
                        />
                        <br />
                        {passwordsNotSameMsg.length > 0 && (
                            <div className="getred">{passwordsNotSameMsg}</div>
                        )}
                        <img
                            src="/images/nextBtn.png"
                            alt="next-btn"
                            onClick={(e: React.MouseEvent<HTMLElement>) => {
                                Toggle(e);
                            }}
                        />
                        <p>
                            Already have an account? <a href="/login">Log In</a>
                        </p>
                    </fieldset>
                    <fieldset className={!displayToggle ? 'dblock' : 'dnone'}>
                        <input
                            type="text"
                            name="name"
                            placeholder="name"
                            ref={nameRef}
                        />
                        <select name="gender" defaultValue="" ref={genderRef}>
                            <option value="">Select</option>
                            <option value="m">Male</option>
                            <option value="f">Female</option>
                        </select>
                        <select
                            name="learninglang2"
                            defaultValue=""
                            ref={nationRef}
                        >
                            <option value="">Select</option>
                            <option value="Chinese">China</option>
                            <option value="America">America</option>
                            <option value="France">France</option>
                            <option value="Germany">Germany</option>
                            <option value="Japan">Japan</option>
                            <option value="Korea">Korea</option>
                        </select>
                        <select name="firlang" defaultValue="" ref={firLangRef}>
                            <option value="">Select</option>
                            <option value="Chinese">Chinese</option>
                            <option value="English">English</option>
                            <option value="French">French</option>
                            <option value="German">German</option>
                            <option value="Japanese">Japanese</option>
                            <option value="Korean">Korean</option>
                        </select>
                        <select
                            name="learninglang1"
                            defaultValue=""
                            ref={learningLang1Ref}
                        >
                            <option value="">Select</option>
                            <option value="Chinese">Chinese</option>
                            <option value="English">English</option>
                            <option value="French">French</option>
                            <option value="German">German</option>
                            <option value="Japanese">Japanese</option>
                            <option value="Korean">Korean</option>
                        </select>
                        <span onClick={() => setLearningLang2Toggle(true)}>
                            <img src="/images/elementplus.png" alt="plus" />
                        </span>
                        <fieldset
                            className={learningLang2Toggle ? 'dblock' : 'dnone'}
                        >
                            <select
                                name="learninglang2"
                                defaultValue=""
                                ref={learningLang2Ref}
                            >
                                <option value="">Select</option>
                                <option value="Chinese">Chinese</option>
                                <option value="English">English</option>
                                <option value="French">French</option>
                                <option value="German">German</option>
                                <option value="Japanese">Japanese</option>
                                <option value="Korean">Korean</option>
                            </select>
                            <span onClick={() => setLearningLang2Toggle(false)}>
                                <img
                                    src="/images/elementminus.png"
                                    alt="minus"
                                />
                            </span>
                            <span onClick={() => setLearningLang3Toggle(true)}>
                                <img src="/images/elementplus.png" alt="plus" />
                            </span>
                        </fieldset>
                        <fieldset
                            className={learningLang3Toggle ? 'dblock' : 'dnone'}
                        >
                            <select
                                name="learninglang3"
                                defaultValue=""
                                ref={learningLang3Ref}
                            >
                                <option value="">Select</option>
                                <option value="Chinese">Chinese</option>
                                <option value="English">English</option>
                                <option value="French">French</option>
                                <option value="German">German</option>
                                <option value="Japanese">Japanese</option>
                                <option value="Korean">Korean</option>
                            </select>
                            <span onClick={() => setLearningLang3Toggle(false)}>
                                <img
                                    src="/images/elementminus.png"
                                    alt="minus"
                                />
                            </span>
                        </fieldset>
                        <button
                            onClick={(e: React.MouseEvent<HTMLElement>) =>
                                submitForm(e)
                            }
                        >
                            회원가입
                        </button>
                        <div className="getred">{signupErrorMsg}</div>
                    </fieldset>
                </form>
            </div>
        </>
    );
}

export default SignupPage;
