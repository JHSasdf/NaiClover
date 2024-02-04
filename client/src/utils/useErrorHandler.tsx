import { useNavigate } from 'react-router-dom';

function useErrorHandler() {
    const navigate = useNavigate();

    const errorHandler = (status: number) => {
        switch (status) {
            case 401:
                return navigate('/login');
            case 404:
                return navigate('/404');
            case 403:
                return navigate('/401');
            default:
                navigate('/500');
        }
    };
    return { errorHandler: errorHandler };
}

export default useErrorHandler;
