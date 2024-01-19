import { React, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../UserContext.js';
import { FiPackage, FiSearch, FiBell} from 'react-icons/fi';
import { useActiveTab } from '../ActiveTabContext';
import { useAlert } from '../AlertContext.js';
import '../CSS/info-popup.css';

const Database = () => {
  const { activeTab, setTab } = useActiveTab();
  const { showAlert } = useAlert();
  const { user } = useUser();

  const handleConf = () =>{
    console.log("Closing alert.")
  }

  const showChange = input => {
    if (input === 'how') {
      showAlert(
        `Welcome to the Clue Portal where you can search for data on Clues you find throughout the game!`, 
        () => handleConf(),``
      );
    } else if (input === 'items') {
      showAlert(
        `The "Clue Items" Page is used to review any pieces of evidence that you have reviewed from your Database Searches.`, 
        () => handleConf(),``
      );
    } else if (input === 'search') {
      showAlert(
        `The "Search Database" Page is used to lookup clues you find throughout the game!`, 
        () => handleConf(),``
      );
    } else {
      showAlert(
        `The "Top Secret" Page is another database search "Only for authorized personnel..."`, 
        () => handleConf(),``
      );
    }
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
    setTab('database');
  }, [activeTab]);

  useEffect(()=>{
    requestFullScreen();
  },[])

  return (
    <div className='container justify-content-center'>
      <div className='pb-2'>
        <h1 className='my-page-font-color text-center'> {user.username[user.username.length - 1] === 's' ? `${user.username+"'"}` : `${user.username+"'s"}`}</h1>
        <h2 className='header-text text-center'>Clue Portal:</h2>
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
              <h3 className='text-black pt-3'>My Clues:</h3>
              <div className='info-icon' onClick={() => showChange('how')}>i</div>
            </div>
          </div>

          <div className='info-popup-mini mt-1' id='my-items-tab'>
            <div className='info-header pb-2' style={{cursor: 'default'}}>
              <Link style={{ textDecoration: 'none', cursor: 'pointer' }} to={'/my-clues'}>
                <h3 className='text-primary pt-3'><FiPackage style={{padding: '5px', marginTop: '-4px', backgroundColor: 'rgba(0,0,0,0.1)', borderRadius: '5px'}} size={28}/> <u>Clue Items:</u></h3>
              </Link>
              <div className='info-icon' onClick={() => showChange('items')}>i</div>
            </div>
          </div>

          <div className='info-popup-mini mt-1' id='searchDB-tab'>
            <div className='info-header pb-2' style={{cursor: 'default'}}>
              <Link style={{ textDecoration: 'none', cursor: 'pointer' }} to={'/search-clues'}>
                <h3 className='text-primary text-center pt-3'><FiSearch style={{padding: '5px', marginTop: '-4px', backgroundColor: 'rgba(0,0,0,0.1)', borderRadius: '5px'}} size={28}/> <u>Search Clues:</u></h3>
              </Link>
              <div className='info-icon' onClick={() => showChange('search')}>i</div>
            </div>
          </div>

          <div className='info-popup-mini mt-1' id='news-tab'>
            <div className='info-header pb-2' style={{cursor: 'default'}}>
              <Link style={{ textDecoration: 'none', cursor: 'pointer' }} to={'/classified'}>
                <h3 className='text-primary text-center pt-3'><FiBell style={{padding: '5px', marginTop: '-4px', backgroundColor: 'rgba(0,0,0,0.1)', borderRadius: '5px'}} size={28} /> <u>Top Secret:</u></h3>
              </Link>
              <div className='info-icon' onClick={() => showChange('top-secret')}>i</div>
            </div>
          </div>

      </div>
    </div>
  );
};

export default Database;
