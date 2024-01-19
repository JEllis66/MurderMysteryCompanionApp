import React, { useEffect, useRef } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FiMenu, FiHome, FiTag, FiAlertTriangle, FiInfo, FiMessageCircle } from 'react-icons/fi';
import { useAdminMenu } from '../AdminMenuContext';
import { useActiveTab } from '../ActiveTabContext';
import AdminMenu from './AdminMenu.jsx';
import '../CSS/Navbar.css';

const RequestPortalNav = () => {
  const { toggleMenu, closeMenu, isMenuOpen } = useAdminMenu();
  const { activeTab, setTab } = useActiveTab();
  const adminMenuRef = useRef(null);

  const isTabActive = tabId => activeTab === tabId;
  const isAnyTabActive = activeTab !== '';

  const handleTabClick = tabId => {
    setTab(tabId);
  };

  const handleHomeNavClick = () => {
    closeMenu();
    setTab('');
  };

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
      className='neumorphic-navbar my-nav d-flex justify-content-between px-3'
      style={{ maxWidth: '100vw' }}
    >
      <Nav className='header-item'>
        <FiMenu className='my-nav-font-color' size={24} onClick={toggleMenu} />
      </Nav>

      <Nav className='header-item'>

        <Link
          style={{ textDecoration: 'none' }}
          to='/user-help-portal'
          className={`nav-link header-text my-nav-font-color ${
            !isAnyTabActive
              ? 'user-help-portal'
              : isTabActive('user-help-portal')
              ? 'active-tab active-icon'
              : 'dull-tab'
          }`}
          onClick={() => {
            closeMenu();
            handleTabClick('user-help-portal');
          }}
        >
          <FiInfo className='my-nav-font-color' size={20} style={{ marginBottom: '3px' }} />
        </Link>

        <Link
          style={{ textDecoration: 'none' }}
          to='/request-portal'
          className={`nav-link header-text my-nav-font-color ${
            !isAnyTabActive
              ? 'request-portal'
              : isTabActive('request-portal')
              ? 'active-tab active-icon'
              : 'dull-tab'
          }`}
          onClick={() => {
            closeMenu();
            handleTabClick('request-portal');
          }}
        >
          <FiAlertTriangle className='my-nav-font-color' size={20} style={{ marginBottom: '3px' }} />
        </Link>
        
        <Link
          style={{ textDecoration: 'none' }}
          to='/user-messaging'
          className={`nav-link header-text my-nav-font-color ${
            !isAnyTabActive
              ? 'user-messaging'
              : isTabActive('user-messaging')
              ? 'active-tab active-icon'
              : 'dull-tab'
          }`}
          onClick={() => {
            closeMenu();
            handleTabClick('user-messaging');
          }}
        >
          <FiMessageCircle className='my-nav-font-color' size={20} style={{ marginBottom: '3px' }} />
        </Link>

        <Link
          style={{ textDecoration: 'none' }}
          to='/faq-list'
          className={`nav-link my-nav-font-color ${
            !isAnyTabActive
              ? 'default-tab'
              : isTabActive('faq-list')
              ? 'active-tab'
              : 'dull-tab'
          }`}
          onClick={() => {
            closeMenu();
            handleTabClick('faq-list');
          }}
        >
          <FiTag className='my-nav-font-color' size={20} />
        </Link>
        
      </Nav>

      <Nav className='header-item'>
        <Link
          className='ml-auto text-decoration-none my-nav-font-color'
          id='homeNav'
          to='/admin-dashboard'
          onClick={handleHomeNavClick}
        >
          <FiHome className='my-nav-font-color' size={24} />
        </Link>
      </Nav>
      <AdminMenu toggleMenu={toggleMenu} ref={adminMenuRef} />
    </Navbar>
  );
};

export default RequestPortalNav;
