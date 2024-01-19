import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiUpload, FiX } from 'react-icons/fi';
import { useActiveTab } from '../ActiveTabContext';
import '../CSS/Create.css';

const NewsCreate = () => {
  const [imageObject, setImageObject] = useState(null);
  const [imageObject2, setImageObject2] = useState(null);
  const [imageObject3, setImageObject3] = useState(null);
  const [newsItem, setNewsItem] = useState({
    columnOneImage: null,
    columnOneHeadline: '',
    columnOneText: '',
    columnTwoImage: null,
    columnTwoHeadline: '',
    columnTwoText: '',
    columnThreeImage: null,
    columnThreeHeadline: '',
    columnThreeText: '',
    priorityNumber: 0,
    paperDate: '',
  });

  const [isValidToSubmit, setIsValidToSubmit] = useState(false);
  const [touchedFields, setTouchedFields] = useState({
    columnOneHeadline: false,
    columnOneText: false,
    columnTwoHeadline: false,
    columnTwoText: false,
    columnThreeHeadline: false,
    columnThreeText: false,
    priorityNumber: false,
    paperDate: false,
  });

  const { activeTab, setTab } = useActiveTab();

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

  const adjustTextareaRows = field => {
    const textarea = document.getElementById(field);
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight + 5}px`;
  };

  useEffect(() => {
    adjustTextareaRows('columnOneText');
  }, [newsItem.columnOneText]);

  useEffect(() => {
    adjustTextareaRows('columnTwoText');
  }, [newsItem.columnTwoText]);

  useEffect(() => {
    adjustTextareaRows('columnThreeText');
  }, [newsItem.columnThreeText]);

  const handleImageUpload = (field, e) => {
    const file = e.target.files[0];
    if (field === 'columnOneImage') {
      setImageObject(file);
    } else if (field === 'columnTwoImage') {
      setImageObject2(file);
    } else if (field === 'columnThreeImage') {
      setImageObject3(file);
    }
    const fileName = e.target.files[0].name;
    setNewsItem(prev => ({ ...prev, [field]: fileName }));
  };

  const handleChange = (field, value) => {
    setNewsItem(prev => ({ ...prev, [field]: value }));
    markFieldAsTouched(field);
  };

  const markFieldAsTouched = field => {
    setTouchedFields(prev => ({
      ...prev,
      [field]: true,
    }));
  };

  const markFieldAsUntouched = field => {
    setTouchedFields(prev => ({
      ...prev,
      [field]: false,
    }));
  };

  const checkValidation = () => {
    const {
      columnOneImage,
      columnOneHeadline,
      columnOneText,
      columnTwoImage,
      columnTwoHeadline,
      columnTwoText,
      columnThreeImage,
      columnThreeHeadline,
      columnThreeText,
      priorityNumber,
      paperDate,
    } = newsItem;

    if (
      priorityNumber >= 0 &&
      paperDate !== '' &&
      columnOneImage !== null &&
      columnOneImage !== undefined &&
      document.getElementById('input1-name-text').innerHTML !== '*No File...' &&
      columnOneHeadline.length >= 2 &&
      columnOneHeadline.length <= 64 &&
      columnOneText.length >= 16 &&
      columnOneText.length <= 3000 &&
      (!columnTwoHeadline ||
        columnTwoHeadline === null ||
        columnTwoHeadline === undefined ||
        columnTwoHeadline.length < 1) &&
      (!columnTwoText ||
        columnTwoText === null ||
        columnTwoText === undefined ||
        columnTwoText.length < 1) &&
      (!columnTwoImage ||
        columnTwoImage === null ||
        columnTwoImage === undefined) &&
      (!columnThreeHeadline ||
        columnThreeHeadline === null ||
        columnThreeHeadline === undefined ||
        columnThreeHeadline.length < 1) &&
      (!columnThreeText ||
        columnThreeText === null ||
        columnThreeText === undefined ||
        columnThreeText.length < 1) &&
      (!columnThreeImage ||
        columnThreeImage === null ||
        columnThreeImage === undefined)
    ) {
      markFieldAsUntouched('columnTwoHeadline');
      markFieldAsUntouched('columnTwoText');
      markFieldAsUntouched('columnTwoImage');
      markFieldAsUntouched('columnThreeHeadline');
      markFieldAsUntouched('columnThreeText');
      markFieldAsUntouched('columnThreeImage');
      setIsValidToSubmit(true);
      return;
    }

    if (
      priorityNumber >= 0 &&
      paperDate !== '' &&
      columnOneImage !== null &&
      columnOneImage !== undefined &&
      document.getElementById('input1-name-text').innerHTML !== '*No File...' &&
      columnOneHeadline.length >= 2 &&
      columnOneHeadline.length <= 64 &&
      columnOneText.length >= 16 &&
      columnOneText.length <= 3000 &&
      columnTwoImage !== null &&
      columnTwoImage !== undefined &&
      document.getElementById('input2-name-text').innerHTML !== '*No File...' &&
      columnTwoHeadline.length >= 2 &&
      columnTwoHeadline.length <= 64 &&
      columnTwoText.length >= 16 &&
      columnTwoText.length <= 3000 &&
      (!columnThreeHeadline ||
        columnThreeHeadline === null ||
        columnThreeHeadline === undefined ||
        columnThreeHeadline.length < 1) &&
      (!columnThreeText ||
        columnThreeText === null ||
        columnThreeText === undefined ||
        columnThreeText.length < 1) &&
      (!columnThreeImage ||
        columnThreeImage === null ||
        columnThreeImage === undefined)
    ) {
      markFieldAsUntouched('columnThreeHeadline');
      markFieldAsUntouched('columnThreeText');
      markFieldAsUntouched('columnThreeImage');
      setIsValidToSubmit(true);
      return;
    }

    setIsValidToSubmit(
      columnOneImage !== null &&
        columnOneImage !== undefined &&
        document.getElementById('input1-name-text').innerHTML !==
          '*No File...' &&
        columnOneHeadline.length >= 2 &&
        columnOneHeadline.length <= 64 &&
        columnOneText.length >= 16 &&
        columnOneText.length <= 3000 &&
        columnTwoImage !== null &&
        columnTwoImage !== undefined &&
        document.getElementById('input2-name-text').innerHTML !==
          '*No File...' &&
        columnTwoHeadline.length >= 2 &&
        columnTwoHeadline.length <= 64 &&
        columnTwoText.length >= 16 &&
        columnTwoText.length <= 3000 &&
        columnThreeImage !== null &&
        columnThreeImage !== undefined &&
        document.getElementById('input3-name-text').innerHTML !==
          '*No File...' &&
        columnThreeHeadline.length >= 2 &&
        columnThreeHeadline.length <= 64 &&
        columnThreeText.length >= 16 &&
        columnThreeText.length <= 3000 &&
        priorityNumber >= 0 &&
        paperDate !== ''
    );
  };

  useEffect(() => {
    checkValidation();
  }, [
    newsItem.columnOneImage,
    newsItem.columnOneHeadline,
    newsItem.columnOneText,
    newsItem.columnTwoImage,
    newsItem.columnTwoHeadline,
    newsItem.columnTwoText,
    newsItem.columnThreeImage,
    newsItem.columnThreeHeadline,
    newsItem.columnThreeText,
    newsItem.priorityNumber,
    newsItem.paperDate,
  ]);

  const handleSubmit = e => {
    e.preventDefault();

    if (!isValidToSubmit) {
      return alert('Please review form fields and re-submit.');
    }

    // Your submit logic here
  };

  const colImgCheck = input => {
    if (input === 1) {
      let idVal;
      if (newsItem.columnOneImage) {
        idVal = 'fileInputPopulated';
      } else {
        idVal = 'fileInput';
      }
      return idVal;
    } else if (input === 2) {
      let idVal;
      if (newsItem.columnTwoImage) {
        idVal = 'fileInput2Populated';
      } else {
        idVal = 'fileInput2';
      }
      return idVal;
    } else {
      let idVal;
      if (newsItem.columnThreeImage) {
        idVal = 'fileInput3Populated';
      } else {
        idVal = 'fileInput3';
      }
      return idVal;
    }
  };

  useEffect(() => {
    requestFullScreen();
    setTab('news-create');
  }, []);

  return (
    <div className='create-character-container'>
      <div>
        <h1 className='header-text mb-0'>Create News Article:</h1>
      </div>
      <div
        className='create-character-form'
        style={{ marginTop: '5px' }}
        onClick={() => exitFullScreen()}
      >
        <form onSubmit={handleSubmit}>
          <div className='form-group mt-2'>
            <label className='create-edit-label' htmlFor='paperDate'>
              Date of Article:
            </label>
            <div className='input-group d-flex'>
              <input
                type='date'
                id='paperDate'
                name='paperDate'
                className={`form-input-password ${
                  touchedFields.paperDate && newsItem.paperDate === ''
                    ? 'password-input-error'
                    : ''
                }`}
                value={newsItem.paperDate}
                onChange={e => handleChange('paperDate', e.target.value)}
              />
            </div>
            {touchedFields.paperDate && newsItem.paperDate === '' && (
              <div>
                <p className='form-error-message'>*Date is required!</p>
              </div>
            )}
          </div>

          <div className='form-group'>
            <label className='create-edit-label' htmlFor='priorityNumber'>
              Priority Level:
            </label>
            <div className='input-group'>
              <input
                type='number'
                id='priorityNumber'
                name='priorityNumber'
                placeholder='Set Story Priority Level...'
                className={`form-input-password ${
                  touchedFields.priorityNumber &&
                  (newsItem.priorityNumber < 0 ||
                    isNaN(newsItem.priorityNumber))
                    ? 'password-input-error'
                    : ''
                }`}
                value={newsItem.priorityNumber}
                onChange={e =>
                  handleChange('priorityNumber', parseInt(e.target.value, 10))
                }
              />
            </div>
            {touchedFields.priorityNumber &&
              (newsItem.priorityNumber < 0 ||
                isNaN(newsItem.priorityNumber)) && (
                <div>
                  <p className='form-error-message'>*Invalid Priority Level!</p>
                </div>
              )}
          </div>

          {/* Form fields for Column 1 */}
          <div className='form-group'>
            <label className='create-edit-label' htmlFor='columnOneHeadline'>
              Column 1 Headline:
            </label>
            <div className='input-group'>
              <input
                type='text'
                id='columnOneHeadline'
                name='columnOneHeadline'
                placeholder='Enter Column 1 Headline...'
                className={`form-input-password ${
                  touchedFields.columnOneHeadline &&
                  (newsItem.columnOneHeadline.length < 2 ||
                    newsItem.columnOneHeadline.length > 64)
                    ? 'password-input-error'
                    : ''
                }`}
                value={newsItem.columnOneHeadline}
                onChange={e =>
                  handleChange('columnOneHeadline', e.target.value)
                }
              />
            </div>
            {touchedFields.columnOneHeadline &&
              (newsItem.columnOneHeadline.length < 2 ||
                newsItem.columnOneHeadline.length > 64) && (
                <div>
                  <p className='form-error-message'>
                    *Headline must be between 2 and 64 characters!
                  </p>
                </div>
              )}
          </div>

          <div className='form-group'>
            <label className='create-edit-label' htmlFor='columnOneText'>
              Column 1 Text:
            </label>
            <div className='input-group'>
              <textarea
                className={`form-control custom-textarea custInput ${
                  touchedFields.columnOneText &&
                  (newsItem.columnOneText.length < 16 ||
                    newsItem.columnOneText.length > 3000)
                    ? 'password-input-error'
                    : ''
                }`}
                id='columnOneText'
                value={newsItem.columnOneText}
                placeholder='Enter Column 1 Text...'
                onChange={e => handleChange('columnOneText', e.target.value)}
                style={{
                  borderRadius: '5px',
                  padding: '10px',
                  resize: 'none',
                  overflow: 'hidden',
                  backgroundColor: `${
                    touchedFields.columnOneText &&
                    (newsItem.columnOneText.length < 16 ||
                      newsItem.columnOneText.length > 3000)
                      ? 'rgb(253, 193, 193)'
                      : ''
                  }`,
                }}
              />
            </div>
            {touchedFields.columnOneText &&
              (newsItem.columnOneText.length < 16 ||
                newsItem.columnOneText.length > 3000) && (
                <div>
                  <p className='form-error-message'>
                    *Text must be between 16 and 3000 characters!
                  </p>
                </div>
              )}
          </div>

          <div className='form-group text-start'>
            <label className='create-edit-label' htmlFor='columnOneImage'>
              Column 1 Image:
            </label>
            <input
              type='file'
              className='form-control-file text-primary custom-file-input'
              id='columnOneImage'
              name='columnOneImage'
              accept='image/*'
              style={{ display: 'none' }}
              onChange={e => handleImageUpload('columnOneImage', e)}
            />
            <div className='d-flex'>
              <div
                className={`d-flex justify-content-start align-items-center`}
                id={colImgCheck(1)}
              >
                <div
                  className='custom-upload-button'
                  onClick={() =>
                    document.getElementById('columnOneImage').click()
                  }
                >
                  File <FiUpload />
                </div>
                <div id='input1-name-text' className='text-primary fs-italic'>
                  {newsItem.columnOneImage
                    ? newsItem.columnOneImage
                    : '*No File...'}
                </div>
              </div>
              {newsItem.columnOneImage ? (
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
                    onClick={() =>
                      setNewsItem(prev => ({ ...prev, columnOneImage: null }))
                    }
                  />{' '}
                </div>
              ) : null}
            </div>
          </div>

          {/* Form fields for Column 2 */}
          <div className='form-group'>
            <label className='text-secondary' htmlFor='columnTwoHeadline'>
              Column 2 Headline:
            </label>
            <div className='input-group'>
              <input
                type='text'
                id='columnTwoHeadline'
                name='columnTwoHeadline'
                placeholder='Enter Column 2 Headline...'
                className={`form-input-password ${
                  touchedFields.columnTwoHeadline &&
                  (newsItem.columnTwoHeadline.length < 2 ||
                    newsItem.columnTwoHeadline.length > 64)
                    ? 'password-input-error'
                    : ''
                }`}
                value={newsItem.columnTwoHeadline}
                onChange={e =>
                  handleChange('columnTwoHeadline', e.target.value)
                }
              />
            </div>
            {touchedFields.columnTwoHeadline &&
              (newsItem.columnTwoHeadline.length < 2 ||
                newsItem.columnTwoHeadline.length > 64) && (
                <div>
                  <p className='form-error-message'>
                    *Headline must be between 2 and 64 characters!
                  </p>
                </div>
              )}
          </div>

          <div className='form-group'>
            <label className='text-secondary' htmlFor='columnTwoText'>
              Column 2 Text:
            </label>
            <div className='input-group'>
              <textarea
                className={`form-control custom-textarea custInput ${
                  touchedFields.columnTwoText &&
                  (newsItem.columnTwoText.length < 16 ||
                    newsItem.columnTwoText.length > 3000)
                    ? 'password-input-error'
                    : ''
                }`}
                id='columnTwoText'
                value={newsItem.columnTwoText}
                placeholder='Enter Column 2 Text...'
                onChange={e => handleChange('columnTwoText', e.target.value)}
                style={{
                  borderRadius: '5px',
                  padding: '10px',
                  resize: 'none',
                  overflow: 'hidden',
                  backgroundColor: `${
                    touchedFields.columnTwoText &&
                    (newsItem.columnTwoText.length < 16 ||
                      newsItem.columnTwoText.length > 3000)
                      ? 'rgb(253, 193, 193)'
                      : ''
                  }`,
                }}
              />
            </div>
            {touchedFields.columnTwoText &&
              (newsItem.columnTwoText.length < 16 ||
                newsItem.columnTwoText.length > 3000) && (
                <div>
                  <p className='form-error-message'>
                    *Text must be between 16 and 3000 characters!
                  </p>
                </div>
              )}
          </div>

          <div className='form-group text-start'>
            <label className='text-secondary' htmlFor='columnTwoImage'>
              Column 2 Image:
            </label>
            <input
              type='file'
              className='form-control-file text-primary custom-file-input'
              id='columnTwoImage'
              name='columnTwoImage'
              accept='image/*'
              style={{ display: 'none' }}
              onChange={e => handleImageUpload('columnTwoImage', e)}
            />
            <div className='d-flex'>
              <div
                className={`d-flex justify-content-start align-items-center`}
                id={colImgCheck(2)}
              >
                <div
                  className='custom-upload-button'
                  onClick={() =>
                    document.getElementById('columnTwoImage').click()
                  }
                >
                  File <FiUpload />
                </div>
                <div id='input2-name-text' className='text-primary fs-italic'>
                  {newsItem.columnTwoImage
                    ? newsItem.columnTwoImage
                    : '*No File...'}
                </div>
              </div>
              {newsItem.columnTwoImage ? (
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
                    onClick={() =>
                      setNewsItem(prev => ({ ...prev, columnTwoImage: null }))
                    }
                  />{' '}
                </div>
              ) : null}
            </div>
          </div>

          {/* Form fields for Column 3 */}

          <div className='form-group'>
            <label className='text-secondary' htmlFor='columnThreeHeadline'>
              Column 3 Headline:
            </label>
            <div className='input-group'>
              <input
                type='text'
                id='columnThreeHeadline'
                name='columnThreeHeadline'
                placeholder='Enter Column 3 Headline...'
                className={`form-input-password ${
                  touchedFields.columnThreeHeadline &&
                  (newsItem.columnThreeHeadline.length < 2 ||
                    newsItem.columnThreeHeadline.length > 64)
                    ? 'password-input-error'
                    : ''
                }`}
                value={newsItem.columnThreeHeadline}
                onChange={e =>
                  handleChange('columnThreeHeadline', e.target.value)
                }
              />
            </div>
            {touchedFields.columnThreeHeadline &&
              (newsItem.columnThreeHeadline.length < 2 ||
                newsItem.columnThreeHeadline.length > 64) && (
                <div>
                  <p className='form-error-message'>
                    *Headline must be between 2 and 64 characters!
                  </p>
                </div>
              )}
          </div>

          <div className='form-group'>
            <label className='text-secondary' htmlFor='columnThreeText'>
              Column 3 Text:
            </label>
            <div className='input-group'>
              <textarea
                className={`form-control custom-textarea custInput ${
                  touchedFields.columnThreeText &&
                  (newsItem.columnThreeText.length < 16 ||
                    newsItem.columnThreeText.length > 3000)
                    ? 'password-input-error'
                    : ''
                }`}
                id='columnThreeText'
                value={newsItem.columnThreeText}
                placeholder='Enter Column 3 Text...'
                onChange={e => handleChange('columnThreeText', e.target.value)}
                style={{
                  borderRadius: '5px',
                  padding: '10px',
                  resize: 'none',
                  overflow: 'hidden',
                  backgroundColor: `${
                    touchedFields.columnThreeText &&
                    (newsItem.columnThreeText.length < 16 ||
                      newsItem.columnThreeText.length > 3000)
                      ? 'rgb(253, 193, 193)'
                      : ''
                  }`,
                }}
              />
            </div>
            {touchedFields.columnThreeText &&
              (newsItem.columnThreeText.length < 16 ||
                newsItem.columnThreeText.length > 3000) && (
                <div>
                  <p className='form-error-message'>
                    *Text must be between 16 and 3000 characters!
                  </p>
                </div>
              )}
          </div>

          <div className='form-group text-start'>
            <label className='text-secondary' htmlFor='columnThreeImage'>
              Column 3 Image:
            </label>
            <input
              type='file'
              className='form-control-file text-primary custom-file-input'
              id='columnThreeImage'
              name='columnThreeImage'
              accept='image/*'
              style={{ display: 'none' }}
              onChange={e => handleImageUpload('columnThreeImage', e)}
            />
            <div className='d-flex'>
              <div
                className={`d-flex justify-content-start align-items-center`}
                id={colImgCheck(3)}
              >
                <div
                  className='custom-upload-button'
                  onClick={() =>
                    document.getElementById('columnThreeImage').click()
                  }
                >
                  File <FiUpload />
                </div>
                <div id='input3-name-text' className='text-primary fs-italic'>
                  {newsItem.columnThreeImage
                    ? newsItem.columnThreeImage
                    : '*No File...'}
                </div>
              </div>
              {newsItem.columnThreeImage ? (
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
                    onClick={() =>
                      setNewsItem(prev => ({ ...prev, columnThreeImage: null }))
                    }
                  />{' '}
                </div>
              ) : null}
            </div>
          </div>
        </form>
      </div>
      <div className='d-flex justify-content-around mt-2'>
        <Link to={''}>
          <button
            type='submit'
            id='create-submit'
            className='btn'
            style={{
              textDecoration: 'none',
              width: '27vw',
              maxWidth: '120px',
            }}
            disabled={!isValidToSubmit}
          >
            Submit
          </button>
        </Link>
        <Link to='/news-list'>
          <button
            className='btn'
            id='create-cancel'
            style={{
              textDecoration: 'none',
              width: '27vw',
              maxWidth: '120px',
            }}
          >
            Cancel
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NewsCreate;
