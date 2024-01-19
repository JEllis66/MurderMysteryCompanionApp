import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiHelpCircle } from 'react-icons/fi';
import { SlGlobe } from "react-icons/sl";
import { VscBook } from "react-icons/vsc";
import { MdOutlineContentPasteSearch } from "react-icons/md";
import { useUser } from '../UserContext.js';

const Dashboard = () => {
  const [isLandscape, setIsLandscape] = useState(false);
  const { user } = useUser();

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
    ? Math.ceil(window.innerHeight * 0.065)
    : Math.ceil(window.innerHeight * 0.031);

  return (
    <div className='dashboard-container' style={{ width: '100vw' }}>
      { !isLandscape ? 
        <div>
          <h3 className='dashboard-header my-page-font-color'>
            Welcome,
          </h3>
          <h3 className='text-center my-page-font-color text-uppercase' style={{ marginTop: '-5vh', marginBottom: '2vh' }}>
            {user.username}
          </h3>
        </div>
        : null
      }
      <div
        className={`tile-container-${isLandscape ? 'landscape' : 'portrait'}`}
      >
        <Link to={'/journal-live/0'} style={{ textDecoration: 'none' }}>
          <div
            className={`tile-${isLandscape ? 'landscape' : 'portrait'} journal`}
          >
            <div className='tile-text'>
              <div className='icon'>
                <VscBook size={iconFontSize} />
              </div>
              <div style={{ fontSize: `${tileFontSize}px` }}>Notebook</div>
            </div>
          </div>
        </Link>

        <Link to={'/clues'} style={{ textDecoration: 'none' }}>
          <div
            className={`tile-${
              isLandscape ? 'landscape' : 'portrait'
            } database`}
          >
            <div className='tile-text'>
              <div className='icon'>
                <MdOutlineContentPasteSearch size={iconFontSize} />
              </div>
              <div
                className='tile-icon'
                style={{ fontSize: `${tileFontSize}px` }}
              >
                Clues
              </div>
            </div>
          </div>
        </Link>

        <Link to={'/social'} style={{ textDecoration: 'none' }}>
          <div
            className={`tile-${
              isLandscape ? 'landscape' : 'portrait'
            } classified`}
          >
              <div className='tile-text'>
              <div className='icon'>
                <SlGlobe size={iconFontSize} />
              </div>
              <div style={{ fontSize: `${tileFontSize}px` }}>Social</div>
            </div>
            </div>
        </Link>

        <Link to={'/help'} style={{ textDecoration: 'none' }}>
          <div
            className={`tile-${isLandscape ? 'landscape' : 'portrait'} help`}
          >
            <div className='tile-text'>
              <div className='icon'>
                <FiHelpCircle size={iconFontSize} />
              </div>
              <div
                className='tile-icon'
                style={{ fontSize: `${tileFontSize}px` }}
              >
                Help
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
