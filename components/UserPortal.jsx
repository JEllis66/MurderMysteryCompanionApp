import { React, useEffect } from 'react';
import { useActiveTab } from '../ActiveTabContext';
import { Link } from 'react-router-dom';
import { FiPackage, FiLock, FiBell, FiAlertTriangle, FiMessageCircle, FiTag } from 'react-icons/fi';
import { useAlert } from '../AlertContext.js';
import '../CSS/info-popup.css';

const UserPortal = () => {
  const { activeTab, setTab } = useActiveTab();
  const { showAlert } = useAlert();

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

  const handleConf = () =>{
    console.log("Closing alert.")
  }

  const showChange = input => {
    if (input === 'how') {
      showAlert(
        `Welcome to the "User Portal" where you can view and answer Users' questions!`, 
        () => handleConf(),``
      );
    } else if (input === 'user-requests') {
      showAlert(
        `The "User Requests" Page is used to view and resposne to users' requests throughout the game.`, 
        () => handleConf(),``
      );
    } else if (input === 'secret') {
      showAlert(
        `The "User Messaging" Page is used to communicate with Users via text messaging.`, 
        () => handleConf(),``
      );
    } else {
      showAlert(
        `The "FAQs" Page is used to manage FAQ's, providing readily available answers to Users' common concerns.`, 
        () => handleConf(),``
      );
    }
  };

  useEffect(() => {
    requestFullScreen();
    setTab('user-help-portal');
  }, []);

  return (
    <div className='container justify-content-center'>
      <div className='pb-2'>
        <h1 className="header-text text-center">User Help Portal:</h1>
      </div>

      <div
        className='info-container container pt-2 my-custom-scroll'
        style={{ 
          overflowY: 'auto', 
          padding: '0px 10px', 
          height: '65vh',
          marginTop: '-15px' 
        }}
      >
        <div className='info-popup-mini mt-4' id='user-help-welcome'>
            <div className='info-header pb-2' style={{ cursor: 'default'}}>
              <h3 className='text-black pt-3'>User Help</h3>
              <div className='info-icon' onClick={() => showChange('how')}>i</div>
            </div>
          </div>

          <div className='info-popup-mini mt-1' id='user-request-manager'>
            <div className='info-header pb-2' style={{cursor: 'default'}}>
              <Link style={{ textDecoration: 'none', cursor: 'pointer' }} to={'/request-portal'}>
                <h3 className='text-primary pt-3'><FiAlertTriangle style={{padding: '5px', marginTop: '-4px', backgroundColor: 'rgba(0,0,0,0.1)', borderRadius: '5px'}} size={28}/> <u>User Requests:</u></h3>
              </Link>
              <div className='info-icon' onClick={() => showChange('user-requests')}>i</div>
            </div>
          </div>

          <div className='info-popup-mini mt-1' id='user-messaging'>
            <div className='info-header pb-2' style={{cursor: 'default'}}>
              <Link style={{ textDecoration: 'none', cursor: 'pointer' }} to={'/user-messaging'}>
                <h3 className='text-primary text-center pt-3'><FiMessageCircle style={{padding: '5px', marginTop: '-4px', backgroundColor: 'rgba(0,0,0,0.1)', borderRadius: '5px'}} size={28}/> <u>User Messaging:</u></h3>
              </Link>
              <div className='info-icon' onClick={() => showChange('secret')}>i</div>
            </div>
          </div>

          <div className='info-popup-mini mt-1' id='faq-list'>
            <div className='info-header pb-2' style={{cursor: 'default'}}>
              <Link style={{ textDecoration: 'none', cursor: 'pointer' }} to={'/faq-list'}>
                <h3 className='text-primary text-center pt-3'><FiTag style={{padding: '5px', marginTop: '-4px', backgroundColor: 'rgba(0,0,0,0.1)', borderRadius: '5px'}} size={28} /> <u>FAQ's:</u></h3>
              </Link>
              <div className='info-icon' onClick={() => showChange('faqs')}>i</div>
            </div>
          </div>

      </div>
    </div>
  );
};

export default UserPortal;
