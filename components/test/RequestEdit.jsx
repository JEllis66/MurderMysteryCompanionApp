import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../CSS/Create.css';

const RequestEdit = () => {
  const [subject, setSubject] = useState('');
  const [questConcern, setQuestConcern] = useState('');
  const [currentRequestData, setCurrentRequestData] = useState({});
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);

  const [touchedFields, setTouchedFields] = useState({
    subject: false,
    questConcern: false,
  }); 

  const markFieldAsTouched = fieldName => {
    setTouchedFields(prevTouchedFields => ({
      ...prevTouchedFields,
      [fieldName]: true,
    }));
  };
  
  const checkValidations = () => {

    subject.length < 2 || subject.length > 32 ||
    questConcern.length < 8 || questConcern.length > 256 ||
    Object.values(touchedFields).every(value => !value) ||
    (currentRequestData.subject === subject && currentRequestData.questConcern === questConcern)
      ? setIsSubmitDisabled(true)
      : setIsSubmitDisabled(false)
    
  }

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

  const adjustTextareaRows = () => {
    const textarea = document.getElementById('questConcern');
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight + 5}px`;
  };

  useEffect(() => {
    adjustTextareaRows();
  }, [questConcern]);

  useEffect(()=>{
    checkValidations();
  },[subject,questConcern])

  useEffect(()=>{
    console.log('Data fetched')
  },[currentRequestData])

  const fetchData = async () => {
    //axios GET request
    try {
      // Emulating an Axios request with a setTimeout
      const response = 
        {
          id: '004',
          subject: 'QR Code',
          questConcern: 'I am having trouble scanning QR Codes, the item is not found.'
        };
    setCurrentRequestData({subject: response.subject, questConcern: response.questConcern});
    setSubject(response.subject);
    setQuestConcern(response.questConcern);
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle error as needed
    }
  }

  useEffect(() => {
    requestFullScreen();
    fetchData().then(()=>{
      console.log('finished fetch')
    });
  }, []);

  return (
    <div className='create-character-container'>
      <h1 className='header-text'>Request Help:</h1>
      <div className='create-character-form'>
        <form>
          <div className='form-group'>
            <label className='create-edit-label' htmlFor='category'>
              Subject
            </label>
            <div className='input-group'>
              <input
                type='text'
                id='subject'
                name='subject'
                placeholder='Enter the Subject of your Request...'
                className='form-input-password'
                value={subject}
                onChange={e => {
                  setSubject(e.target.value);
                  markFieldAsTouched('subject');
                }}
                onClick={() => exitFullScreen()}
                style={
                  touchedFields.subject && (
                  subject.length < 2 || subject.length > 32 )
                  ? { backgroundColor: 'rgb(253, 193, 193)' }
                    : null
                }
              />
              {touchedFields.subject && (subject.length < 2 || subject.length > 32)  ? (
                <div>
                  <p className='form-error-message'>
                    {' '}
                    *Subject must be 2-32 characters in length!
                  </p>
                </div>
              ) : null}
            </div>
          </div>
          <div
            className='form-group'
            style={{ marginTop: '-10px', marginBottom: '30px' }}
          >
            <label className='create-edit-label' htmlFor='questConcern'>
              Question/Concern
            </label>
            <div className='input-group'>
              <textarea
                className='form-control custom-textarea custInput'
                id='questConcern'
                value={questConcern}
                placeholder='Type your concern here...'
                onChange={e => {
                  setQuestConcern(e.target.value);
                  markFieldAsTouched('questConcern');
                }}
                onClick={() => exitFullScreen()}
                style={
                  touchedFields.questConcern &&
                  (questConcern.length < 8 || questConcern.length > 256)
                    ? {
                        backgroundColor: 'rgb(253, 193, 193)',
                        borderRadius: '5px',
                        padding: '10px',
                        resize: 'none',
                        overflow: 'hidden',
                      }
                    : {
                        borderRadius: '5px',
                        padding: '10px',
                        resize: 'none',
                        overflow: 'hidden',
                      }
                }
              />
              {touchedFields.questConcern &&
                  (questConcern.length < 8 || questConcern.length > 256) ? (
                <div>
                  <p className='form-error-message'>
                    {' '}
                    *Question or Concern must be 8-256 characters in length!
                  </p>
                </div>
              ) : null}
            </div>
          </div>
        </form>
      </div>
      <div className='d-flex justify-content-around my-2'>
        <div></div>
        <Link to={'/help'}>
          <button
            type='submit'
            id='create-submit'
            className='btn my-app-create-button'
            style={{ width: '30vw', maxWidth: '120px' }}
            disabled={isSubmitDisabled}
          >
            Submit
          </button>
        </Link>
        <Link to={'/help-my-requests'}>
          <button
            id='create-cancel'
            className='btn btn-secondary'
            style={{ width: '30vw', maxWidth: '120px' }}
          >
            Cancel
          </button>
        </Link>
        <div></div>
      </div>
    </div>
  );
};

export default RequestEdit;
