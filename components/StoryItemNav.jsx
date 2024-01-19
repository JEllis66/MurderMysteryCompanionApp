import React, { useEffect, useRef } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FiMenu, FiHome, FiLock, FiPackage, FiBell, FiInfo } from 'react-icons/fi';
import { useAdminMenu } from '../AdminMenuContext';
import { useActiveTab } from '../ActiveTabContext';
import AdminMenu from './AdminMenu.jsx';
import '../CSS/Navbar.css';

const StoryItemNav = () => {
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
      setTab('clues-news');
    }
  }, [activeTab]);

  const handleClickOutside = e => {
    if (
      isMenuOpen &&
      adminMenuRef.current &&
      !adminMenuRef.current.contains(e.target)
    ) {
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
      className='neumorphic-navbar d-flex justify-content-between px-3'
      style={{ maxWidth: '100vw' }}
    >
      <Nav className='header-item'>
        <FiMenu className='my-nav-font-color' size={24} onClick={toggleMenu} />
      </Nav>

      <Nav className='header-item'>

        <Link
          style={{ textDecoration: 'none' }}
          to='/clues-news'
          className={`nav-link header-text text-white ${
            !isAnyTabActive
              ? 'default-tab'
              : isTabActive('clues-news')
              ? 'active-tab active-icon'
              : 'dull-tab'
          }`}
          onClick={() => {
            closeMenu();
            handleTabClick('clues-news');
          }}
        >
          <FiInfo size={20} style={{ marginBottom: '3px' }} />
        </Link>
        <Link
          style={{ textDecoration: 'none' }}
          to='/story-item'
          className={`nav-link header-text text-white ${
            !isAnyTabActive
              ? 'default-tab'
              : isTabActive('story-item')
              ? 'active-tab active-icon'
              : 'dull-tab'
          }`}
          onClick={() => {
            closeMenu();
            handleTabClick('story-item');
          }}
        >
          <FiPackage size={20} style={{ marginBottom: '3px' }} />
        </Link>

        <Link
          style={{ textDecoration: 'none' }}
          to='/top-secret-list'
          className={`nav-link header-text text-white ${
            !isAnyTabActive
              ? 'default-tab'
              : isTabActive('top-secret-list')
              ? 'active-tab active-icon'
              : 'dull-tab'
          }`}
          onClick={() => {
            closeMenu();
            handleTabClick('top-secret-list');
          }}
        >
          <FiLock size={20} style={{ marginBottom: '3px' }} />
        </Link>

        <Link
          style={{ textDecoration: 'none' }}
          to='/news-list'
          className={`nav-link text-white ${
            !isAnyTabActive
              ? 'default-tab'
              : isTabActive('news-list')
              ? 'active-tab'
              : 'dull-tab'
          }`}
          onClick={() => {
            closeMenu();
            handleTabClick('news-list');
          }}
        >
          <FiBell size={20} />
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

export default StoryItemNav;
