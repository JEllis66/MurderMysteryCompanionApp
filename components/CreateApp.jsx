import React, { useState, useEffect } from 'react';
import { FiUpload, FiEye, FiEyeOff, FiRefreshCw, FiX } from 'react-icons/fi';
import { useUser } from '../UserContext.js';
import { Link } from 'react-router-dom';
import '../CSS/Create.css';

const CreateApp = () => {
  const { user, setUser } = useUser();
  const [newAppTitle, setNewAppTitle] = useState(`App Title`);
  const [appKey, setAppKey] = useState(``);
  const [appAdminID, setAppAdminID] = useState(['']);
  const [appAdminEmail, setAppAdminEmail] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [appAdminPassword, setAppAdminPassword] = useState(['']);
  const [passOneVisible, setPassOneVisible] = useState(false);
  const [passTwoVisible, setPassTwoVisible] = useState(false);
  const [appAdminConfirmPassword, setAppAdminConfirmPassword] = useState(['']);
  const [defaultAppColor, setDefaultAppColor] = useState('#6b001e');
  const [appBackgroundColor, setAppBackgroundColor] = useState('#303030');
  const [themeColorLighter, setThemeColorLighter] = useState('#c8184a');
  const [themeColorDarker, setThemeColorDarker] = useState('#3f0515');
  const [navThemeFontColor, setNavThemeFontColor] = useState('#FFFFFF');
  const [primaryFontColor, setPrimaryFontColor] = useState('#FFFFFF');
  const [primaryButtonColor, setPrimaryButtonColor] = useState('#DC4C64');
  const [primaryButtonFontColor, setPrimaryButtonFontColor] =
    useState('#FFFFFF');
  const [newspaperTitle, setNewspaperTitle] = useState('');
  const [allowUserUserMessaging, setAllowUserUserMessaging] = useState(false);
  const [appLogo, setAppLogo] = useState(null);
  const [imageObject, setImageObject] = useState(null);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [isValidToSubmit, setIsValidToSubmit] = useState(false);
  const [touchedFields, setTouchedFields] = useState({
    newAppTitle: false,
    appKey: false,
    appAdminID: false,
    appAdminEmail: false,
    appAdminPassword: false,
    appAdminConfirmPassword: false,
    newspaperTitle: false,
  });

  const requestFullScreen = () => {
    const checkIfMobile = () => {
      const userAgent = navigator.userAgent;
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        userAgent
      );
    };
    if (checkIfMobile) {
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
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        userAgent
      );
    };
    if (checkIfMobile) {
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

  const getRandomCode = () => {
    const validChars = 'ABCDEFGHJKLMNPRTUVWXY23456789';
    let codeRes = '';
    while (codeRes.length < 9) {
      let randomIndex = Math.floor(Math.random() * validChars.length);
      let newChar = validChars[randomIndex];
      codeRes += newChar;
    }
    setAppKey(codeRes);
  };

  const markFieldAsTouched = fieldName => {
    setTouchedFields(prevTouchedFields => ({
      ...prevTouchedFields,
      [fieldName]: true,
    }));
  };

  const checkValidation = () => {
    if (
      !isValidEmail ||
      newAppTitle.length < 4 ||
      newAppTitle.length > 32 ||
      appAdminID.length < 4 ||
      appAdminID.length > 32 ||
      appKey.length !== 9 ||
      appAdminPassword.length < 8 ||
      appAdminPassword.length > 64 ||
      appAdminConfirmPassword !== appAdminPassword ||
      newspaperTitle.length < 8 ||
      newspaperTitle.length > 64 ||
      appLogo === null ||
      appLogo === undefined ||
      !isValidHex(defaultAppColor) ||
      !isValidHex(appBackgroundColor) ||
      !isValidHex(themeColorDarker) ||
      !isValidHex(themeColorLighter) ||
      !isValidHex(navThemeFontColor) ||
      !isValidHex(primaryFontColor) ||
      !isValidHex(primaryButtonColor) ||
      !isValidHex(primaryButtonFontColor)
    ) {
      setIsValidToSubmit(false);
    } else {
      setIsValidToSubmit(true);
    }
  };

  useEffect(() => {
    checkValidation();
  }, [
    newAppTitle,
    appKey,
    appAdminID,
    appAdminPassword,
    appAdminConfirmPassword,
    newspaperTitle,
    appLogo,
    defaultAppColor,
    appBackgroundColor,
    themeColorDarker,
    themeColorLighter,
    navThemeFontColor,
    primaryFontColor,
    primaryButtonColor,
    primaryButtonFontColor,
    appAdminEmail,
    allowUserUserMessaging,
  ]);

  const handleImageUpload = e => {
    const file = e.target.files[0];
    const fileName = e.target.files[0].name;
    setImageObject(file);
    setAppLogo({ name: fileName });
  };

  const handleFormSubmit = async e => {
    e.preventDefault();
    // Add form submission logic here
    //dont forget email
    if (!isValidToSubmit) {
      return alert('Please review form fields and re-submit.');
    }

    const appData = {
      appTitle: newAppTitle,
      appKey: appKey,
      //etc.
    };

    try {
      // Make a POST request to your API endpoint
      const response = await axios.post(
        'http://my-api-url/api/app-create',
        appData
      );

      // Handle the response, you can redirect to another page or show a success message
      console.log(response.data); // Log the response for now
    } catch (error) {
      // Handle errors, you can show an error message
      console.error('Error creating app:', error);
    }
  };

  const toggleVisiblePass = num => {
    num === 1
      ? setPassOneVisible(!passOneVisible)
      : setPassTwoVisible(!passTwoVisible);
  };

  const imgCheck = input => {
    if (input === 1) {
      let idVal;
      if (appLogo) {
        idVal = 'fileInputPopulated';
      } else {
        idVal = 'fileInput';
      }
      return idVal;
    }
  };

  const isValidHex = inputHexString => {
    const test = inputHexString.toUpperCase();
    const testHexChar = char => /^[0-9A-F]$/.test(char);

    return (
      test.length === 7 &&
      test[0] === '#' &&
      Array.from(test.slice(1)).every(testHexChar)
    );
  };

  useEffect(() => {
    setIsValidEmail(emailRegex.test(appAdminEmail));
  }, [appAdminEmail]);

  useEffect(() => {
    const appDiv = document.getElementById('appDiv');
    if (appDiv) {
      appDiv.style.backgroundColor = appBackgroundColor;
    }
  }, [appBackgroundColor]);

  useEffect(() => {
    requestFullScreen();
    setNewAppTitle(user.app_title);
  }, []);

  return (
    <div
      className='create-character-container mx-auto my-custom-scroll-skinny'
      style={{ backgroundColor: 'var(--app-background-color)' }}
    >
      <h1
        className='my-page-font-color text-uppercase mb-0'
        style={{ fontSize: '18pt' }}
      >
        Create Your App:
      </h1>
      <div className='create-character-form text-start'>
        <form onClick={() => exitFullScreen()} onSubmit={handleFormSubmit}>
          <div className='mb-2 pt-0'>
            <label htmlFor='newAppTitle' className='create-edit-label'>
              App Title:
            </label>
            <input
              type='text'
              className='form-control custInput'
              id='newAppTitle'
              placeholder={`Murder Mystery's Title...`}
              value={newAppTitle}
              onChange={e => {
                setNewAppTitle(e.target.value);
                setUser({ app_title: e.target.value });
                markFieldAsTouched('newAppTitle');
              }}
              style={
                touchedFields.newAppTitle &&
                (newAppTitle.length < 4 || newAppTitle.length > 32)
                  ? {
                      backgroundColor: 'rgb(253, 193, 193)',
                      borderRadius: '5px',
                      padding: '10px',
                    }
                  : { borderRadius: '5px', padding: '10px' }
              }
            />
            {touchedFields.newAppTitle &&
            (newAppTitle.length < 4 || newAppTitle.length > 32) ? (
              <div>
                <p className='form-error-message'>
                  {' '}
                  *App Title must be 4-32 characters in length!
                </p>
              </div>
            ) : null}
          </div>
          <div className='mb-2 pt-2'>
            <label htmlFor='appKey' className='create-edit-label'>
              App Keycode:
            </label>
            <input
              type='text'
              className='form-input'
              id='appKey'
              placeholder={`Enter App's Keycode...`}
              value={appKey}
              onChange={e => {
                setAppKey(e.target.value.toUpperCase());
                markFieldAsTouched('appKey');
              }}
              style={
                touchedFields.appKey && appKey.length !== 9
                  ? {
                      backgroundColor: 'rgb(253, 193, 193)',
                      borderRadius: '5px 0px 0px 5px',
                      padding: '10px',
                    }
                  : { borderRadius: '5px 0px 0px 5px', padding: '10px' }
              }
            />
            <button
              type='button'
              className='refresh-button'
              style={{
                width: '38px',
                height: '46px',
                borderRadius: '0px 5px 5px 0px',
                border: '1px solid #ccc',
                borderLeft: 'none',
              }}
              onClick={getRandomCode}
            >
              <FiRefreshCw />
            </button>
            {touchedFields.appKey && appKey.length !== 9 ? (
              <div>
                <p className='form-error-message'>
                  {' '}
                  *App Key must be 9 characters in length!
                </p>
              </div>
            ) : null}
          </div>

          <div className='mb-2 pt-2'>
            <label htmlFor='appAdminID' className='create-edit-label'>
              App Admin Name:
            </label>
            <input
              type='text'
              className='form-control custInput'
              id='appAdminID'
              placeholder={`Admin username...`}
              value={appAdminID}
              onChange={e => {
                setAppAdminID(e.target.value);
                markFieldAsTouched('appAdminID');
              }}
              style={
                touchedFields.appAdminID &&
                (appAdminID.length < 4 || appAdminID.length > 32)
                  ? {
                      backgroundColor: 'rgb(253, 193, 193)',
                      borderRadius: '5px',
                      padding: '10px',
                    }
                  : { borderRadius: '5px', padding: '10px' }
              }
            />
            {touchedFields.appAdminID &&
            (appAdminID.length < 4 || appAdminID.length > 32) ? (
              <div>
                <p className='form-error-message'>
                  {' '}
                  *Admin ID must be 4-32 characters in length!
                </p>
              </div>
            ) : null}
          </div>

          <div className='mb-2 pt-2'>
            <label htmlFor='appAdminEmail' className='create-edit-label'>
              App Admin Email:
            </label>
            <input
              type='text'
              className={`form-control custInput ${
                !isValidEmail && 'invalid-input'
              }`}
              id='appAdminEmail'
              placeholder={`Admin email...`}
              value={appAdminEmail}
              onChange={e => {
                setAppAdminEmail(e.target.value);
                markFieldAsTouched('appAdminEmail');
              }}
              style={
                touchedFields.appAdminEmail && !isValidEmail
                  ? {
                      backgroundColor: 'rgb(253, 193, 193)',
                      borderRadius: '5px',
                      padding: '10px',
                    }
                  : { borderRadius: '5px', padding: '10px' }
              }
            />
            {!isValidEmail && touchedFields.appAdminEmail && (
              <div>
                <p className='form-error-message'>*Invalid email format</p>
              </div>
            )}
          </div>

          <div className='mb-2 pt-2'>
            <label htmlFor='appAdminPassword' className='create-edit-label'>
              Admin Password:
            </label>
            <input
              type={passOneVisible ? 'text' : 'password'}
              className='form-input'
              id='appAdminPassword'
              placeholder={`Admin Password...`}
              value={appAdminPassword}
              onChange={e => {
                setAppAdminPassword(e.target.value);
                markFieldAsTouched('appAdminPassword');
              }}
              style={
                touchedFields.appAdminPassword &&
                (appAdminPassword.length < 8 || appAdminPassword.length > 64)
                  ? {
                      backgroundColor: 'rgb(253, 193, 193)',
                      borderRadius: '5px 0px 0px 5px',
                      borderRight: 'none',
                      padding: '10px',
                    }
                  : {
                      borderRadius: '5px 0px 0px 5px',
                      borderRight: 'none',
                      padding: '10px',
                    }
              }
            />
            <button
              type='button'
              className='refresh-button'
              style={{
                width: '38px',
                height: '45px',
                borderRadius: '0px 5px 5px 0px',
              }}
              onClick={e => toggleVisiblePass(1)}
            >
              {passOneVisible ? <FiEyeOff size={18} /> : <FiEye size={18} />}
            </button>
            {touchedFields.appAdminPassword &&
            (appAdminPassword.length < 8 || appAdminPassword.length > 64) ? (
              <div>
                <p className='form-error-message'>
                  {' '}
                  *Password must be 8-64 characters in length!
                </p>
              </div>
            ) : null}
          </div>
          <div className='mb-2 pt-2'>
            <label
              htmlFor='appAdminConfirmPassword'
              className='create-edit-label'
            >
              Confirm Password:
            </label>
            <input
              type={passTwoVisible ? 'text' : 'password'}
              className='form-input'
              id='appAdminConfirmPassword'
              placeholder={`Confirm Password...`}
              value={appAdminConfirmPassword}
              onChange={e => {
                setAppAdminConfirmPassword(e.target.value);
                markFieldAsTouched('appAdminConfirmPassword');
              }}
              style={
                touchedFields.appAdminConfirmPassword &&
                appAdminConfirmPassword !== appAdminPassword
                  ? {
                      backgroundColor: 'rgb(253, 193, 193)',
                      borderRadius: '5px 0px 0px 5px',
                      borderRight: 'none',
                      padding: '10px',
                    }
                  : {
                      borderRadius: '5px 0px 0px 5px',
                      borderRight: 'none',
                      padding: '10px',
                    }
              }
            />
            <button
              type='button'
              className='refresh-button'
              style={{
                width: '38px',
                height: '45px',
                borderRadius: '0px 5px 5px 0px',
              }}
              onClick={e => toggleVisiblePass(2)}
            >
              {passTwoVisible ? <FiEyeOff size={18} /> : <FiEye size={18} />}
            </button>
            {touchedFields.appAdminConfirmPassword &&
            appAdminConfirmPassword !== appAdminPassword ? (
              <div>
                <p className='form-error-message'>
                  {' '}
                  *Password Confirmation does not match!
                </p>
              </div>
            ) : null}
          </div>

          <div className='row mb-3'>
            <div className='col-md-6'>
              <label htmlFor='defaultAppColor' className='create-edit-label'>
                Theme/Nav Color:
              </label>
              <div className='input-group mb-3'>
                <input
                  type='color'
                  className='form-control custInput'
                  id='defaultAppColor'
                  value={defaultAppColor}
                  onChange={e => {
                    setDefaultAppColor(e.target.value);
                    document.documentElement.style.setProperty(
                      '--theme-nav-color',
                      e.target.value
                    );
                  }}
                  style={{
                    borderRadius: '5px 0 0 5px',
                    padding: '10px',
                    height: '48px',
                    width: '48px',
                  }}
                />
                <input
                  type='text'
                  className='form-control custInput text-uppercase'
                  placeholder='Enter #HEXNUM...'
                  value={defaultAppColor}
                  onChange={e => {
                    setDefaultAppColor(e.target.value);
                    document.documentElement.style.setProperty(
                      '--theme-nav-color',
                      e.target.value
                    );
                  }}
                  style={
                    isValidHex(defaultAppColor)
                      ? {
                          borderRadius: '0 5px 5px 0',
                          padding: '10px',
                          width: 'calc(100% - 48px)',
                          cursor: 'pointer',
                        }
                      : {
                          backgroundColor: 'rgb(253, 193, 193)',
                          borderRadius: '0 5px 5px 0',
                          padding: '10px',
                          width: 'calc(100% - 48px)',
                          cursor: 'pointer',
                        }
                  }
                />
              </div>
              {!isValidHex(defaultAppColor) ? (
                <div style={{ marginTop: '-10px' }}>
                  <p className='form-error-message'>
                    *Invalid HEX code! #0-9A-F
                  </p>
                </div>
              ) : null}
            </div>

            <div className='col-md-6'>
              <label htmlFor='appBackgroundColor' className='create-edit-label'>
                App Background Color:
              </label>
              <div className='input-group'>
                <input
                  type='color'
                  className='form-control custInput'
                  id='appBackgroundColor'
                  value={appBackgroundColor}
                  onChange={e => {
                    setAppBackgroundColor(e.target.value);
                    document.documentElement.style.setProperty(
                      '--app-background-color',
                      e.target.value
                    );
                  }}
                  style={{
                    borderRadius: '5px 0 0 5px',
                    padding: '10px',
                    height: '48px',
                    width: '48px',
                  }}
                />
                <input
                  type='text'
                  className='form-control custInput text-uppercase'
                  placeholder='Enter #HEXNUM...'
                  value={appBackgroundColor}
                  onChange={e => {
                    setAppBackgroundColor(e.target.value);
                    document.documentElement.style.setProperty(
                      '--app-background-color',
                      e.target.value
                    );
                  }}
                  style={
                    isValidHex(appBackgroundColor)
                      ? {
                          borderRadius: '0 5px 5px 0',
                          padding: '10px',
                          width: 'calc(100% - 48px)',
                          cursor: 'pointer',
                        }
                      : {
                          backgroundColor: 'rgb(253, 193, 193)',
                          borderRadius: '0 5px 5px 0',
                          padding: '10px',
                          width: 'calc(100% - 48px)',
                          cursor: 'pointer',
                        }
                  }
                />
              </div>
              {!isValidHex(appBackgroundColor) ? (
                <div>
                  <p className='form-error-message'>
                    *Invalid HEX code! #0-9A-F
                  </p>
                </div>
              ) : null}
            </div>
          </div>

          <div className='row mb-3'>
            <div className='col-md-6'>
              <label htmlFor='themeColorLighter' className='create-edit-label'>
                Theme Lighter Color:
              </label>
              <div className='input-group mb-3'>
                <input
                  type='color'
                  className='form-control custInput'
                  id='themeColorLighter'
                  value={themeColorLighter}
                  onChange={e => {
                    setThemeColorLighter(e.target.value);
                    document.documentElement.style.setProperty(
                      '--theme-nav-lighter',
                      e.target.value
                    );
                  }}
                  style={{
                    borderRadius: '5px 0 0 5px',
                    padding: '10px',
                    height: '48px',
                    width: '48px',
                  }}
                />
                <input
                  type='text'
                  className='form-control custInput text-uppercase'
                  placeholder='Enter #HEXNUM...'
                  value={themeColorLighter}
                  onChange={e => {
                    setThemeColorLighter(e.target.value);
                    document.documentElement.style.setProperty(
                      '--theme-nav-lighter',
                      e.target.value
                    );
                  }}
                  style={
                    isValidHex(themeColorLighter)
                      ? {
                          borderRadius: '0 5px 5px 0',
                          padding: '10px',
                          width: 'calc(100% - 48px)',
                          cursor: 'pointer',
                        }
                      : {
                          backgroundColor: 'rgb(253, 193, 193)',
                          borderRadius: '0 5px 5px 0',
                          padding: '10px',
                          width: 'calc(100% - 48px)',
                          cursor: 'pointer',
                        }
                  }
                />
              </div>
              {!isValidHex(themeColorLighter) ? (
                <div style={{ marginTop: '-10px' }}>
                  <p className='form-error-message'>
                    *Invalid HEX code! #0-9A-F
                  </p>
                </div>
              ) : null}
            </div>

            <div className='col-md-6'>
              <label htmlFor='themeColorDarker' className='create-edit-label'>
                Theme Darker Color:
              </label>
              <div className='input-group'>
                <input
                  type='color'
                  className='form-control custInput'
                  id='themeColorDarker'
                  value={themeColorDarker}
                  onChange={e => {
                    setThemeColorDarker(e.target.value);
                    document.documentElement.style.setProperty(
                      '--theme-nav-darker',
                      e.target.value
                    );
                  }}
                  style={{
                    borderRadius: '5px 0 0 5px',
                    padding: '10px',
                    height: '48px',
                    width: '48px',
                  }}
                />
                <input
                  type='text'
                  className='form-control custInput text-uppercase'
                  placeholder='Enter #HEXNUM...'
                  value={themeColorDarker}
                  onChange={e => {
                    setThemeColorDarker(e.target.value);
                    document.documentElement.style.setProperty(
                      '--theme-nav-darker',
                      e.target.value
                    );
                  }}
                  style={
                    isValidHex(themeColorDarker)
                      ? {
                          borderRadius: '0 5px 5px 0',
                          padding: '10px',
                          width: 'calc(100% - 48px)',
                          cursor: 'pointer',
                        }
                      : {
                          backgroundColor: 'rgb(253, 193, 193)',
                          borderRadius: '0 5px 5px 0',
                          padding: '10px',
                          width: 'calc(100% - 48px)',
                          cursor: 'pointer',
                        }
                  }
                />
              </div>
              {!isValidHex(themeColorDarker) ? (
                <div>
                  <p className='form-error-message'>
                    *Invalid HEX code! #0-9A-F
                  </p>
                </div>
              ) : null}
            </div>
          </div>

          <div className='row mb-3'>
            <div className='col-md-6'>
              <label htmlFor='primaryFontColor' className='create-edit-label'>
                Page Font Color:
              </label>
              <div className='input-group mb-3'>
                <input
                  type='color'
                  className='form-control custInput'
                  id='primaryFontColor'
                  value={primaryFontColor}
                  onChange={e => {
                    setPrimaryFontColor(e.target.value);
                    document.documentElement.style.setProperty(
                      '--page-font-color',
                      e.target.value
                    );
                  }}
                  style={{
                    borderRadius: '5px 0 0 5px',
                    padding: '10px',
                    height: '48px',
                    width: '48px',
                  }}
                />
                <input
                  type='text'
                  className='form-control custInput text-uppercase'
                  placeholder='Enter #HEXNUM...'
                  value={primaryFontColor}
                  onChange={e => {
                    setPrimaryFontColor(e.target.value);
                    document.documentElement.style.setProperty(
                      '--page-font-color',
                      e.target.value
                    );
                  }}
                  style={
                    isValidHex(primaryFontColor)
                      ? {
                          borderRadius: '0 5px 5px 0',
                          padding: '10px',
                          width: 'calc(100% - 48px)',
                          cursor: 'pointer',
                        }
                      : {
                          backgroundColor: 'rgb(253, 193, 193)',
                          borderRadius: '0 5px 5px 0',
                          padding: '10px',
                          width: 'calc(100% - 48px)',
                          cursor: 'pointer',
                        }
                  }
                />
              </div>
              {!isValidHex(primaryFontColor) ? (
                <div style={{ marginTop: '-10px' }}>
                  <p className='form-error-message'>
                    *Invalid HEX code! #0-9A-F
                  </p>
                </div>
              ) : null}
            </div>

            <div className='col-md-6'>
              <label htmlFor='navThemeFontColor' className='create-edit-label'>
                Nav/Theme Font Color:
              </label>
              <div className='input-group'>
                <input
                  type='color'
                  className='form-control custInput'
                  id='navThemeFontColor'
                  value={navThemeFontColor}
                  onChange={e => {
                    setNavThemeFontColor(e.target.value);
                    document.documentElement.style.setProperty(
                      '--theme-nav-font-color',
                      e.target.value
                    );
                  }}
                  style={{
                    borderRadius: '5px 0 0 5px',
                    padding: '10px',
                    height: '48px',
                    width: '48px',
                  }}
                />
                <input
                  type='text'
                  className='form-control custInput text-uppercase'
                  placeholder='Enter #HEXNUM...'
                  value={navThemeFontColor}
                  onChange={e => {
                    setNavThemeFontColor(e.target.value);
                    document.documentElement.style.setProperty(
                      '--theme-nav-font-color',
                      e.target.value
                    );
                  }}
                  style={
                    isValidHex(navThemeFontColor)
                      ? {
                          borderRadius: '0 5px 5px 0',
                          padding: '10px',
                          width: 'calc(100% - 48px)',
                          cursor: 'pointer',
                        }
                      : {
                          backgroundColor: 'rgb(253, 193, 193)',
                          borderRadius: '0 5px 5px 0',
                          padding: '10px',
                          width: 'calc(100% - 48px)',
                          cursor: 'pointer',
                        }
                  }
                />
              </div>
              {!isValidHex(navThemeFontColor) ? (
                <div>
                  <p className='form-error-message'>
                    *Invalid HEX code! #0-9A-F
                  </p>
                </div>
              ) : null}
            </div>
          </div>

          <div className='row mb-3'>
            <div className='col-md-6'>
              <label htmlFor='primaryButtonColor' className='create-edit-label'>
                Primary Button & Label Color:
              </label>
              <div className='input-group mb-3'>
                <input
                  type='color'
                  className='form-control custInput'
                  id='primaryButtonColor'
                  value={primaryButtonColor}
                  onChange={e => {
                    setPrimaryButtonColor(e.target.value);
                    document.documentElement.style.setProperty(
                      '--primary-button-color',
                      e.target.value
                    );
                  }}
                  style={{
                    borderRadius: '5px 0 0 5px',
                    padding: '10px',
                    height: '48px',
                    width: '48px',
                  }}
                />
                <input
                  type='text'
                  className='form-control custInput text-uppercase'
                  placeholder='Enter #HEXNUM...'
                  value={primaryButtonColor}
                  onChange={e => {
                    setPrimaryButtonColor(e.target.value);
                    document.documentElement.style.setProperty(
                      '--primary-button-color',
                      e.target.value
                    );
                  }}
                  style={
                    isValidHex(primaryButtonColor)
                      ? {
                          borderRadius: '0 5px 5px 0',
                          padding: '10px',
                          width: 'calc(100% - 48px)',
                          cursor: 'pointer',
                        }
                      : {
                          backgroundColor: 'rgb(253, 193, 193)',
                          borderRadius: '0 5px 5px 0',
                          padding: '10px',
                          width: 'calc(100% - 48px)',
                          cursor: 'pointer',
                        }
                  }
                />
              </div>
              {!isValidHex(primaryButtonColor) ? (
                <div style={{ marginTop: '-10px' }}>
                  <p className='form-error-message'>
                    *Invalid HEX code! #0-9A-F
                  </p>
                </div>
              ) : null}
            </div>

            <div className='col-md-6'>
              <label
                htmlFor='primaryButtonFontColor'
                className='create-edit-label'
              >
                Button Font Color
              </label>
              <div className='input-group'>
                <input
                  type='color'
                  className='form-control custInput'
                  id='primaryButtonFontColor'
                  value={primaryButtonFontColor}
                  onChange={e => {
                    setPrimaryButtonFontColor(e.target.value);
                    document.documentElement.style.setProperty(
                      '--button-font-color',
                      result.button_font_color
                    );
                  }}
                  style={{
                    borderRadius: '5px 0 0 5px',
                    padding: '10px',
                    height: '48px',
                    width: '48px',
                  }}
                />
                <input
                  type='text'
                  className='form-control custInput text-uppercase'
                  placeholder='Enter #HEXNUM...'
                  value={primaryButtonFontColor}
                  onChange={e => {
                    setPrimaryButtonFontColor(e.target.value);
                    document.documentElement.style.setProperty(
                      '--button-font-color',
                      result.button_font_color
                    );
                  }}
                  style={
                    isValidHex(primaryButtonFontColor)
                      ? {
                          borderRadius: '0 5px 5px 0',
                          padding: '10px',
                          width: 'calc(100% - 48px)',
                          cursor: 'pointer',
                        }
                      : {
                          backgroundColor: 'rgb(253, 193, 193)',
                          borderRadius: '0 5px 5px 0',
                          padding: '10px',
                          width: 'calc(100% - 48px)',
                          cursor: 'pointer',
                        }
                  }
                />
              </div>
              {!isValidHex(primaryButtonFontColor) ? (
                <div>
                  <p className='form-error-message'>
                    *Invalid HEX code! #0-9A-F
                  </p>
                </div>
              ) : null}
            </div>
          </div>

          <div className='mb-3'>
            <label htmlFor='newspaperTitle' className='create-edit-label'>
              Newspaper Title:
            </label>
            <input
              type='text'
              className='form-control custInput'
              id='newspaperTitle'
              placeholder={`Enter App Newspaper Title...`}
              value={newspaperTitle}
              onChange={e => {
                setNewspaperTitle(e.target.value);
                markFieldAsTouched('newspaperTitle');
              }}
              onClick={() => exitFullScreen()}
              style={
                touchedFields.newspaperTitle &&
                (newspaperTitle.length < 8 || newspaperTitle.length > 64)
                  ? {
                      backgroundColor: 'rgb(253, 193, 193)',
                      borderRadius: '5px',
                      padding: '10px',
                    }
                  : { borderRadius: '5px', padding: '10px' }
              }
            />
            {touchedFields.newspaperTitle &&
            (newspaperTitle.length < 8 || newspaperTitle.length > 64) ? (
              <div>
                <p className='form-error-message'>
                  {' '}
                  *Your App's Newspaper Title must be 8-64 characters in length!
                </p>
              </div>
            ) : null}
          </div>

          <div className='form-group mb-2'>
            <label className='create-edit-label' htmlFor='recipient'>
              User-to-User Texting:{' '}
            </label>
            <div className='input-group'>
              <select
                id='allowUserUserMessaging'
                name='allowUserUserMessaging'
                placeholder='Choose Recipient...'
                className={`form-input-password`}
                value={allowUserUserMessaging}
                style={{ backgroundColor: 'white' }}
                onChange={e => setAllowUserUserMessaging(e.target.value)}
              >
                <option value={false}>No</option>
                <option value={true}>Yes</option>
              </select>
            </div>
          </div>

          <div className='mb-3'>
            <label htmlFor='appLogo' className='create-edit-label'>
              App Logo:
            </label>
            <input
              type='file'
              className='form-control-file text-primary custom-file-input'
              id='appLogo'
              accept='image/*'
              style={{ display: 'none' }}
              onChange={e => handleImageUpload(e)}
            />
            <div className='d-flex'>
              <div
                className={`d-flex justify-content-start align-items-center`}
                id={imgCheck(1)}
              >
                <div
                  className='custom-upload-button'
                  onClick={() => document.getElementById('appLogo').click()}
                >
                  File <FiUpload />
                </div>
                <div id='input1-name-text' className='text-primary fs-italic'>
                  {appLogo ? appLogo.name : '*No File...'}
                </div>
              </div>
              {appLogo ? (
                <div
                  className='delete-img-div'
                  style={{
                    width: '15%',
                    display: 'flex',
                    justifyContent: 'end',
                    alignItems: 'center',
                    padding: '0px 5px',
                  }}
                >
                  {' '}
                  <FiX
                    className='delete-image-attachment'
                    onClick={() => setAppLogo(null)}
                  />{' '}
                </div>
              ) : null}
            </div>
          </div>
        </form>
      </div>
      <div className='d-flex justify-content-around py-2'>
        <button
          disabled={!isValidToSubmit}
          className='btn'
          id='create-submit'
          type='submit'
          style={{ width: '85px' }}
        >
          Submit
        </button>
        <Link style={{ textDecoration: 'none' }} to={'/'}>
          <button className='btn' id='create-cancel' style={{ width: '85px' }}>
            Cancel
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CreateApp;
