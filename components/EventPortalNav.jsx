import React, { useEffect, useRef } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FiMenu, FiHome, FiSettings } from 'react-icons/fi';
import { ImStatsBars } from "react-icons/im";
import { useAdminMenu } from '../AdminMenuContext';
import AdminMenu from './AdminMenu.jsx';
import { useActiveTab } from '../ActiveTabContext';
import '../CSS/Navbar.css';

const EventPortalNav = () => {
  const { activeTab, setTab } = useActiveTab();
  const { toggleMenu, closeMenu, isMenuOpen } = useAdminMenu();
  const adminMenuRef = useRef(null);

  const handleTabClick = tabId => {
    setTab(tabId);
  };

  const isTabActive = tabId => activeTab === tabId;
  const isAnyTabActive = activeTab !== '';

  const handleHomeNavClick = () => {
    closeMenu();
    setTab('');
  };

  useEffect(() => {
    if (activeTab === '') {
      setTab('event-portal');
    }
  }, [activeTab]);

  const handleClickOutside = e => {
    if (
      isMenuOpen &&
      adminMenuRef.current &&
      !adminMenuRef.current.contains(e.target)
    ) {
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

      <Nav className='header-item'>
        <Link
          style={{ textDecoration: 'none' }}
          to='/admin-controls'
          className={`nav-link text-white ${
            !isAnyTabActive
              ? 'default-tab'
              : isTabActive('admin-controls')
              ? 'active-tab'
              : 'dull-tab'
          }`}
          onClick={() => {
            closeMenu();
            handleTabClick('admin-controls');
          }}
        >
          <FiSettings className='my-nav-font-color' size={20} />
        </Link>
        <Link
          style={{ textDecoration: 'none' }}
          to='/event-portal'
          className={`nav-link header-text text-white ${
            !isAnyTabActive
              ? 'default-tab'
              : isTabActive('event-portal')
              ? 'active-tab active-icon'
              : 'dull-tab'
          }`}
          onClick={() => {
            closeMenu();
            handleTabClick('event-portal');
          }}
        >
          <ImStatsBars className='my-nav-font-color' size={20} style={{ marginBottom: '3px' }} />
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

export default EventPortalNav;
