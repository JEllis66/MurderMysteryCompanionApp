import React, { useEffect, useRef  } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { FiMenu, FiLogOut } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useAdminMenu } from '../AdminMenuContext';
import AdminMenu from './AdminMenu.jsx';
import { useUser } from '../UserContext.js';
import '../CSS/Navbar.css';

const AdminHomeNav = () => {
  const { toggleMenu, closeMenu, isMenuOpen } = useAdminMenu();
  const { user, appIdNum } = useUser();
  const adminMenuRef = useRef(null);

  const handleClickOutside = (e) => {
    if (isMenuOpen && adminMenuRef.current && !adminMenuRef.current.contains(e.target)) {
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
        <span className='my-nav-header'>{user.app_title}</span>
      </Nav>

      <Nav className='ml-auto header-item' onClick={() => closeMenu()}>
        <Link to={`/login/${appIdNum}`} style={{ textDecoration: 'none', color: 'var(--theme-nav-font-color)' }}>
          <FiLogOut className='my-nav-font-color' size={24} />
        </Link>
      </Nav>

      <AdminMenu toggleMenu={toggleMenu} ref={adminMenuRef} />
    </Navbar>
  );
};

export default AdminHomeNav;
