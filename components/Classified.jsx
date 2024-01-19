import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiLock, FiSend } from 'react-icons/fi';
import { useActiveTab } from '../ActiveTabContext';
import { useUser } from '../UserContext.js';
import '../CSS/table.css';

const Classified = () => {

  const navigate = useNavigate();
  const { user } = useUser();
  const { activeTab, setTab } = useActiveTab();

  const [classifiedSearch, setClassifiedSearch] = useState('');
  const [showError, setShowError] = useState(false);
  const [randomError, setRandomError] = useState('')
  const [isLandscape, setIsLandscape] = useState(false);

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

  const exitFullScreen = () => {
    const checkIfMobile = () => {
      const userAgent = navigator.userAgent;
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)
    };
  	if (checkIfMobile){
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen(); // Firefox
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen(); // Chrome, Safari, and Opera
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen(); // Internet Explorer
      }
    }
  };

  const errorPhrases = [
  "No trespassing, unless you bring pizza!",
  "Keep out unless you're a unicorn.",
  "Unauthorized personnel will be tickled.",
  "Beware of ninja cats ahead!",
  "This area is for professional dancers only.",
  "It's Rude to Intrude!",
  "No entry for the party poopers!",
  "Authorized personnel only; cookies inside!",
  "Step off, Step off, Step off, Step off, Step off, Step off!.",
  "Warning: Area protected by invisible force field!",
  "This space reserved for people who matter.",
  "If you're not a penguin, waddle away!",
  "You! shall not! pass!",
  "You don't belong here, unless you bring donuts!",
  "You shouldn't have come here!",
  "We Hate you!",
  "Enter only if you know the secret handshake.",
  "Speak Friend and Enter.",
  "No entry for the non-fabulous humans.",
  "Authorized personnel only!",
  "This space reserved for alien encounters.",
  "Do not try again.",
  "Keep out unless you can hula hoop with a flamingo.",
  "Leave now, and never come back!",
  "Keep Away! This area is for professional bubble wrap poppers.",
  "Only certified goofballs allowed beyond this point.",
  "Unauthorized access will not be tolerated!",
  "Entry restricted to authorized personnel only.",
  "Access granted exclusively to permitted individuals.",
  "No entry without proper authorization!",
  "Only authorized individuals may proceed.",
  "Trespassers will face legal consequences.",
  "This area is off-limits without permission.",
  "Violators will be subject to legal action.",
  "Entry prohibited without the appropriate clearance.",
  "Restricted zone; access without authorization is prohibited.",
  "No admittance without the required credentials.",
  "Unpermitted access is strictly forbidden.",
  "This space is for authorized individuals only.",
  "Unauthorized intrusion is against the rules.",
  "Entry is restricted to approved personnel.",
  "Access is granted to those with proper clearance.",
  "Trespassers will be met with security measures.",
  "This area is secured and off-limits to unauthorized visitors.",
  "Entry is denied without proper identification.",
  "Only authorized personnel may proceed beyond this point.",
];

  const updateGridLayout = () => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    setIsLandscape(vw > vh);
  };

  useEffect(() => {
    requestFullScreen();
    setTab('top-secret');
    updateGridLayout();
    //setShowError(false);
    window.addEventListener('resize', updateGridLayout);
    return () => {
      window.removeEventListener('resize', updateGridLayout);
    };
  }, []);

  const sqlIDs = []
  //SQL query for array of all security clearnce ID's
  const allClearanceIDs = sqlIDs.concat(['MELLON', 'MELON']);
 
 const chooseRandError = () => {
    const randomInd = Math.floor(Math.random() * errorPhrases.length);
    setRandomError(errorPhrases[randomInd]);
 }

  const checkID = (classifiedSearchInput) => {
    if(allClearanceIDs.includes(classifiedSearchInput.toUpperCase()) && (user.priv_level === 'Admin' || user.priv_level === 'Authorized')){
      navigate('/classified-database');
    } else {
      chooseRandError();
      setShowError(true);
    };
  }

  const iconFontSize = isLandscape
    ? Math.ceil(window.innerHeight * 0.06)
    : Math.ceil(window.innerHeight * 0.045);

  const searchWidth = isLandscape ? '600px' : '90%';

  return (
    <div className='container d-flex-column justify-content-center text-center'>
      <h1 className='header-text'>Classified Database:</h1>
      <div className='d-flex justify-content-between'>
        <div></div>
        <FiLock id='classified-lock' className={`text-${showError ? 'danger':'white'} my-2`} style={{ fontSize: '20vh' }} />
        <div></div>
      </div>
      <div className='create-character-container d-flex-column justify-content-center'>
        <form
          id='searchForm'
          style={{ width: searchWidth }}
          onSubmit={e => {
            e.preventDefault();
            checkID(classifiedSearch);
          }}
        >
          <div
            className='form-group'
            style={{ textAlign: 'center', position: 'relative' }}
          >
            <label htmlFor='search' className='header-text mt-2 mb-1'>
              Enter I.D.:
            </label>
            <div className='input-group'>
              <input
                type='text'
                id={`classifiedSearchInput${showError ? 'Error':''}`}
                name='search'
                placeholder='type here'
                className='form-input-password text-start'
                value={classifiedSearch}
                onChange={e => setClassifiedSearch(e.target.value)}
                onClick={() => exitFullScreen()}
                style={{
                  height: '12vh',
                  fontSize: `${isLandscape ? '6vh' : '4.1vh'}`,
                  textTransform: 'uppercase',
                  paddingLeft: '5%',
                  paddingRight: '17%',
                  borderRadius: '4px',
                  border: `2px solid ${showError ? '#DC3545' : '#0D6EFD'}`
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  right: '5%',
                  transform: 'translateY(-50%)',
                  cursor: 'pointer',
                }}
                onClick={() => {
                  checkID(classifiedSearch);
                }}
              >
                <FiSend className={`text-${showError ? 'danger' : 'primary'}`} size={iconFontSize} />
              </div>
            </div>
          </div>
        </form>
      </div>
      {
        showError ? (
          <div>
            <div className='text-danger text-uppercase fst-italic' style={{marginTop: '-4vh'}}>ERROR:</div>
            <div className='my-page-font-color text-uppercase'>{randomError}</div>
          </div>
        ) : (
          <div>
          </div>
        )
      }
    </div>
  );
};

export default Classified;
