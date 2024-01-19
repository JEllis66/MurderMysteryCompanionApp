import React, { useEffect, useState } from 'react';
import Image from 'react-bootstrap/Image';
import { FiArrowLeft, FiStar, FiMoon, FiSun } from 'react-icons/fi';
import { Link, useParams } from 'react-router-dom';
import '../CSS/style.css';

const TopSecretView = () => {

  const { id } = useParams();
  const [mySecret, setMySecret] = useState({});
  const [isAppBGDark, setIsAppBGDark] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isReset, setIsReset] = useState(true);
  const [isClicked, setIsClicked] = useState(false);

  const requestFullScreen = () => {
  	const checkIfMobile = () => {
      const userAgent = navigator.userAgent;
      setIsMobile(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent))
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
    requestFullScreen();
    const fetchData = () => {
      return [
        {
          id: '032',
          isFavorite: false,
          title: 'Bad Boi',
          content: '1mK_YCf_A01PEEuWfPU6kMOQp0X0SUr9R',
          description:
            'This boi is ungood; perhaps the worst trade deal in the history of trade deals ',
        },
        {
          id: '034',
          isFavorite: false,
          title: 'Bad Boi - again',
          content: '1mK_YCf_A01PEEuWfPU6kMOQp0X0SUr9R',
          description:
            'This boi is still ungood; very likely the worst trade deal in the history of trade deals ',
        },
        {
          id: '036',
          isFavorite: false,
          title: 'Bad Boi - again again',
          content: '1mK_YCf_A01PEEuWfPU6kMOQp0X0SUr9R',
          description:
            'This boi is a full-on baddy; certainly the worst trade deal in the history of trade deals, ever',
        },
      ];
    };
    const data = fetchData()
    const matchingSecretToId = data.find(ind => ind.id === id);
    setMySecret(matchingSecretToId);
    const savedContent = localStorage.getItem('themeColor');
    if (savedContent) {
      savedContent === 'light' ? setIsAppBGDark(false) : setIsAppBGDark(true);
    } else {
      fetchAppBGColor();
    }
    // const fetchData = async () => {
    //   try {
    //     // Simulate fetching data from the server
    //     const response = await axios.get('/api/getVisibleSecrets');
    //     setVisibleSecrets(response.data);
    //   } catch (error) {
    //     console.error('Error fetching data:', error);
    //   }
    // };
  }, []);

  useEffect(() => {
    console.log("mySecret component change")
    // This useEffect will be triggered whenever visibleSecrets changes
    updateDatabase(mySecret);
  }, [mySecret]);

  const updateDatabase = updatedMySecret => {
    console.log("update")
    console.log('Updating database:', updatedMySecret);
    // Simulate updating the database using Axios
    // You would replace the following line with your actual Axios request to update the database
    // axios.put('/api/updateVisibleSecrets', updatedVisibleSecrets);
  };

  const toggleLike = (sec) => {
    const updatedMySecret = { ...sec, isFavorite: !sec.isFavorite };
    setMySecret(updatedMySecret);
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
 
  return (
    <div className='container' style={{ display: 'flex', flexDirection: 'column', height: 'calc(90vh - 75px)' }}>
        <h1 className='d-flex justify-content-between big-header-text text-center mb-3'>
          <div
            style={{
              opactiy: '0%',
              width: '20px',
              backgroundColor: 'var(--app-background-color)',
              color: 'var(--app-background-color)',
            }}
          >
          </div>
          {mySecret.title}
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
      <div id='top' style={{ flex: '1', overflowY: 'auto' }}>
        <p className='my-page-font-color'><span className='my-nav-lighter-font bold text-start'>Description: </span> {mySecret.description}</p>
        <div
          className={`text-center mb-2 image-background-${
            isAppBGDark ? 'dark' : 'light'
          }`}
        >
          <Image
            style={{maxWidth: '90vw', borderRadius: '6px'}}
            src={`https://drive.google.com/uc?export=view&id=${mySecret.content}`}
            alt={`${mySecret.title}.jpg`}
          />
        </div>
      </div>
      <div id='bottom' className='mb-0 pt-3'>
        <div className='d-flex-column justify-content-center'>
          <div className='d-flex justify-content-around pt-3'>
            <div></div>
            <Link to={'/classified-database'}>
              <button className='btn btn-secondary' style={{ width: '35vw', maxWidth: '120px' }}>
                <FiArrowLeft size={22}/>
              </button>
            </Link>
            <button 
              className='btn btn-secondary'
              style={{width: '35vw', maxWidth: '120px'}}
              onClick={() => toggleLike(mySecret)}
            >
              <FiStar
                className={`star-fav text-${
                  mySecret.isFavorite ? 'warning' : 'white'
                }`}
                style={{
                  fill: `${
                    mySecret.isFavorite ? '#ffc107' : 'white'
                  }`,
                }}
              />
            </button>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopSecretView;