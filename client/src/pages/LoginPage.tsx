import { cookieConfig } from '../utils/cookieConfig.ts';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { useRef } from 'react';
import { useState } from 'react';
import '../styles/conditions.scss';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
    const [errormsg, setErrorMsg] = useState();
    const idRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    const [cookies, setCookies] = useCookies(['id']);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const _unusedCookies = cookies;

    const login = async (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        const res = await axios({
            url: '/login',
            method: 'post',
            data: {
                userid: idRef.current?.value,
                password: passwordRef.current?.value,
            },
        });
        const { msg, isLoggedin, userid } = res.data;
        setErrorMsg(msg);
        if (isLoggedin) {
            setCookies('id', userid, cookieConfig);
            navigate('/');
        }
    };

    return (
        <div className="logincontainer">
            <img
                className="loginlogo"
                src="/images/loginPageLogo.png"
                alt="logo-img"
            />
            <form>
                <input type="text" placeholder="ID" ref={idRef} /> <br />
                <input
                    type="password"
                    placeholder="Password"
                    ref={passwordRef}
                />{' '}
                <br />
                <img
                    src="/images/signinBtn.png"
                    alt="login-btn"
                    onClick={(e: React.MouseEvent<HTMLElement>) => login(e)}
                />
            </form>
            <p>
                Don't have an account? <a href="/signup">Sign up</a>
            </p>
            {!(
                errormsg === '' ||
                errormsg === undefined ||
                errormsg === null
            ) && <p className="getred">{errormsg}</p>}
        </div>
    );
}

export default LoginPage;
