// SideMenu.jsx
import React, { useEffect, useState, forwardRef  } from 'react';
import { Link } from 'react-router-dom';
import {
  FiMenu,
  FiChevronDown,
  FiCheckSquare,
  FiInfo,
  FiChevronRight,
  FiAlertTriangle,
  FiHelpCircle,
  FiBell,
  FiTag,
  FiHome,
  FiLogOut,
  FiPackage,
  FiFileText,
  FiSearch,
  FiLock,
  FiMessageCircle,
} from 'react-icons/fi';
import { SlGlobe } from "react-icons/sl";
import { CgProfile } from "react-icons/cg";
import { VscBook } from "react-icons/vsc";
import { VscSplitVertical } from "react-icons/vsc";
import { AiOutlineFileSearch } from "react-icons/ai";
import { MdOutlineContentPasteSearch } from "react-icons/md";
import { useSideMenu } from '../SideMenuContext.js';
import { useUser } from '../UserContext.js/';
import '../CSS/SideMenu.css';

const SideMenu = forwardRef((props, ref) => {
  const { appIdNum } = useUser();
  const { isMenuOpen, toggleMenu } = useSideMenu();
  const [showJournalMenuItemsSub, setShowJournalMenuItemsSub] = useState(false);
  const [showDatabaseMenuItemsSub, setShowDatabaseMenuItemsSub] = useState(false);
  const [showSocialMenuItemsSub, setShowSocialMenuItemsSub] = useState(false);
  const [showHelpMenuItemsSub, setShowHelpMenuItemsSub] = useState(false);
  const [hover, setHover] = useState(false);

  const updateGridLayout = () => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
  };

  const requestFullScreen = () => {
  	const checkIfMobile = () => {
      const userAgent = navigator.userAgent;
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)
    };
  	if (checkIfMobile){
      const element = document.documentElement;
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen(); // Firefox
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen(); // Chrome, Safari, and Opera
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen(); // Internet Explorer
      }
    }
  };

  const toggleShowJournalSubItems = () => {
    setShowJournalMenuItemsSub(!showJournalMenuItemsSub);
  };

  const toggleShowDatabaseSubItems = () => {
    setShowDatabaseMenuItemsSub(!showDatabaseMenuItemsSub);
  };

