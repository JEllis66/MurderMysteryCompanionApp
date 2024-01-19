import React, { useState, useEffect } from 'react';
import Image from 'react-bootstrap/Image';
import { useUser } from '../UserContext.js';
import { Link, useParams } from 'react-router-dom';
import { MdOutlineQrCode2 } from "react-icons/md";
import { FiArrowLeft, FiSave, FiMoon, FiSun } from 'react-icons/fi';
import { VscBook } from 'react-icons/vsc';
import { useConfirmation } from '../ConfirmationContext.js';
import '../CSS/style.css';

const StoryItemView = () => {
  const { showConfirmation } = useConfirmation();
  const [myItemNote, setMyItemNote] = useState('');
  const [noteUpdateChecker, setNoteUpdateChecker] = useState('');
  const [isAppBGDark, setIsAppBGDark] = useState(true);
  const [isReset, setIsReset] = useState(true);
  const [isClicked, setIsClicked] = useState(false);
  const [showSavedMessage, setShowSavedMessage] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const { id } = useParams();
  const { appIdNum } = useUser();
  const [item, setItem] = useState({});

  const exitFullScreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen(); // Firefox
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen(); // Chrome, Safari, and Opera
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen(); // Internet Explorer
    }
  };

  const requestFullScreen = () => {
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
    };

  const fetchAppBGColor = () => {
    const apps = [
      {
        id: '001',
        bg_color: '#303030',
      },
      {
        id: '002',
        bg_color: '#EEEEEE',
      },
    ];
    const thisApp = apps.find(app => app.id === appIdNum);
    setIsAppBGDark(isColorDark(thisApp.bg_color));
  };

  const isColorDark = hexColor => {
    const sanitizedColor = hexColor.replace('#', '');

    const r = parseInt(sanitizedColor.substring(0, 2), 16);
    const g = parseInt(sanitizedColor.substring(2, 4), 16);
    const b = parseInt(sanitizedColor.substring(4, 6), 16);

    const brightness = (r * 299 + g * 587 + b * 114) / 1000;

    return brightness < 128;
  };

  useEffect(() => {
    requestFullScreen();
    const checkIfMobile = () => {
      const userAgent = navigator.userAgent;
      setIsMobile(
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          userAgent
        )
      );
    };
    checkIfMobile();
    const fetchData = () => {
      return [
        {
          id: '008',
          title: 'Plane Ticket',
          lookupCode: '4JD82N7W',
          description:
            'This is a One-Way airline ticket adressed to LAX from BOS.',
          content: '17SVl6T3hSSyNeZhMmdo80YOvujwXRRAC',
          noteContent:
            'This plane ticket was a one-way ticket to LAX. It appears to have staple holes meaning perhaps paired with another ticket...',
        },
        {
          id: '015',
          title: 'Knife',
          lookupCode: '93MD8WN',
          description:
            'This Knife was crafted with the sole purpose of fileting yellowfin saku; this may belong to a chef known for their Japanese cuisine...',
          content: '1CQ7-BcKgO6xhKMpEnKLBYrP77QQ8neKO',
          noteContent:
            'This bloodstained appears to be chefs knife, one likely used only in fine-dining restaurants based on the quality...',
        },
        {
          id: '022',
          title: 'Mask',
          lookupCode: 'KTLS9SEJ',
          description: 'A mask worn by a suspect or something..?',
          content: '1s8LmlE_Z5UVAqQ9PUeOiVQsz3Dar7lmM',
          noteContent: 'Looks mad sus',
        },
      ];
    };

    const data = fetchData();
    const myItem = data.find(item => item.id === id);
    const savedContent = localStorage.getItem('themeColor');
    if (savedContent) {
      savedContent === 'light' ? setIsAppBGDark(false) : setIsAppBGDark(true);
    } else {
      fetchAppBGColor();
    }
    setItem(myItem);
    setMyItemNote(myItem.noteContent);
    setNoteUpdateChecker(myItem.noteContent);
    // const fetchData = async () => {
    //   try {
    //     // Simulate fetching data from the server
    //     const response = await axios.get('/api/getPlayerNotes');
    //     setPlayerNotes(response.data);
    //   } catch (error) {
    //     console.error('Error fetching data:', error);
    //   }
    // };
  }, []);

  const toggleBackgroundTheme = input => {
    if (input === 'change') {
      setIsAppBGDark(!isAppBGDark);
    } else if (input === 'hoverLeave') {
      if (!isClicked) {
        setIsAppBGDark(!isAppBGDark);
      }
    }
  };

  const handleThemeClick = () => {
    if (isMobile) {
      setIsAppBGDark(!isAppBGDark);
    } else {
      setIsClicked(true);
    }
  };

  const handleThemeLeave = () => {
    if (!isMobile) {
      toggleBackgroundTheme('hoverLeave');
      setIsClicked(false);
      setIsReset(true);
    }
  };

  const handleThemeEnter = () => {
    if (!isMobile) {
      if (isReset) {
        toggleBackgroundTheme('change');
      }
      setIsReset(false);
    }
  };

  useEffect(() => {
    adjustTextAreaRows();
  }, [myItemNote]);

  useEffect(() => {
    let themeColorToSet;
    isAppBGDark ? (themeColorToSet = 'dark') : (themeColorToSet = 'light');
    localStorage.setItem('themeColor', themeColorToSet);
  }, [isAppBGDark]);

  const adjustTextAreaRows = () => {
    const textarea = document.getElementById('myItemNote');
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight + 5}px`;
  };

  const handleClueNoteSubmission = str => {
    console.log('saved entry: ', str);
    setShowSavedMessage(true);
    setTimeout(() => {
      setShowSavedMessage(false);
    }, [1200]);
    setMyItemNote(str);
    setNoteUpdateChecker(str);
    //write to database axios.put(/item-note-update/myItemNote)
  };

  return (
    <div
      className={`container`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: 'calc(90vh - 75px)',
      }}
    >
      <h1 className='d-flex justify-content-between big-header-text text-center mb-3'>
        <div
          style={{
            opactiy: '0%',
            width: '20px',
            backgroundColor: 'var(--app-background-color)',
            color: 'var(--app-background-color)',
          }}
        ></div>
        {item.title}
        <div
          onClick={() => handleThemeClick()}
          onMouseEnter={() => handleThemeEnter()}
          onMouseLeave={() => handleThemeLeave()}
        >
          {isAppBGDark ? (
            <FiMoon
              style={{ fill: 'rgb(175, 136, 226)' }}
              id='dark-theme-icon'
            />
          ) : (
            <FiSun style={{ fill: 'orange' }} id='light-theme-icon' />
          )}
        </div>
      </h1>
      {!showSavedMessage ? null : (
        <p className='text-center text-success italic'>Saved!</p>
      )}
      <div
        className='my-custom-scroll'
        id='top'
        style={{ flex: '1', overflowY: 'auto' }}
      >
        <div className='d-flex-column justify-content-start'>
          <div
            className={`text-center mb-2 image-background-${
              isAppBGDark ? 'dark' : 'light'
            }`}
          >
            <Image
              src={`https://drive.google.com/uc?export=view&id=${item.content}`}
              alt={`${item.title}.jpg`}
              style={{ maxWidth: '75vw', maxHeight: '25vh', borderRadius: '6px' }}
            />
          </div>
          <p className='my-page-font-color'>
            <span className='my-nav-lighter-font'>Description:</span>{' '}
            {item.description}
          </p>
          <form>
            <div className='form-group'>
              <p className='mb-1 my-nav-lighter-font'>Clue Note:</p>
              <div className='input-group'>
                <textarea
                  id='myItemNote'
                  name='myItemNote'
                  placeholder='Enter a Note for this clue...'
                  className='form-textarea my-custom-scroll-skinny'
                  value={myItemNote}
                  onClick={() => exitFullScreen()}
                  onChange={e => {
                    setMyItemNote(e.target.value);
                    adjustTextAreaRows();
                  }}
                />
                <button
                  onClick={() => {
                    requestFullScreen();
                    handleClueNoteSubmission(myItemNote);
                  }}
                  disabled={
                    myItemNote.length === 0 || noteUpdateChecker === myItemNote
                  }
                  className='refresh-button'
                  style={{
                    width: '38px',
                  }}
                >
                  <FiSave />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div id='bottom' className='d-flex-column mb-0 pt-3'>
        <div>
          <p className='my-page-font-color text-center mb-2 fw-bold italic'>
            Lookup ID#: {item.lookupCode}
          </p>
        </div>
        <div className='d-flex justify-content-center'>
          <Link style={{marginRight: '2px'}} to={'/my-clues'}>
            <button className='btn btn-secondary' style={{ width: '25vw', maxWidth: '120px' }}>
              <FiArrowLeft style={{margin: '-4px'}} size={28}/>
            </button>
          </Link>
          <Link
            className='text-center'
            to={'/journal-live/2'}
            style={{ margin: '0px 2px' }}
          >
            <button
              className='btn btn-success text-white'
               style={{ width: '25vw', maxWidth: '120px' }}
            >
              <VscBook style={{margin: '-4px'}} size={28} />
            </button>
          </Link>
          <Link style={{marginLeft: '2px'}} to={`/story-item/share/${item.lookupCode}`}>
            <button className='btn btn-primary' style={{ width: '25vw', maxWidth: '120px' }}>
              <MdOutlineQrCode2 id='share-icon' style={{margin: '-4px'}} size={28}/>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StoryItemView;
