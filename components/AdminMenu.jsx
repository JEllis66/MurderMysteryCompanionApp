// AdminMenu.jsx
import React, { useEffect, useState, forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { ImStatsBars } from "react-icons/im";
import { FiMenu, FiChevronDown, FiLock, FiTag, FiUser, FiSettings, FiList, FiUsers, FiPackage, FiUserPlus, FiChevronRight, FiMessageCircle, FiHome, FiLogOut, FiLayout, FiAlertTriangle, FiInfo, FiBell } from 'react-icons/fi';
import { useAdminMenu } from '../AdminMenuContext.js';
import { useUser } from '../UserContext.js/';
import '../CSS/SideMenu.css';

const AdminMenu = forwardRef((props, ref) => {
  const { appIdNum } = useUser();
  const { isMenuOpen, toggleMenu } = useAdminMenu();
  const [showRequestMenuItemsSub, setShowRequestMenuItemsSub] = useState(false);
  const [showEventMenuItemsSub, setShowEventMenuItemsSub] = useState(false);
  const [showItemMenuItemsSub, setShowItemMenuItemsSub] = useState(false);
  const [showCharacterMenuItemsSub, setShowCharacterMenuItemsSub] =
    useState(false);

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

  const toggleShowRequestSubItems = () => {
    setShowRequestMenuItemsSub(!showRequestMenuItemsSub);
  };

  const toggleShowEventSubItems = () => {
    setShowEventMenuItemsSub(!showEventMenuItemsSub);
  };

  const toggleShowItemSubItems = () => {
    setShowItemMenuItemsSub(!showItemMenuItemsSub);
  };

  const toggleShowCharacterSubItems = () => {
    setShowCharacterMenuItemsSub(!showCharacterMenuItemsSub);
  };

  useEffect(() => {
    requestFullScreen();
    setShowRequestMenuItemsSub(false);
    setShowEventMenuItemsSub(false);
    setShowItemMenuItemsSub(false);
    setShowCharacterMenuItemsSub(false);

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
      <div className='menu-background'  />

      <div
        className='menu-top'
        style={{
          borderBottom: '2px solid black',
          height: '60px',
          paddingBottom: '6px',
        }}
      >
        <div className='menu-icon' onClick={toggleMenu}>
          <Link to={`/login/${appIdNum}`} style={{ textDecoration: 'none' }}>
            <FiLogOut
              className='my-nav-font-color'
              size={24}
              style={{ fontWeight: 'bold' }}
            />
          </Link>
        </div>
        <div className='menu-icon' id='hamburger'>
          <FiMenu
            className='my-nav-font-color'
            size={24}
            style={{ fontWeight: 'bold' }}
            onClick={toggleMenu}
          />
        </div>
      </div>

      <div className='menu-content d-flex-box my-custom-scroll-skinny' style={{ overflowY: 'auto' }}>
        <div onClick={toggleMenu}>
          <Link
            onClick={toggleMenu}
            style={{ textDecoration: 'none' }}
            to={'/admin-dashboard'}
          >
            <div className='dashboardLink'>
              <FiHome className='theme-nav-font' />
              <b className='menu-main theme-nav-font' style={{ marginTop: '2px' }}>
                Admin DB
              </b>
              <FiHome className='theme-nav-font' />
            </div>
          </Link>
        </div>

        

        <div className='Event'>
          <div className='menu-item d-flex justify-content-between'>
            <Link
              className='icon-title my-nav-font-color'
              style={{ textDecoration: 'none', width: '75%' }}
              onClick={toggleMenu}
              to={'/admin-controls'}
            >
              <FiSettings className='my-nav-font-color' style={{ margin: '0px 5px 3px 0px' }} />
              <b className='menu-main my-nav-font-color'>Settings/Stats</b>
            </Link>
            <div onClick={toggleShowEventSubItems} className='drop-down'>
              {showEventMenuItemsSub ? (
                <div className='d-flex justify-content-between'>
                  <div></div>
                  <FiChevronDown className='my-nav-font-color' style={{ margin: '5px' }} />
                </div>
              ) : (
                <div className='d-flex justify-content-between'>
                  <div></div>
                  <FiChevronRight className='my-nav-font-color' style={{ margin: '5px' }} />
                </div>
              )}
            </div>
          </div>
          {showEventMenuItemsSub ? (
            <div className='database-menu-sub-items'>
              <Link
                onClick={toggleMenu}
                style={{ textDecoration: 'none' }}
                to={'/admin-controls'}
              >
                <div className='menu-item-sub'>
                  <span className='menu-sub-link' style={{ paddingTop: '2px' }}> App Settings </span>
                  <FiSettings className='menu-sub-link' style={{ marginLeft: '5px' }} />
                </div>
              </Link>
              <Link
                onClick={toggleMenu}
                style={{ textDecoration: 'none' }}
                to={'/event-portal'}
              >
                <div className='menu-item-sub'>
                  <span className='menu-sub-link' style={{ paddingTop: '2px' }}> Current Stats </span>
                  <ImStatsBars className='menu-sub-link' style={{ marginLeft: '5px' }} />
                </div>
              </Link>
            </div>
          ) : null}
        </div>

        <div className='Item'>
          <div className='menu-item d-flex justify-content-between'>
            <Link
              className='icon-title my-nav-font-color'
              style={{ textDecoration: 'none', width: '75%' }}
              onClick={toggleMenu}
              to={'/clues-news'}
            >
              <FiPackage className='my-nav-font-color' style={{ margin: '0px 5px 3px 0px' }} />
              <b className='menu-main my-nav-font-color'>Clues & News</b>
            </Link>
            <div onClick={toggleShowItemSubItems} className='drop-down'>
              {showItemMenuItemsSub ? (
                <div className='d-flex justify-content-between'>
                  <div></div>
                  <FiChevronDown className='my-nav-font-color' style={{ margin: '5px' }} />
                </div>
              ) : (
                <div className='d-flex justify-content-between'>
                  <div></div>
                  <FiChevronRight className='my-nav-font-color' style={{ margin: '5px' }} />
                </div>
              )}
            </div>
          </div>
          {showItemMenuItemsSub ? (
            <div className='item-menu-sub-items'>
              <Link
                onClick={toggleMenu}
                style={{ textDecoration: 'none' }}
                to={'/clues-news'}
              >
                <div className='menu-item-sub'>
                  <span className='menu-sub-link' style={{ paddingTop: '2px' }}> Clues & News Info </span>
                  <FiInfo className='menu-sub-link' style={{ marginLeft: '5px' }} />
                </div>
              </Link>
              <Link
                onClick={toggleMenu}
                style={{ textDecoration: 'none' }}
                to={'/story-item'}
              >
                <div className='menu-item-sub'>
                  <span className='menu-sub-link' style={{ paddingTop: '2px' }}> Clue List </span>
                  <FiPackage className='menu-sub-link' style={{ marginLeft: '5px' }} />
                </div>
              </Link>
              <Link
                onClick={toggleMenu}
                style={{ textDecoration: 'none' }}
                to={'/top-secret-list'}
              >
                <div className='menu-item-sub'>
                  <span className='menu-sub-link' style={{ paddingTop: '2px' }}> Top Secret Listings </span>
                  <FiLock className='menu-sub-link' style={{ marginLeft: '5px' }} />
                </div>
              </Link>
              <Link
                onClick={toggleMenu}
                style={{ textDecoration: 'none' }}
                to={'/news-list'}
              >
                <div className='menu-item-sub'>
                  <span className='menu-sub-link' style={{ paddingTop: '2px' }}> News Articles </span>
                  <FiBell className='menu-sub-link' style={{ marginLeft: '5px' }} />
                </div>
              </Link>
              
            </div>
          ) : null}
        </div>

        <div className='Request'>
          <div className='menu-item d-flex justify-content-between'>
            <Link
              className='icon-title my-nav-font-color'
              style={{ textDecoration: 'none', width: '75%' }}
              onClick={toggleMenu}
              to={'/user-help-portal'}
            >
              <FiMessageCircle className='my-nav-font-color' style={{ margin: '0px 5px 3px 0px' }} />
              <b className='menu-main my-nav-font-color'>User Help</b>
            </Link>
            <div onClick={toggleShowRequestSubItems} className='drop-down'>
              {showRequestMenuItemsSub ? (
                <div className='d-flex justify-content-between'>
                  <div></div>
                  <FiChevronDown className='my-nav-font-color' style={{ margin: '5px' }} />
                </div>
              ) : (
                <div className='d-flex justify-content-between'>
                  <div></div>
                  <FiChevronRight className='my-nav-font-color' style={{ margin: '5px' }} />
                </div>
              )}
            </div>
          </div>
          {showRequestMenuItemsSub ? (
          <div>
            <Link
                onClick={toggleMenu}
                style={{ textDecoration: 'none' }}
                to={'/user-help-portal'}
              >
                <div className='journal-menu-sub-items'>
                  <div className='menu-item-sub'>
                    <span className='menu-sub-link' style={{ paddingTop: '2px' }}> User Help Info </span>
                    <FiInfo className='menu-sub-link' style={{ marginLeft: '5px' }} />
                  </div>
                </div>
              </Link>
              <Link
                onClick={toggleMenu}
                style={{ textDecoration: 'none' }}
                to={'/request-portal'}
              >
                <div className='journal-menu-sub-items'>
                  <div className='menu-item-sub'>
                    <span style={{ paddingTop: '2px' }}> Request List </span>
                    <FiAlertTriangle style={{ marginLeft: '5px' }} />
                  </div>
                </div>
              </Link>
              <Link
                onClick={toggleMenu}
                style={{ textDecoration: 'none' }}
                to={'/user-messaging'}
              >
                <div className='journal-menu-sub-items'>
                  <div className='menu-item-sub'>
                    <span className='menu-sub-link' style={{ paddingTop: '2px' }}> Message Users </span>
                    <FiMessageCircle className='menu-sub-link' style={{ marginLeft: '5px' }} />
                  </div>
                </div>
              </Link>
              <Link
                onClick={toggleMenu}
                style={{ textDecoration: 'none' }}
                to={'/faq-list'}
              >
                <div className='journal-menu-sub-items'>
                  <div className='menu-item-sub'>
                    <span className='menu-sub-link' style={{ paddingTop: '2px' }}> FAQ's </span>
                    <FiTag className='menu-sub-link' style={{ marginLeft: '5px' }} />
                  </div>
                </div>
              </Link>
            </div>
          ) : null}
        </div>

        <div className='Character'>
          <div className='menu-item d-flex justify-content-between'>
            <Link
              className='icon-title my-nav-font-color'
              style={{ textDecoration: 'none', width: '75%' }}
              onClick={toggleMenu}
              to={'/character-portal'}
            >
              <FiUser className='my-nav-font-color' style={{ margin: '0px 5px 3px 0px' }} />
              <b className='menu-main my-nav-font-color'>Characters</b>
            </Link>
            <div onClick={toggleShowCharacterSubItems} className='drop-down'>
              {showCharacterMenuItemsSub ? (
                <div className='d-flex justify-content-between'>
                  <div></div>
                  <FiChevronDown className='my-nav-font-color' style={{ margin: '5px' }} />
                </div>
              ) : (
                <div className='d-flex justify-content-between'>
                  <div></div>
                  <FiChevronRight className='my-nav-font-color' style={{ margin: '5px' }} />
                </div>
              )}
            </div>
          </div>
          {showCharacterMenuItemsSub ? (
            <div className='item-menu-sub-items'>
              <Link
                onClick={toggleMenu}
                style={{ textDecoration: 'none' }}
                to={'/character-portal'}
              >
                <div className='menu-item-sub'>
                  <span className='menu-sub-link' style={{ paddingTop: '2px' }}> Character List </span>
                  <FiUsers className='menu-sub-link' style={{ marginLeft: '5px' }} />
                </div>
              </Link>
              <Link
                onClick={toggleMenu}
                style={{ textDecoration: 'none' }}
                to={'/create-character'}
              >
                <div className='menu-item-sub'>
                  <span className='menu-sub-link' style={{ paddingTop: '2px' }}> Create Character </span>
                  <FiUserPlus className='menu-sub-link' style={{ marginLeft: '5px' }} />
                </div>
              </Link>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
});

export default AdminMenu;
