import axios from 'axios';
import '../../styles/NewPostHeader.scss';
import { useNavigate } from 'react-router-dom';

const CorrectingPageHeader = (props: any) => {
    const { cleanCookie, content, id, postUserId, tempLines } = props;
    const navigate = useNavigate();

    const addComment = async (content: string) => {
        try {
            const res = await axios({
                method: 'post',
                url: `/lang/comments/createcomment/${id}`,
                data: {
                    content: content,
                    postUserId: postUserId,
                    isrevised: true,
                    // postType: culturePost.postType,?? 필요한가..?
                },
                withCredentials: true,
            });
        } catch (error: any) {
            console.log('error', error);
        }
    };
    const checkChangeAndSend = () => {
        let i = -1;
        while (content[++i]) {
            if (content[i] !== tempLines[i]) {
                console.log('불일치');
                addComment(tempLines.join('&&&&'));
                break;
            }
        }
    };
    return (
        <>
            <div className="newpost-header-container">
                <div
                    className="back-arrow"
                    onClick={() => {
                        cleanCookie();
                        navigate(-1);
                    }}
                ></div>
                <div className="newpost-header-text">Correcting</div>
                <div
                    className="create-correction"
                    onClick={() => {
                        checkChangeAndSend();
                        cleanCookie();
                        navigate(-1);
                    }}
                >
                    완료
                </div>
            </div>
        </>
    );
};

export default CorrectingPageHeader;
