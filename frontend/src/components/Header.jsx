import { Link } from 'react-router-dom';

import './Header.css';

import camera from '../assets/camera.svg';
import logo from '../assets/logo.svg';

function Header() {
  return (
    <header id='main-header'>
      <div className='header-content'>
        <Link to='/'>
          <img src={logo} alt='Instagram' />
        </Link>
        <Link to='/new'>
          <img src={camera} alt='Enviar publicação' />
        </Link>
      </div>
    </header>
  );
}

export default Header;
