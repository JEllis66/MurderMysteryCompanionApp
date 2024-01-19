import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiSettings, FiMessageCircle, FiPackage, FiUsers } from 'react-icons/fi';
import '../CSS/Dashboard.css';

const AdminDashboard = ({ username }) => {
  const [isLandscape, setIsLandscape] = useState(false);

  const updateGridLayout = () => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    setIsLandscape(vw > vh);
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

  useEffect(() => {
    updateGridLayout();
    requestFullScreen();

    window.addEventListener('resize', updateGridLayout);

    return () => {
      window.removeEventListener('resize', updateGridLayout);
    };
  }, []);

  const iconFontSize = isLandscape
    ? Math.ceil(window.innerHeight * 0.13)
    : Math.ceil(window.innerHeight * 0.067);
  const tileFontSize = isLandscape
    ? Math.ceil(window.innerHeight * 0.06)
    : Math.ceil(window.innerHeight * 0.031);

  return (
    <div className='dashboard-container'>
      {!isLandscape ?
        <h1 className='dashboard-header my-page-font-color'>
          Admin Dashboard
        </h1> : null }
      <div
        className={`tile-container-${isLandscape ? 'landscape' : 'portrait'}`}
      >
        <Link to={'/admin-controls'} style={{ textDecoration: 'none' }}>
          <div
            className={`tile-${isLandscape ? 'landscape' : 'portrait'} journal`}
          >
            <div
              className='tile-text'
              style={{ fontSize: `${tileFontSize}px` }}
            >
              <p className='icon'>
                <FiSettings size={iconFontSize} />
              </p>
              Settings & Stats
            </div>
          </div>
        </Link>

        <Link to={'/clues-news'} style={{ textDecoration: 'none' }}>
          <div
            className={`tile-${
              isLandscape ? 'landscape' : 'portrait'
            } database`}
          >
            <div className='tile-text pt-3'>
              <div className='icon'>
                <FiPackage size={iconFontSize} />
              </div>
              <p style={{ fontSize: `${tileFontSize}px` }}>Clues & News</p>
            </div>
          </div>
        </Link>

        <Link to={'/user-help-portal'} style={{ textDecoration: 'none' }}>
          <div
            className={`tile-${
              isLandscape ? 'landscape' : 'portrait'
            } classified`}
          >
            <div className='tile-text'>
              <p className='icon'>
                <FiMessageCircle size={iconFontSize} />
              </p>
              <div style={{ fontSize: `${tileFontSize}px` }}>User Communication</div>
            </div>
          </div>
        </Link>

        <Link to={'/character-portal'} style={{ textDecoration: 'none' }}>
          <div
            className={`tile-${isLandscape ? 'landscape' : 'portrait'} help`}
          >
            <div className='tile-text pt-3'>
              <div className='icon'>
                <FiUsers size={iconFontSize} />
              </div>
              <p style={{ fontSize: `${tileFontSize}px` }}>Character Editor</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
