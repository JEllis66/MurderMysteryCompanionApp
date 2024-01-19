import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../CSS/Create.css';

const FAQCreate = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [isValidToSubmit, setIsValidToSubmit] = useState(false);
  const [touchedFields, setTouchedFields] = useState({
    question: false,
    answer: false,
  });

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

  const adjustTextAreaRows = () => {
    const textarea = document.getElementById('question');
    textarea.style.height = 'auto';
    textarea.style.height = `${(textarea.scrollHeight)+5}px`;
  };

  const adjustTextAreaRows2 = () => {
    const textarea = document.getElementById('answer');
    textarea.style.height = 'auto';
    textarea.style.height = `${(textarea.scrollHeight)+5}px`;
  };

  const checkValidation = () => {
    if (
      question.length < 8 || question.length > 512 ||
      answer.length < 8 || answer.length > 1024
    ) {
      setIsValidToSubmit(false);
    } else {
      setIsValidToSubmit(true);
    }
  };

  const markFieldAsTouched = (fieldName) => {
    setTouchedFields((prevTouchedFields) => ({
      ...prevTouchedFields,
      [fieldName]: true,
    }));
  };

  useEffect(() => {
    checkValidation();
  }, [question, answer]);

  useEffect(()=>{
    requestFullScreen();
  },[])

  return (
    <div className='create-character-container'>
      <div>
        <h1 className='header-text mb-0'>Create FAQ:</h1>
      </div>
      <div className='create-character-form'>
        
        <form>
          <div className='form-group'>
            <label className='create-edit-label' htmlFor='question'>Question</label>
            <div className='input-group'>
              <textarea
                id='question'
                name='question'
                placeholder='Enter question...'
                className={`form-control custom-textarea custInput my-custom-scroll-skinny ${
                  touchedFields.question &&
                  (question.length < 8 || question.length > 512)
                    ? 'input-error'
                    : ''
                }`}
                value={question}
                onChange={(e) => {
                  setQuestion(e.target.value);
                  markFieldAsTouched('question');
                  adjustTextAreaRows();
                }}
                style={{ maxHeight: '200px' }}
              />
            </div>
            {touchedFields.question &&
              (question.length < 8 || question.length > 512) && (
                <div>
                  <p className='form-error-message'>
                    *Question must be 8-512 characters in length!
                  </p>
                </div>
              )}
          </div>
        
          <div className='form-group'>
            <label className='create-edit-label' htmlFor='answer'>Answer</label>
            <div className='input-group'>
              <textarea
                id='answer'
                name='answer'
                placeholder='Enter answer...'
                className={`form-control custom-textarea custInput my-custom-scroll-skinny ${
                  touchedFields.answer &&
                  (answer.length < 8 || answer.length > 1024)
                    ? 'input-error'
                    : ''
                }`}
                value={answer}
                onChange={(e) => {
                  setAnswer(e.target.value);
                  markFieldAsTouched('answer');
                  adjustTextAreaRows2();
                }}
                style={{ maxHeight: '200px' }}
              />
            </div>
            {touchedFields.answer &&
              (answer.length < 8 || answer.length > 1024) && (
                <div>
                  <p className='form-error-message'>
                    *Answer must be 8-1024 characters in length!
                  </p>
                </div>
              )}
          </div>

        </form>
      </div>
      <div className='d-flex justify-content-around mt-2 mb-0 pb-0'>
            <Link to={''}>
              <button
                disabled={!isValidToSubmit}
                type='submit'
                id='create-submit'
                className='btn'
                style={{ textDecoration: 'none', width: '27vw', maxWidth: '120px' }}
              >
                Submit
              </button>
            </Link>
            <Link to='/faq-list'>
              <button
                className='btn'
                id='create-cancel'
                style={{ textDecoration: 'none', width: '27vw', maxWidth: '120px' }}
              >
                Cancel
              </button>
            </Link>
          </div>
    </div>
  );
};

export default FAQCreate;
