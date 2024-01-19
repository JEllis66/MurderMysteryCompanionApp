import React, { useEffect, useRef } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { FiMenu, FiLogOut } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useUser } from '../UserContext.js'
import { useSideMenu } from '../SideMenuContext';
import SideMenu from './SideMenu.jsx';
import '../CSS/Navbar.css';

const HomeNav = () => {
  const { toggleMenu, closeMenu, isMenuOpen } = useSideMenu();
  const {user, appIdNum} = useUser();
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
      variant='dark'
      className='neumorphic-navbar my-nav d-flex justify-content-between px-3'
      style={{ maxWidth: '100vw' }}
    >
      <Nav className='header-item'>
        <FiMenu className='my-nav-font-color' size={24} onClick={toggleMenu} />
      </Nav>

      <Nav onClick={() => closeMenu()}>
        <span className='my-nav-header fw-bold'>{user.app_title}</span>
      </Nav>

      <Nav className='ml-auto my-nav-font-color header-item' onClick={() => closeMenu()}>
        <Link to={`/login/${appIdNum}`} style={{ textDecoration: 'none' }}>
          <FiLogOut className='my-nav-font-color' size={24} />
        </Link>
      </Nav>

      <SideMenu toggleMenu={toggleMenu} ref={sideMenuRef} />
    </Navbar>
  );
};

export default HomeNav;
