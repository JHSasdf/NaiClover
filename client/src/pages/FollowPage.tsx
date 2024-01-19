import { useRef } from 'react';
import axios from 'axios';

function FollowPage() {
    const myinput = useRef<HTMLInputElement>(null);
    const followinput = useRef<HTMLInputElement>(null);
    const follow = async () => {
        const res = await axios({
            method: 'post',
            url: '/followexec',
            data: {
                userid: myinput.current?.value,
                followId: followinput.current?.value,
            },
        });
    };
    const unfollow = async () => {
        const res = await axios({
            method: 'post',
            url: '/unfollowexec',
            data: {
                userid: myinput.current?.value,
                followId: followinput.current?.value,
            },
        });
    };
    return (
        <>
            나: <input type="text" placeholder="myId" ref={myinput} />
            <br />
            상대방 :{' '}
            <input type="text" placeholder="otherUser" ref={followinput} />
            <br />
            <button onClick={() => follow()}>follow</button>
            <br />
            <button onClick={() => unfollow()}>unfollow</button>
            <br />
        </>
    );
}

export default FollowPage;
