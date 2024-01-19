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
        console.log(res.data);
        const { msg, isLoggedin, userid } = res.data;
        setErrorMsg(msg);
        if (isLoggedin) {
            setCookies('id', userid, cookieConfig);
            navigate(-1);
        }
    };

    return (
        <div>
            <form>
                <input type="text" placeholder="ID" ref={idRef} />
                <input
                    type="password"
                    placeholder="password"
                    ref={passwordRef}
                />
                <button
                    onClick={(e: React.MouseEvent<HTMLElement>) => login(e)}
                >
                    Login
                </button>
            </form>
            {!(
                errormsg === '' ||
                errormsg === undefined ||
                errormsg === null
            ) && <p className="getred">{errormsg}</p>}
        </div>
    );
}

export default LoginPage;