const toggleShowSocialSubItems = () => {
    setShowSocialMenuItemsSub(!showSocialMenuItemsSub);
  };

  const toggleShowHelpSubItems = () => {
    setShowHelpMenuItemsSub(!showHelpMenuItemsSub);
  };

  useEffect(() => {
    requestFullScreen();
    setShowJournalMenuItemsSub(false);
    setShowDatabaseMenuItemsSub(false);
    setShowSocialMenuItemsSub(false);
    setShowHelpMenuItemsSub(false);

    updateGridLayout();
    window.addEventListener('resize', updateGridLayout);
    return () => {
      window.removeEventListener('resize', updateGridLayout);
    };
  }, []);

  return (
    <div
      ref={ref}
      // onMouseLeave={closeMenu}
      className={`side-menu ${isMenuOpen ? 'open' : ''}`}
      style={{
        boxShadow: `${isMenuOpen ? '5vw 0 20px rgba(0, 0, 0, 0.5)' : ''}`,
      }}
    >
      <div className='menu-background' />

      <div
        className='menu-top'
        style={{
          borderBottom: '2px solid black',
          height: '60px',
          paddingBottom: '6px',
        }}
      >
        <div className='menu-icon' onClick={toggleMenu}>
          <Link to={''} style={{ textDecoration: 'none' }}>
            <FiLogOut
              className='my-nav-font-color'
              size={24}
              style={{ fontWeight: 'bold' }}
            />
          </Link>
        </div>
        <div className='menu-icon' id='hamburger' onClick={toggleMenu}>
          <FiMenu
            className='my-nav-font-color'
            size={24}
            style={{ fontWeight: 'bold' }}
          />
        </div>
      </div>

      <div  className='menu-content d-flex-box my-custom-scroll-skinny' style={{ overflowY: 'auto' }}>
        <div onClick={toggleMenu}>
          <Link
            style={{ textDecoration: 'none' }}
            to={''}
          >
            <div className='dashboardLink'>
              <FiHome className='theme-nav-font' />
              <b
                className='menu-main theme-nav-font'
                style={{ marginTop: '2px' }}
              >
                *SAMPLE MENU*
              </b>
              <FiHome className='theme-nav-font' />
            </div>
          </Link>
        </div>

        <div className='Journal'>
          <div className='menu-item d-flex justify-content-between'>
            <Link
              className='icon-title my-nav-font-color'
              style={{
                textDecoration: 'none',
                width: '75%',
                padding: '9px 0px',
              }}
              onClick={toggleMenu}
              to={''}
            >
              <VscBook
                className='my-nav-font-color'
                style={{ margin: '0px 5px 3px 0px' }}
              />
              <b className='menu-main my-nav-font-color'>Notebook</b>
            </Link>
            <div
              onClick={toggleShowJournalSubItems}
              className='drop-down my-nav-font-color'
            >
              {showJournalMenuItemsSub ? (
                <div className='d-flex justify-content-between'>
                  <div></div>
                  <FiChevronDown
                    className='my-nav-font-color'
                    style={{ margin: '5px' }}
                  />
                </div>
              ) : (
                <div className='d-flex justify-content-between'>
                  <div></div>
                  <FiChevronRight
                    className='my-nav-font-color'
                    style={{ margin: '5px' }}
                  />
                </div>
              )}
            </div>
          </div>
          {showJournalMenuItemsSub ? (
            <div className='journal-menu-sub-items'>
              <Link
                onClick={toggleMenu}
                style={{ textDecoration: 'none' }}
                to={''}
              >
                <div className='menu-item-sub'>
                  <span className='menu-sub-link' style={{ paddingTop: '2px' }}>
                    {' '}
                    Quick Notes{' '}
                  </span>
                  <FiFileText
                    className='menu-sub-link'
                    style={{ marginLeft: '5px' }}
                  />
                </div>
              </Link>
              <Link
                onClick={toggleMenu}
                style={{ textDecoration: 'none' }}
                to={''}
              >
                <div className='menu-item-sub'>
                  <span className='menu-sub-link' style={{ paddingTop: '2px' }}>
                    {' '}
                    My Notes{' '}
                  </span>
                  <VscSplitVertical
                    className='menu-sub-link'
                    style={{ marginLeft: '5px' }}
                  />
                </div>
              </Link>
              
              <Link
                onClick={toggleMenu}
                style={{ textDecoration: 'none' }}
                to={''}
              >
                <div className='menu-item-sub'>
                  <span className='menu-sub-link' style={{ paddingTop: '2px' }}>
                    {' '}
                    Clue Notes{' '}
                  </span>
                  <AiOutlineFileSearch
                    className='menu-sub-link'
                    style={{ marginLeft: '5px' }}
                  />
                </div>
              </Link>
            </div>
          ) : null}
        </div>

        <div className='Database'>
          <div className='menu-item d-flex justify-content-between'>
            <Link
              className='icon-title my-nav-font-color'
              style={{
                textDecoration: 'none',
                width: '75%',
                padding: '9px 0px',
              }}
              onClick={toggleMenu}
              to={''}
            >
              <MdOutlineContentPasteSearch
                className='my-nav-font-color'
                style={{ margin: '0px 5px 3px 0px' }}
              />
              <b className='menu-main my-nav-font-color'>Clues</b>
            </Link>
            <div onClick={toggleShowDatabaseSubItems} className='drop-down'>
              {showDatabaseMenuItemsSub ? (
                <div className='d-flex justify-content-between'>
                  <div></div>
                  <FiChevronDown
                    className='my-nav-font-color'
                    style={{ margin: '5px' }}
                  />
                </div>
              ) : (
                <div className='d-flex justify-content-between'>
                  <div></div>
                  <FiChevronRight
                    className='my-nav-font-color'
                    style={{ margin: '5px' }}
                  />
                </div>
              )}
            </div>
          </div>
          {showDatabaseMenuItemsSub ? (
            <div className='database-menu-sub-items'>
              <Link
                onClick={toggleMenu}
                style={{ textDecoration: 'none' }}
                to={''}
              >
                <div className='menu-item-sub'>
                  <span className='menu-sub-link' style={{ paddingTop: '2px' }}>
                    {' '}
                    Clue Portal Info{' '}
                  </span>
                  <FiInfo
                    className='menu-sub-link'
                    style={{ marginLeft: '5px' }}
                  />
                </div>
              </Link>
              <Link
                onClick={toggleMenu}
                style={{ textDecoration: 'none' }}
                to={''}
              >
                <div className='menu-item-sub'>
                  <span className='menu-sub-link' style={{ paddingTop: '2px' }}>
                    Clue Items
                  </span>
                  <FiPackage
                    className='menu-sub-link'
                    style={{ marginLeft: '5px' }}
                  />
                </div>
              </Link>
              <Link
                onClick={toggleMenu}
                style={{ textDecoration: 'none' }}
                to={''}
              >
                <div className='menu-item-sub'>
                  <span className='menu-sub-link' style={{ paddingTop: '2px' }}>
                    {' '}
                    Search Clues{' '}
                  </span>
                  <FiSearch
                    className='menu-sub-link'
                    style={{ marginLeft: '5px' }}
                  />
                </div>
              </Link>
              <Link
                onClick={toggleMenu}
                style={{ textDecoration: 'none' }}
                to={''}
              >
                <div className='menu-item-sub'>
                  <span className='menu-sub-link' style={{ paddingTop: '2px' }}>
                    {' '}
                    Top Secret{' '}
                  </span>
                  <FiLock
                    className='menu-sub-link'
                    style={{ marginLeft: '5px' }}
                  />
                </div>
              </Link>
            </div>
          ) : null}
        </div>

        <div className='Social'>
          <div className='menu-item d-flex justify-content-between'>
            <Link
              className='icon-title my-nav-font-color'
              style={{
                textDecoration: 'none',
                width: '75%',
                padding: '9px 0px',
              }}
              onClick={toggleMenu}
              to={''}
            >
              <SlGlobe
                className='my-nav-font-color'
                style={{ margin: '0px 5px 3px 0px' }}
              />
              <b className='menu-main my-nav-font-color'>Social</b>
            </Link>
            <div onClick={toggleShowSocialSubItems} className='drop-down'>
              {showSocialMenuItemsSub ? (
                <div className='d-flex justify-content-between'>
                  <div></div>
                  <FiChevronDown
                    className='my-nav-font-color'
                    style={{ margin: '5px' }}
                  />
                </div>
              ) : (
                <div className='d-flex justify-content-between'>
                  <div></div>
                  <FiChevronRight
                    className='my-nav-font-color'
                    style={{ margin: '5px' }}
                  />
                </div>
              )}
            </div>
          </div>
          {showSocialMenuItemsSub ? (
            <div className='social-menu-sub-items'>
              <Link
                onClick={toggleMenu}
                style={{ textDecoration: 'none' }}
                to={''}
              >
                <div className='menu-item-sub'>
                  <span className='menu-sub-link' style={{ paddingTop: '2px' }}>
                    {' '}
                    Social Portal Info{' '}
                  </span>
                  <FiInfo
                    className='menu-sub-link'
                    style={{ marginLeft: '5px' }}
                  />
                </div>
              </Link>
              <Link
                onClick={toggleMenu}
                style={{ textDecoration: 'none' }}
                to={''}
              >
                <div className='menu-item-sub'>
                  <span className='menu-sub-link' style={{ paddingTop: '2px' }}>
                    My Profile
                  </span>
                  <CgProfile
                    className='menu-sub-link'
                    style={{ marginLeft: '5px' }}
                  />
                </div>
              </Link>
              <Link
                onClick={toggleMenu}
                style={{ textDecoration: 'none' }}
                to={''}
              >
                <div className='menu-item-sub'>
                  <span className='menu-sub-link' style={{ paddingTop: '2px' }}>
                    {' '}
                    My Messages{' '}
                  </span>
                  <FiMessageCircle
                    className='menu-sub-link'
                    style={{ marginLeft: '5px' }}
                  />
                </div>
              </Link>
              <Link
                onClick={toggleMenu}
                style={{ textDecoration: 'none' }}
                to={''}
              >
                <div className='menu-item-sub'>
                  <span className='menu-sub-link' style={{ paddingTop: '2px' }}>
                    {' '}
                    Breaking News{' '}
                  </span>
                  <FiBell
                    className='menu-sub-link'
                    style={{ marginLeft: '5px' }}
                  />
                </div>
              </Link>
            </div>
          ) : null}
        </div>

        <div className='Help'>
          <div
            className='menu-item d-flex justify-content-between my-nav-font-color'
            onClick={toggleShowHelpSubItems}
          >
            <Link
              className='icon-title my-nav-font-color'
              style={{
                textDecoration: 'none',
                width: '75%',
                padding: '9px 0px',
              }}
              onClick={toggleMenu}
              to={''}
            >
              <FiHelpCircle
                className='my-nav-font-color'
                style={{ margin: '0px 5px 3px 0px' }}
              />
              <b className='menu-main my-nav-font-color'>Help</b>
            </Link>
            <div onClick={toggleShowHelpSubItems} className='drop-down'>
              {showHelpMenuItemsSub ? (
                <div className='d-flex justify-content-between'>
                  <div></div>
                  <FiChevronDown
                    className='my-nav-font-color'
                    style={{ margin: '5px' }}
                  />
                </div>
              ) : (
                <div className='d-flex justify-content-between'>
                  <div></div>
                  <FiChevronRight
                    className='my-nav-font-color'
                    style={{ margin: '5px' }}
                  />
                </div>
              )}
            </div>
          </div>
          {showHelpMenuItemsSub ? (
            <div className='help-menu-sub-items'>
              <Link
                onClick={toggleMenu}
                style={{ textDecoration: 'none' }}
                to={''}
              >
                <div className='menu-item-sub'>
                  <span className='menu-sub-link' style={{ paddingTop: '2px' }}>
                    {' '}
                    Help Home{' '}
                  </span>
                  <FiInfo
                    className='menu-sub-link'
                    style={{ marginLeft: '5px' }}
                  />
                </div>
              </Link>
              <Link
                onClick={toggleMenu}
                style={{ textDecoration: 'none' }}
                to={''}
              >
                <div className='menu-item-sub'>
                  <span className='menu-sub-link' style={{ paddingTop: '2px' }}>
                    {' '}
                    FAQ's{' '}
                  </span>
                  <FiTag
                    className='menu-sub-link'
                    style={{ marginLeft: '5px' }}
                  />
                </div>
              </Link>
              <Link
                onClick={toggleMenu}
                style={{ textDecoration: 'none' }}
                to={''}
              >
                <div className='menu-item-sub'>
                  <span className='menu-sub-link' style={{ paddingTop: '2px' }}>
                    {' '}Request Help{' '}
                  </span>
                  <FiAlertTriangle
                    className='menu-sub-link'
                    style={{ marginLeft: '5px' }}
                  />
                </div>
              </Link>
              <Link
                onClick={toggleMenu}
                style={{ textDecoration: 'none' }}
                to={''}
              >
                <div  id='final-sub-menu' className='menu-item-sub'>
                  <span className='menu-sub-link' style={{ paddingTop: '2px' }}>
                    {' '}
                    My Help Requests{' '}
                  </span>
                  <FiFileText
                    className='menu-sub-link'
                    style={{ marginLeft: '5px' }}
                  />
                </div>
              </Link>
              
            </div>
          ) : null}
        </div>
        <div 
          className='text-center my-2'
          onMouseOver={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <button id='vote-button'>
            <Link
              id='vote'
              className={`text-decoration-none text-uppercase fw-bold ${hover ? 'text-white':'theme_nav_font'}`}
              to={''}
              onClick={toggleMenu}
            >
              Vote <FiCheckSquare />
            </Link>
          </button>
        </div>
      </div>
    </div>

  );
});

export default SideMenu;
