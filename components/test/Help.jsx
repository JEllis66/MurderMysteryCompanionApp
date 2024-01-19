import { React, useEffect, useState } from 'react';
import { useActiveTab } from '../ActiveTabContext';
import { Link } from 'react-router-dom';
import { FiTag, FiFileText, FiAlertTriangle } from 'react-icons/fi';
import { useUser } from '../UserContext.js';
import { useAlert } from '../AlertContext.js';
import '../CSS/info-popup.css';

const Help = () => {
  const { activeTab, setTab } = useActiveTab();
  const { showAlert } = useAlert();
  const { user, appIdNum } = useUser();

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
        `Welcome to the Help Portal where you can get help with using the app or guidance for playing the game!`, 
        () => handleConf(),``
      );
    } else if (input === 'faqs') {
      showAlert(
        `The "FAQ's" Page is used to review Common questions/issues that arrise using the app/playing the game.`, 
        () => handleConf(),``
      );
    } else if (input === 'request-help') {
      showAlert(
        `The "Request Help" Page is used to submit a question or concern to get help from admins.`, 
        () => handleConf(),``
      );
    } else {
      showAlert(
        `The "My Requests" Page is used to review your previously submitted help requests.`, 
        () => handleConf(),``
      );
    }
  };

  useEffect(() => {
    setTab('help');
  }, [activeTab]);

  useEffect(()=>{
    requestFullScreen();
  },[])

  return (
    <div className='container justify-content-center'>
      <div className='pb-2'>
        <h1 className='my-page-font-color text-center'> {user.username[user.username.length - 1] === 's' ? `${user.username+"'"}` : `${user.username+"'s"}`}</h1>
        <h2 className='header-text text-center'>Help Portal:</h2>
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
        <div className='info-popup-mini mt-4' id='help-welcome'>
            <div className='info-header pb-2' style={{ cursor: 'default'}}>
              <h3 className='text-black pt-3'>Help Portal:</h3>
              <div className='info-icon' onClick={() => showChange('how')}>i</div>
            </div>
          </div>

          <div className='info-popup-mini mt-1' id='help-faqs'>
            <div className='info-header pb-2' style={{cursor: 'default'}}>
              <Link style={{ textDecoration: 'none', cursor: 'pointer' }} to={'/help-faqs'}>
                <h3 className='text-primary pt-3'><FiTag style={{padding: '5px', marginTop: '-4px', backgroundColor: 'rgba(0,0,0,0.1)', borderRadius: '5px'}} size={28}/> <u>FAQ's</u></h3>
              </Link>
              <div className='info-icon' onClick={() => showChange('FAQs')}>i</div>
            </div>
          </div>

          <div className='info-popup-mini mt-1' id='help-request'>
            <div className='info-header pb-2' style={{cursor: 'default'}}>
              <Link style={{ textDecoration: 'none', cursor: 'pointer' }} to={'/help-request'}>
                <h3 className='text-primary text-center pt-3'><FiFileText style={{padding: '5px', marginTop: '-4px', backgroundColor: 'rgba(0,0,0,0.1)', borderRadius: '5px'}} size={28}/> <u>Request Help:</u></h3>
              </Link>
              <div className='info-icon' onClick={() => showChange('create')}>i</div>
            </div>
          </div>

          <div className='info-popup-mini mt-1' id='help-myRquests'>
            <div className='info-header pb-2' style={{cursor: 'default'}}>
              <Link style={{ textDecoration: 'none', cursor: 'pointer' }} to={'/help-my-requests'}>
                <h3 className='text-primary text-center pt-3'><FiAlertTriangle style={{padding: '5px', marginTop: '-4px', backgroundColor: 'rgba(0,0,0,0.1)', borderRadius: '5px'}} size={28} /> <u>My Requests:</u></h3>
              </Link>
              <div className='info-icon' onClick={() => showChange('requests')}>i</div>
            </div>
          </div>

      </div>
    </div>
  );
};

export default Help;
