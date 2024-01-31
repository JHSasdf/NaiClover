import axios from 'axios';
import '../../styles/NewPostHeader.scss';
import { useNavigate } from 'react-router-dom';

interface CorrectingPageHeaderProps {
    cleanCookie: () => void;
    content: string[];
    id: any;
    postUserId: string;
}

const CorrectingPageHeader: React.FC<CorrectingPageHeaderProps> = (props) => {
    const { cleanCookie, content, id, postUserId } = props;
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
                        // addComment(JSON.stringify(content));
                        cleanCookie();
                        navigate(-1);
                    }}
                >
                    전송
                </div>
            </div>
        </>
    );
};

export default CorrectingPageHeader;
