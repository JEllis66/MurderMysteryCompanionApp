import { React, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../UserContext.js';
import { FiMessageCircle, FiBell} from 'react-icons/fi';
import { CgProfile } from "react-icons/cg";
import { useActiveTab } from '../ActiveTabContext';
import { useAlert } from '../AlertContext.js';
import '../CSS/info-popup.css';

const Social = () => {
  const { activeTab, setTab } = useActiveTab();
  const { showAlert } = useAlert();
  const { user } = useUser();

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
        `Welcome to the Social Portal where you can review your character information, Messages, Alerts, and News Articles!`, 
        () => handleConf(),``
      );
    } else if (input === 'my-profile') {
      showAlert(
        `The "My Profile" Page is used to review your character's information.`, 
        () => handleConf(),``
      );
    } else if (input === 'my-messages') {
      showAlert(
        `The "My Messages" Page is used to read messages/alerts that you have sent/received from the app.`, 
        () => handleConf(),``
      );
    } else {
      showAlert(
        `The "Breaking News" Page is used to review News Articles that have been posted related to your game!`, 
        () => handleConf(),``
      );
    }
  };

  useEffect(() => {
    requestFullScreen();
    setTab('social');
  }, [activeTab]);

  return (
    <div className='container justify-content-center'>
      <div className='pb-2'>
        <h1 className='my-page-font-color text-center'> {user.username[user.username.length - 1] === 's' ? `${user.username+"'"}` : `${user.username+"'s"}`}</h1>
        <h2 className='my-nav-font-color header-text text-center'>Social Portal:</h2>
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
        <div className='info-popup-mini mt-4' id='database-logistics'>
            <div className='info-header pb-2' style={{ cursor: 'default'}}>
              <h3 className='text-black pt-3'>Social Portal</h3>
              <div className='info-icon' onClick={() => showChange('how')}>i</div>
            </div>
          </div>

          <div className='info-popup-mini mt-1' id='my-profile-tab'>
            <div className='info-header pb-2' style={{cursor: 'default'}}>
              <Link style={{ textDecoration: 'none', cursor: 'pointer' }} to={'/my-profile'}>
                <h3 className='text-primary pt-3'><CgProfile style={{padding: '5px', marginTop: '-4px', backgroundColor: 'rgba(0,0,0,0.1)', borderRadius: '5px'}} size={28}/> <u>My Profile:</u></h3>
              </Link>
              <div className='info-icon' onClick={() => showChange('my-profile')}>i</div>
            </div>
          </div>

          <div className='info-popup-mini mt-1' id='my-messages-tab'>
            <div className='info-header pb-2' style={{cursor: 'default'}}>
              <Link style={{ textDecoration: 'none', cursor: 'pointer' }} to={'/my-messages'}>
                <h3 className='text-primary text-center pt-3'><FiMessageCircle style={{padding: '5px', marginTop: '-4px', backgroundColor: 'rgba(0,0,0,0.1)', borderRadius: '5px'}} size={28}/> <u>My Messages:</u></h3>
              </Link>
              <div className='info-icon' onClick={() => showChange('my-messages')}>i</div>
            </div>
          </div>

          <div className='info-popup-mini mt-1' id='news-tab'>
            <div className='info-header pb-2' style={{cursor: 'default'}}>
              <Link style={{ textDecoration: 'none', cursor: 'pointer' }} to={'/news'}>
                <h3 className='text-primary text-center pt-3'><FiBell style={{padding: '5px', marginTop: '-4px', backgroundColor: 'rgba(0,0,0,0.1)', borderRadius: '5px'}} size={28} /> <u>News:</u></h3>
              </Link>
              <div className='info-icon' onClick={() => showChange('news')}>i</div>
            </div>
          </div>

      </div>
    </div>
  );
};

export default Social;
