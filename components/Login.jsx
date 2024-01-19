import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FiLogIn, FiArrowLeft } from 'react-icons/fi';
import { useUser } from '../UserContext.js';
import '../CSS/Login.css';

const Login = () => {
  const { appId } = useParams();
  const { setUser, setAppIdNum } = useUser();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [orientation, setOrientation] = useState('portrait');
  const [logo, setLogo] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);

  const userDatabase = [
    {
      id: '001',
      username: 'JEllis',
      password: 'abcabcabc',
      priv_level: 'Admin',
      app_title: "Lancastro's",
    },
    {
      id: '002',
      username: 'JTEllis',
      password: '123',
      priv_level: 'Standard',
      app_title: "Jerry's",
    },
    {
      id: '003',
      username: 'Dan',
      password: 'admin',
      priv_level: 'Admin',
      app_title: "Jerry's",
    },
    {
      id: '004',
      username: 'Dan',
      password: 'admin',
      priv_level: 'Standard',
      app_title: "Jerry L's",
    },
    {
      id: '005',
      username: '',
      password: 'admin',
      priv_level: 'Admin',
      app_title: "Jerry's",
    },
    {
      id: '006',
      username: '',
      password: '',
      priv_level: 'Standard',
      app_title: "Lancastro's",
    },
    {
      id: '007',
      username: '',
      password: 'auth',
      priv_level: 'Authorized',
      app_title: "Lancastro's",
    },
  ];

  const fetchUserCredentialsFromDatabase = (username, password) => {
    return new Promise((resolve, reject) => {
      // Simulate a delay to mimic the time it takes to fetch data from a real database
      setTimeout(() => {
        const user = userDatabase.find(
          user => user.username === username && user.password === password
        );
        if (user) {
          if (user.username === '') {
            user.username = 'Tester';
          }
          const { id, username, priv_level, app_title } = user;
          resolve({ id, username, priv_level, app_title });
        } else {
          alert('Incorrect Login Credentials');
          reject(new Error('Invalid username or password'));
        }
      }, 100); // Simulate a 1-second delay
    });
  };

  // Simulated function to fetch color settings from the database
  const fetchColorSettingsFromDatabase = () => {
    return new Promise(resolve => {
      // Simulate a delay to mimic the time it takes to fetch data from a real database
      setTimeout(() => {
        const result =
          appId === '002'
            ? {
                theme_nav_color: `#24349C`,
                theme_nav_lighter: 'rgb(59, 141, 222)',
                theme_nav_darker: 'rgb(16, 69, 121)',
                theme_nav_font_color: '#C0B864',
                app_background_color: `#bdd6d3`,
                page_font_color: `#520e6a`,
                button_font_color: '#000',
                primary_button_color: ` #0f7e2d`,
              }
            : {
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
      }, 150);
    });
  };

  const fetchLogoData = () => {
    // include useParams appID for actual axios GET
    return new Promise(resolve => {
      const result = [
        {
          id: '001',
          content: '1CwtQgwj-bZGnm0BZdczD2tXhXeeNX5nP',
        },
        {
          id: '002',
          content: '1-cYJXagNhzPVLWmXsolZxshSfuyKt4Q8',
        },
      ];
      const logoById = result.find(item => item.id === appId);
      setLogo(logoById);
      resolve(result);
    });
  };

  useEffect(() => {
    checkOrientation();
    fetchLogoData().then(result => {
      setAppIdNum(appId);
      // Simulate an async database query
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
        setIsLoaded(true);
      });
    });
  }, []);

  const handleLogin = e => {
    e.preventDefault();
    fetchUserCredentialsFromDatabase(username, password)
      .then(credentials => {
        // Successful login, set the user information in the context
        setUser(credentials);
        if (credentials.priv_level === 'Admin') {
          navigate('/admin-dashboard');
        } else {
          navigate('/dashboard');
        }
      })
      .catch(error => {
        console.error('Login error:', error.message);
      });

    //   try {
    //   // Make a POST request to your Flask server
    //   const response = await axios.post('http://your-flask-server-url/login', {
    //     username,
    //     password,
    //   });

    //   // Assuming your Flask server responds with user data on successful login
    //   const userData = response.data;

    //   // Set the user information in the context
    //   setUser(userData);

    //   // Redirect based on user privilege level
    //   if (userData.priv_level === 'Admin') {
    //     navigate('/admin-dashboard');
    //   } else {
    //     // Assuming 'Standard' or 'Authorized' will be treated the same
    //     navigate('/dashboard');
    //   }
    // } catch (error) {
    //   console.error('Login error:', error.message);
    //   // Handle login error here (e.g., display an error message)
    // }
  };

  // Function to check and update orientation based on viewport width and height
  const checkOrientation = () => {
    if (window.innerWidth > window.innerHeight) {
      setOrientation('-landscape');
    } else {
      setOrientation('');
    }
  };

  if (!isLoaded) {
    return (
      <div className='loading-container'>
        <div className='loading-circle'></div>
        <div className='loading-circle'></div>
        <div className='loading-circle'></div>
      </div>
    );
  }

  return (
    <div className='container text-center' id='loginDiv'>
      <img
        src={`https://drive.google.com/uc?export=view&id=${logo.content}`}
        className={`logo${orientation}`}
        alt='Logo.png'
      />
      <div className='loginBox'>
        <form
          onSubmit={handleLogin}
          className='px-1 pb-2'
          style={{ marginTop: '-10vh' }}
        >
          <div className='form-group mb-2'>
            <label
              htmlFor='username'
              className='d-flex justify-content-between app-login'
            >
              <span>Username</span>
              <span>
                <Link
                  className='italic'
                  to={`/forgot/${appId}`}
                  id='forgot-username'
                >
                  Forgot?
                </Link>
              </span>
            </label>
            <input
              type='text'
              id='username'
              name='username'
              placeholder='Enter your username'
              className='login-form-input'
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          </div>
          <div className='form-group'>
            <label
              htmlFor='password'
              className='d-flex justify-content-between app-login'
            >
              <span>Password</span>
              <span>
                <Link
                  className='italic'
                  to={`/forgot/forgot-pass${appId}`}
                  id='forgot-password'
                >
                  Forgot?
                </Link>
              </span>
            </label>
            <input
              type='password'
              id='password'
              name='password'
              placeholder='Enter your password'
              className='login-form-input'
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <div className='mt-3 d-flex justify-content-between'>
            <div style={{ width: '62%' }}>
              <button
                type='submit'
                // onClick={requestFullScreen}
                className='btn my-nav-lighter'
                id='loginLogin'
                style={{ width: '100%' }}
              >
                <span
                  className='my-app-button-font'
                  style={{ marginRight: '5px' }}
                >
                  Login
                </span>
                <FiLogIn
                  className='my-app-button-font'
                  size={20}
                  style={{ paddingBottom: '3px' }}
                />
              </button>
            </div>
            <div style={{ width: '35%' }}>
              <button
                onClick={() => navigate('/')}
                className='btn btn-secondary'
                style={{ opacity: '80%', width: '100%' }}
              >
                <FiArrowLeft size={20} style={{ paddingBottom: '3px' }} />
                Exit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
