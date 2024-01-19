import { React, useEffect, useRef } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FiMenu, FiInfo, FiLock, FiPackage, FiHome, FiSearch } from 'react-icons/fi';
import { useSideMenu } from '../SideMenuContext';
import SideMenu from './SideMenu.jsx';
import { useActiveTab } from '../ActiveTabContext';
import '../CSS/Navbar.css';

const DBNav = () => {
  const { activeTab, setTab } = useActiveTab();
  const { toggleMenu, closeMenu, isMenuOpen } = useSideMenu();
  const sideMenuRef = useRef(null);

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
      setTab('database');
    }
  }, [activeTab]);  

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
      className='neumorphic-navbar d-flex justify-content-between px-3'
      style={{ maxWidth: '100vw' }}
    >
      <Nav className='header-item'>
        <FiMenu className='my-nav-font-color' size={24} onClick={toggleMenu} />
      </Nav>

      <Nav className='header-item'>
        <Link
          style={{ textDecoration: 'none' }}
          to='/clues'
          className={`nav-link header-text my-nav-font-color ${
            !isAnyTabActive
              ? 'default-tab'
              : isTabActive('database')
              ? 'active-tab active-icon'
              : 'dull-tab'
          }`}
          onClick={() => {
            closeMenu();
            handleTabClick('database');
          }}
        >
          <FiInfo className='my-nav-font-color' size={20} style={{ marginBottom: '3px' }} />
        </Link>

        <Link
          style={{ textDecoration: 'none' }}
          to='/my-clues'
          className={`nav-link my-nav-font-color ${
            !isAnyTabActive
              ? 'default-tab'
              : isTabActive('my-items')
              ? 'active-tab'
              : 'dull-tab'
          }`}
          onClick={() => {
            closeMenu();
            handleTabClick('my-items');
          }}
        >
          <FiPackage className='my-nav-font-color' size={22} />
        </Link>

        <Link
          style={{ textDecoration: 'none' }}
          to='/search-clues'
          className={`nav-link my-nav-font-color ${
            !isAnyTabActive
              ? 'default-tab'
              : isTabActive('browse-database')
              ? 'active-tab'
              : 'dull-tab'
          }`}
          onClick={() => {
            closeMenu();
            handleTabClick('browse-database');
          }}
        >
          <FiSearch className='my-nav-font-color' size={22} />
        </Link>

        <Link
          style={{ textDecoration: 'none' }}
          to='/classified'
          className={`nav-link my-nav-font-color ${
            !isAnyTabActive
              ? 'default-tab'
              : isTabActive('top-secret')
              ? 'active-tab'
              : 'dull-tab'
          }`}
          onClick={() => {
            closeMenu();
            handleTabClick('top-secret');
          }}
        >
          <FiLock className='my-nav-font-color' size={22} />
        </Link>
      </Nav>

      <Nav className='header-item'>
        <Link
          className='text-decoration-none'
          id='homeNav'
          to='/dashboard'
          onClick={handleHomeNavClick}
        >
          <FiHome className='my-nav-font-color' size={24} />
        </Link>
      </Nav>
      <SideMenu toggleMenu={toggleMenu} ref={sideMenuRef} />
    </Navbar>
  );
};

export default DBNav;
