import { useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const navigate = useNavigate();
  return (
    <div className='header'>
      <h1 className='header__logo' onClick={() => navigate('/')}>
        Hacker News
      </h1>
    </div>
  );
};

export default Header;
