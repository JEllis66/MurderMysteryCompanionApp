import React, { useState, useEffect } from 'react';
import Image from 'react-bootstrap/Image';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useConfirmation } from '../ConfirmationContext.js';
import logoLocal from '../img/logo.jpg';
import '../CSS/Login.css';
import '../CSS/style.css';

const Forgot = props => {
  const { showConfirmation } = useConfirmation();
  const navigate = useNavigate();
  const { code } = useParams();
  const [title, setTitle] = useState('');
  const [email, setEmail] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [username, setUsername] = useState('');
  const [appKey, setAppKey] = useState('');
  const [logo, setLogo] = useState('');

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleLogin = e => {
    e.preventDefault();
    if (code === 'forgot-appkey') {
      //forgot appKey logic
      //check Database for email ==> then send email a message containing a list of all App Titles and their AppKeys' associated with this email address
      console.log(
        'If the entered Email Address is associated with any Apps, you will be emailed a List of your App Keys.'
      );
    } else if (code.substring(0, 11) === 'forgot-pass') {
      //forgot password logic
      //check Database for email/username combination and the appKey of app, then send msg of all users assosciated with their email address
      console.log(
        'If Email/Username credentials match, you will be emailed a reset Password link.'
      );
    } else {
      //forgot username logic
      //check Database for email with appKey of app they accessed to reach login, then send msg of all users assosciated with their email address
      console.log(
        'If Email is associated with this App Key, you will be emailed your username information.'
      );
    }
  };

  const checkPath = () => {
    if (code === 'forgot-appkey') {
      return '/';
    } else if (code.substring(0, 11) === 'forgot-pass') {
      return `/login/${code.substring(11, code.length)}`;
    } else {
      return `/login/${code}`;
    }
  };

  const checkTitle = () => {
    if (code === 'forgot-appkey') {
      setTitle('App Keycode');
    } else if (code.substring(0, 11) === 'forgot-pass') {
      setTitle('Password');
    } else {
      setTitle('Login Username');
    }
    
  };

  const returnPage = () => {
    navigate(checkPath());
  };

  const fetchDefaultColorSettingsFromDatabase = () => {
    return new Promise(resolve => {
      // Simulate a delay to mimic the time it takes to fetch data from a real database
      setTimeout(() => {
        const result = {
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
      }, 0);
    });
  };

  const fetchLogoData = () => {
    // include useParams appID for actual axios GET
    return new Promise(resolve => {
      const result = [
        {
          content: '1-vVCMtE9blKavFQRGDre_hIPSZKrHEJM',
        }
      ];
      const logoById = result.content;
      setLogo(logoById);
      resolve(result);
    });
  };


  useEffect(() => {
    setIsValidEmail(emailRegex.test(email));
  }, [email]);

  useEffect(() => {
    fetchDefaultColorSettingsFromDatabase().then(result => {
      document.documentElement.style.setProperty(
        '--app-background-color',
        result.app_background_color
      );
      const appDiv = document.getElementById('appDiv');
      if (appDiv) {
        appDiv.style.backgroundColor = result.app_background_color;
      }
      fetchLogoData().then(result => {
        checkTitle();
      });
    });
  },[]);

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
              <div className='text-white text-uppercase fw-bold mb-3'>
                Forgot: {title}
              </div>
              <div className='form-group home-inputs text-primary mb-2'>
                <label htmlFor='email' className='text-danger'>
                  Your Email Address:
                </label>
                <input
                  type='email'
                  id='email'
                  name='email'
                  placeholder='Enter your email address...'
                  className='login-form-input'
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>

              {code.substring(0, 11) === 'forgot-pass' ? (
                <div className='form-group home-inputs text-primary mb-2'>
                  <label
                    htmlFor='username'
                    className='d-flex justify-content-between text-danger'
                  >
                    <span>Username:</span>
                    <span>
                      <Link onClick={()=>setTitle('Login Username')} className='italic' to={`/forgot/${code.substring(11, code.length)}`} id='forgot-username'>
                        Forgot?
                      </Link>
                    </span>
                  </label>
                  <input
                    type='username'
                    id='username'
                    name='username'
                    placeholder='Enter username...'
                    className='login-form-input'
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                  />
                </div>
              ) : null}
            </div>
            <div
              className='d-flex form-group-home home-inputs text-center mt-3'
              id='homeLogin'
            >
              <button
                type='submit'
                id='client-login-submit'
                style={{ backgroundColor: `#DC3546` }}
              >
                Submit
              </button>
              <div onClick={returnPage} id='forgot-app-button'>
                Back
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Forgot;
