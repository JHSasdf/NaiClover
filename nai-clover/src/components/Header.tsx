import { Link } from 'react-router-dom';

function Header() {
  return (
    <header>
      <ul>
        <li>
          <Link to={'/'}>main</Link>
        </li>
        <li>
          <Link to={'/new'}>new dummy</Link>
        </li>
      </ul>
    </header>
  );
}

export default Header;
