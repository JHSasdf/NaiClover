import { cookieConfig } from './src/utils/cookieConfig';
import { useCookies } from 'react-cookie';

const [cookies, setCookies, removeCookies] = useCookies(['id']);
// 첫번째 파라미터는 useCookies['']안에 들어가는 값. 고로 여기서는 id
// cookie set
setCookies('id', '유저아이디', cookieConfig);

// cookies call cookies는 객체라서 [] 접근법으로 불러옵니다.
const idCookie = cookies['id'];

// remove, 다만 두번째 옵션은 선택.
removeCookies('id', cookieConfig);

// 예를 들면 로그아웃 버튼의 경우에는 요소에 클릭 이벤트를 걸어서
// removeCookies('id', cookieConfig)를 해주고 만약 현재 페이지가 id라는 cookie값이 있어야만 하는 페이지라면 (마이페이지나 채팅방 등) (로그인 해야만 들어가는 페이지라면) 메인 페이지로 navigate해주면 되겠죠.
