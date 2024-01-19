import React, { useEffect, useRef } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FiMenu, FiHome } from 'react-icons/fi';
import { useAdminMenu } from '../AdminMenuContext';
import { useUser } from '../UserContext.js';
import AdminMenu from './AdminMenu.jsx';
import '../CSS/Navbar.css';

const CharacterPortalNav = () => {
  const { toggleMenu, closeMenu, isMenuOpen } = useAdminMenu();
  const { user } = useUser();
  const adminMenuRef = useRef(null);

  const handleClickOutside = (e) => {
    if (isMenuOpen && adminMenuRef.current && !adminMenuRef.current.contains(e.target)) {
      const isMenuButtonClicked = e.target.closest('svg');
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
      className='neumorphic-navbar d-flex justify-content-between px-3'
      style={{ maxWidth: '100vw' }}
    >
      <Nav className='header-item'>
        <FiMenu className='my-nav-font-color' size={24} onClick={toggleMenu} />
      </Nav>

      <Nav>
        <Nav.Link id='HomeLink' onClick={() => closeMenu()}>
          <span className='my-nav-header'>Characters</span>
        </Nav.Link>
      </Nav>

      <Nav className='header-item' onClick={() => closeMenu()}>
        <Link
          className='ml-auto text-decoration-none my-nav-font-color'
          id='homeNav'
          to='/admin-dashboard'
        >
          <FiHome className='my-nav-font-color' size={24} />
        </Link>
      </Nav>
      <AdminMenu toggleMenu={toggleMenu} ref={adminMenuRef} />
    </Navbar>
  );
};

export default CharacterPortalNav;
