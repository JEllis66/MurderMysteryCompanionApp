import React, { useState, useEffect } from 'react';
import Image from 'react-bootstrap/Image';
import { Link, useNavigate } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';
import { useUser } from '../UserContext.js';
import logoLocal from '../img/logo.jpg';
import '../CSS/Login.css';
import '../CSS/style.css';

const Home = props => {
  const navigate = useNavigate();
  const [passkey, setPasskey] = useState('');
  const [isValidToLogin, setIsValidToLogin] = useState(false);
  const [realNameInput, setRealNameInput] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [logo, setLogo] = useState(null);
  const { setRealName, setUser } = useUser();

  const handleLogin = e => {
    e.preventDefault();
    realNameInput.length > 24 || realNameInput === ''
      ? setRealName(realNameInput.substring(0, 24) + '...')
      : setRealName(realNameInput);
    if (isValidToLogin) {
      // Replace this with your login logic
      if (passkey === 'TEST') {
        navigate('/login/002');
      } else {
        navigate('/login/001');
      }
    } else {
      console.log('Login error');
    }
  };

  const checkValidation = () => {
    realNameInput.length < 64 &&
    (passkey === '' || passkey === 'TEST' || passkey.length === 9)
      ? setIsValidToLogin(true)
      : setIsValidToLogin(false);
  };

  const fetchLogo = () => {
    setLogo('1-vVCMtE9blKavFQRGDre_hIPSZKrHEJM');
  };

  useEffect(() => {
    setRealName(realNameInput);
    checkValidation();
  }, [realNameInput, passkey]);

  const fetchColorSettingsFromDatabase = () => {
    return new Promise(resolve => {
      result = {
        theme_nav_color: `rgb(107, 0, 30)`,
        theme_nav_lighter: 'rgb(200, 24, 74)',
        theme_nav_darker: 'rgb(63, 5, 21)',
        theme_nav_font_color: 'white',
        app_background_color: `#303030`,
        page_font_color: `white`,
        button_font_color: 'white',
        primary_button_color: `#DC3546`,
      };
      resolve(result);
    });
  };

  useEffect(() => {
    fetchColorSettingsFromDatabase().then(result => {
      document.documentElement.style.setProperty(
        '--theme-nav-color',
        result.theme_nav_color
      );
      document.documentElement.style.setProperty(
        '--theme-nav-lighter',
        result.theme_nav_lighter
      );
      document.documentElement.style.setProperty(
        '--theme-nav-darker',
        result.theme_nav_darker
      );
      document.documentElement.style.setProperty(
        '--theme-nav-font-color',
        result.theme_nav_font_color
      );
      document.documentElement.style.setProperty(
        '--app-background-color',
        result.app_background_color
      );
      document.documentElement.style.setProperty(
        '--page-font-color',
        result.page_font_color
      );
      document.documentElement.style.setProperty(
        '--button-font-color',
        result.button_font_color
      );
      document.documentElement.style.setProperty(
        '--primary-button-color',
        result.primary_button_color
      );
      const appDiv = document.getElementById('appDiv');
      if (appDiv) {
        appDiv.style.backgroundColor = result.app_background_color;
      }
      fetchLogo();
    });

    setUser({ app_title: 'App Title' });
  }, []);

  return (
    <div className='container text-center'>
      <div>
        <Image
          src={logoLocal}
          id='home-logo'
          className='homeLogo my-0'
          style={{ maxWidth: '100vw', maxHeight: '60vh' }}
          alt='Logo.png'
        />
        <div className='d-flex-column justify-content-center'>
          <form
            onSubmit={handleLogin}
            className='px-1 home-login-form'
            style={{ maxWidth: '90vw', width: '80vw', marginTop: '-10vh' }}
          >
            <div className='form-group-container'>
              <div className='form-group home-inputs text-primary mb-2'>
                <label htmlFor='realNameInput' className='text-danger'>
                  Player's Real Name
                </label>
                <input
                  type='realNameInput'
                  id='realNameInput'
                  name='realNameInput'
                  placeholder='Enter your real name...'
                  className='login-form-input'
                  value={realNameInput}
                  onChange={e => setRealNameInput(e.target.value)}
                  style={
                    realNameInput.length > 64
                      ? { backgroundColor: '#ffc3c9' }
                      : {}
                  }
                />
              </div>
              <div className='form-group home-inputs text-primary mb-3'>
                <label htmlFor='passkey' className='text-danger'>
                  App Keycode
                </label>
                <input
                  type='passkey'
                  id='passkey'
                  name='passkey'
                  placeholder='Enter App Keycode...'
                  className='login-form-input'
                  value={passkey}
                  onChange={e => setPasskey(e.target.value.toUpperCase())}
                  style={
                    passkey !== '' &&
                    passkey !== 'TEST' &&
                    passkey.length >= 1 &&
                    passkey.length !== 9
                      ? { backgroundColor: '#ffc3c9' }
                      : {}
                  }
                />
              </div>
            </div>
            <div
              className='d-flex form-group-home home-inputs text-center mb-2'
              id='homeLogin'
            >
              <button
                disabled={!isValidToLogin}
                type='submit'
                id='client-login-submit'
                style={{ backgroundColor: `#DC3546` }}
              >
                <span style={{ marginRight: '5px', padding: '0px' }}>
                  Login
                </span>{' '}
                <FiLogIn size={20} style={{ paddingBottom: '3px' }} />
              </button>
              <div id='create-app-button'>
                <Link id='create-app-link' to={'/create-app'}>
                  Create App
                </Link>
              </div>
            </div>
          </form>
          <div>
            <Link to={'/forgot/forgot-appkey'} id='forgot-app-key'>
              Forgot App Key?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
