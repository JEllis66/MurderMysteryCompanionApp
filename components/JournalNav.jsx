import React, { useEffect, useRef } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FiMenu, FiHome, FiFileText } from 'react-icons/fi';
import { VscSplitVertical } from "react-icons/vsc";
import { AiOutlineFileSearch } from "react-icons/ai";
import { useActiveTab } from '../ActiveTabContext';
import { useSideMenu } from '../SideMenuContext';
import SideMenu from './SideMenu.jsx';
import { useUser } from '../UserContext.js'
import '../CSS/Navbar.css';

const JournalNav = () => {
  const { activeTab, setTab } = useActiveTab();
  const { toggleMenu, closeMenu, isMenuOpen } = useSideMenu();
  const {user,setUser} = useUser();
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
      setTab('notes-landing');
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
      variant='dark'
      className='neumorphic-navbar my-nav d-flex justify-content-between px-3'
      style={{ maxWidth: '100vw' }}
    >
      <Nav className='header-item'>
        <FiMenu className='my-nav-font-color' size={24} onClick={toggleMenu} />
      </Nav>

      <Nav className='header-item'>
      
        <Link
          style={{ textDecoration: 'none' }}
          to={'/journal-live/1'}
          className={`nav-link header-text ${
            !isAnyTabActive
              ? 'default-tab'
              : isTabActive('open-journal')
              ? 'active-tab'
              : 'dull-tab'
          }`}
          onClick={() => {
            closeMenu();
            handleTabClick('open-journal');
          }}
        >
          <FiFileText className='my-nav-font-color' size={22} />
        </Link>

        <Link
          style={{ textDecoration: 'none' }}
          to={'/journal-live/0'}
          className={`nav-link header-text ${
            !isAnyTabActive
              ? 'default-tab'
              : isTabActive('notes-landing')
              ? 'active-tab active-icon'
              : 'dull-tab'
          }`}
          onClick={() => {
            closeMenu();
            handleTabClick('notes-landing');
          }}
        >
          <VscSplitVertical className='my-nav-font-color' size={22} />
        </Link>

        <Link
          style={{ textDecoration: 'none' }}
          to={'/journal-live/2'}
          className={`nav-link header-text ${
            !isAnyTabActive
              ? 'default-tab'
              : isTabActive('clue-notes')
              ? 'active-tab'
              : 'dull-tab'
          }`}
          onClick={() => {
            closeMenu();
            handleTabClick('clue-notes');
          }}
        >
          <AiOutlineFileSearch className='my-nav-font-color' size={22} />
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

export default JournalNav;
