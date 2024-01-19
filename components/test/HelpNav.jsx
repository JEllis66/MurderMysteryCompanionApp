import React, { useEffect, useRef } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FiMenu,  FiHome, FiInfo, FiTag, FiFileText, FiAlertTriangle } from 'react-icons/fi';
import { useSideMenu } from '../SideMenuContext'; 
import SideMenu from './SideMenu.jsx';
import '../CSS/Navbar.css';
import { useActiveTab } from '../ActiveTabContext';

const HelpNav = () => {
  const { activeTab, setTab } = useActiveTab();
  const { toggleMenu, closeMenu, isMenuOpen } = useSideMenu();
  const sideMenuRef = useRef(null);

  const handleTabClick = (tabId) => {
      setTab(tabId); 
  };

  const isTabActive = (tabId) => activeTab === tabId;
  const isAnyTabActive = activeTab !== ''; 

  const handleHomeNavClick = () => {
    closeMenu();
    setTab(''); 
  };

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
    <Navbar className="neumorphic-navbar d-flex justify-content-between px-3" style={{maxWidth:'100vw'}}>

      <Nav className="header-item">
        <FiMenu className="my-nav-font-color" size={24} onClick={toggleMenu} /> 
      </Nav>
      
      <Nav className="header-item">

          <Link
            style={{ textDecoration: 'none' }}
            to="/help"
            className={`nav-link header-text my-nav-font-color ${
              !isAnyTabActive ? 'default-tab' : isTabActive('help') ? 'active-tab active-icon' : 'dull-tab'
            }`}
            onClick={() => {
              closeMenu();
              handleTabClick('help');
            }}
          >
            <FiInfo className='my-nav-font-color' size={20} style={{marginBottom: '3px'}}/>
          </Link>

          <Link
            style={{ textDecoration: 'none' }}
            to="/help-faqs"
            className={`nav-link my-nav-font-color ${
              !isAnyTabActive ? 'default-tab' : isTabActive('help-faqs') ? 'active-tab' : 'dull-tab'
            }`}
            onClick={() => {
              closeMenu();
              handleTabClick('help-faqs');
            }}
          >
            <FiTag className='my-nav-font-color' size={22}/>
          </Link>
          
          <Link
            style={{ textDecoration: 'none' }}
            to="/help-request"
            className={`nav-link my-nav-font-color ${
              !isAnyTabActive ? 'default-tab' : isTabActive('help-request') ? 'active-tab' : 'dull-tab'
            }`}
            onClick={() => {
              closeMenu();
              handleTabClick('help-request');
            }}
          >
            <FiAlertTriangle className='my-nav-font-color' size={22}/>
          </Link>

          <Link
            style={{ textDecoration: 'none' }}
            to="/help-my-requests"
            className={`nav-link my-nav-font-color ${
              !isAnyTabActive ? 'default-tab' : isTabActive('help-my-requests') ? 'active-tab' : 'dull-tab'
            }`}
            onClick={() => {
              closeMenu();
              handleTabClick('help-my-requests');
            }}
          >
            <FiFileText className='my-nav-font-color' size={22}/>
          </Link>
        </Nav>

      <Nav className="header-item">
        <Link
          className="ml-auto text-decoration-nonemy-nav-font-color"
          id="homeNav"
          to="/dashboard"
          onClick={handleHomeNavClick}
        >
          <FiHome className='my-nav-font-color' size={24} />
        </Link>
      </Nav>
      <SideMenu toggleMenu={toggleMenu} ref={sideMenuRef} />
    </Navbar>
  );
};

export default HelpNav;
