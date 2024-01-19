import React, { useEffect, useRef } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FiMenu, FiHome } from 'react-icons/fi';
import { useAdminMenu } from '../AdminMenuContext'; 
import AdminMenu from './AdminMenu.jsx';
import '../CSS/Navbar.css'; 

const TopSecretNav = () => {

  const { toggleMenu, closeMenu, isMenuOpen } = useAdminMenu();
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
    <Navbar className="neumorphic-navbar d-flex justify-content-between px-3" style={{maxWidth:'100vw'}}>
      
      <Nav className="header-item">
        <FiMenu className="text-white" size={24} onClick={toggleMenu} /> 
      </Nav>

      <Nav onClick={() => closeMenu()}>  
        <Nav.Link id="HomeLink">
          <span className="my-nav-header">Top Secret</span>
        </Nav.Link>
      </Nav>

      <Nav className="header-item" onClick={() => closeMenu()}>
        <Link
          className="ml-auto text-decoration-none text-white"
          id="homeNav"
          to="/admin-dashboard"
        >
          <FiHome size={24} />
        </Link>
      </Nav>
      <AdminMenu toggleMenu={toggleMenu} ref={adminMenuRef} />
    </Navbar>
  );
};

export default TopSecretNav;
