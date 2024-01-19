import React, {useEffect, useRef} from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FiMenu, FiHome } from 'react-icons/fi';
import { useSideMenu } from '../SideMenuContext';
import SideMenu from './SideMenu.jsx';
import { useUser } from '../UserContext.js'
import '../CSS/Navbar.css';

const GeneralNav = () => {
  const { toggleMenu, closeMenu, isMenuOpen } = useSideMenu();
  const { user } = useUser();

  const sideMenuRef = useRef(null);

  const handleClickOutside = (e) => {
    if (isMenuOpen && sideMenuRef.current && !sideMenuRef.current.contains(e.target)) {
      const isMenuButtonClicked = e.target.closest('.my-nav-font-color');
      if (!isMenuButtonClicked) {
        closeMenu();
      }
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isMenuOpen, closeMenu]);

  return (
    <Navbar
      className='neumorphic-navbar my-nav d-flex justify-content-between px-3'
      style={{ maxWidth: '100vw'}}
    >
      <Nav className='header-item'>
        <FiMenu className='my-nav-font-color' size={24} onClick={toggleMenu} />
      </Nav>

      <Nav onClick={() => closeMenu()}>
        <Nav.Link className='my-nav' href='#home' id='HomeLink'>
          <span className='my-nav-header'>{user.app_title}</span>
        </Nav.Link>
      </Nav>

      <Nav className='header-item' onClick={() => closeMenu()}>
        <Link
          className='text-decoration-none my-nav-font-color'
          id='homeNav'
          to='/dashboard'
        >
          <FiHome className='my-nav-font-color' size={24} />
        </Link>
      </Nav>
      <SideMenu toggleMenu={toggleMenu} ref={sideMenuRef} />
    </Navbar>
  );
};

export default GeneralNav;
