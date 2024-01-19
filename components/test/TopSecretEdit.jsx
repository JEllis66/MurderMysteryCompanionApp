import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FiUpload, FiX } from 'react-icons/fi';
import '../CSS/Create.css';

const TopSecretEdit = () => {
  const { id } = useParams();
  const [secretTitle, setSecretTitle] = useState('');
  const [secretDescription, setSecretDescription] = useState('');
  const [secretContent, setSecretContent] = useState(null);
  const [imageObject, setImageObject] = useState(null);
  const [myItem, setMyItem] = useState({});
  const [allItems, setAllItems] = useState([]);
  const [itemTitleArray, setItemTitleArray] = useState([]);
  const [isChangingImage, setIsChangingImage] = useState(false);
  const [isValidToSubmit, setIsValidToSubmit] = useState(false);
  const [touchedFields, setTouchedFields] = useState({
    secretTitle: false,
    secretDescription: false,
    secretContent: false,
  });

  const markFieldAsTouched = fieldName => {
    setTouchedFields(prevTouchedFields => ({
      ...prevTouchedFields,
      [fieldName]: true,
    }));
  };

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

  const handleImageChange = e => {
    e.preventDefault();
    const file = e.target.files[0];
    setImageObject(file);
    //upload imageObject to Drive
    const fileName = e.target.files[0].name;
    setSecretContent({ name: fileName });
    markFieldAsTouched('secretContent');
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!isValidToSubmit) {
      return alert('Please review form fields and re-submit.');
    }
    const secretItemData = {
      secretTitle,
      secretDescription,
      secretContent,
    };

    try {
      // Make a POST request to your API endpoint
      const response = await axios.post(
        'http://flaskpython-api-url/api/story-items',
        storyItemData
      );

      // Handle the response, maybe redirect to another page or show a success message
      console.log(response.data); // Log the response for now
    } catch (error) {
      console.error('Error creating story item:', error);
    }
  };

  const fetchData = () => {
    // axios GET list of secretItems
    const allSecretItems = [
      {
        id: '032',
        isFavorite: false,
        secretTitle: 'Bad Boi',
        secretContent: '1mK_YCf_A01PEEuWfPU6kMOQp0X0SUr9R',
        secretDescription:
          'This boi is ungood; perhaps the worst trade deal in the history of trade deals',
      },
      {
        id: '034',
        isFavorite: false,
        secretTitle: 'Bad Boi - again',
        secretContent: '1mK_YCf_A01PEEuWfPU6kMOQp0X0SUr9R',
        secretDescription:
          'This boi is still ungood; very likely the worst trade deal in the history of trade deals',
      },
      {
        id: '036',
        isFavorite: false,
        secretTitle: 'Bad Boi - again again',
        secretContent: '1mK_YCf_A01PEEuWfPU6kMOQp0X0SUr9R',
        secretDescription:
          'This boi is a full-on baddy; certainly the worst trade deal in the history of trade deals, ever',
      },
    ];
    setAllItems(allSecretItems);
    const itemById = allSecretItems.find(item => item.id === id);
    setMyItem(itemById);
    setSecretTitle(itemById.secretTitle);
    setSecretDescription(itemById.secretDescription);
    setSecretContent({ name: itemById.secretContent });

    const itemsByTitleArray = allSecretItems
      .map(item => [item.secretTitle])
      .flat();
    setItemTitleArray(itemsByTitleArray);
  };

  const adjustTextAreaRows = () => {
    const textarea = document.getElementById('secretDescription');
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight + 5}px`;
  };

  useEffect(() => {
    adjustTextAreaRows();
  }, [secretDescription]);

  const checkValidation = () => {
    if (
      secretTitle.length < 2 ||
      secretTitle.length > 64 ||
      secretDescription.length < 16 ||
      secretDescription.length > 3000 ||
      secretContent === null ||
      (secretContent.name === myItem.secretContent && isChangingImage) ||
      (secretContent === undefined && isChangingImage) ||
      (myItem.secretTitle === secretTitle &&
        myItem.secretDescription === secretDescription &&
        !isChangingImage)
    ) {
      setIsValidToSubmit(false);
    } else {
      setIsValidToSubmit(true);
    }
  };

  const imgCheck = input => {
    if (input === 1) {
      let idVal;
      if (secretContent) {
        idVal = 'fileInputPopulated';
      } else {
        idVal = 'fileInput';
      }
      return idVal;
    }
  };

  useEffect(() => {
    checkValidation();
  }, [secretTitle, secretDescription, secretContent, isChangingImage]);

  useEffect(() => {
    requestFullScreen();
    fetchData();
  }, []);

  return (
    <div className='create-character-container'>
      <h1 className='header-text mt-2'>Edit Secret Item:</h1>
      <div className='create-character-form' onClick={() => exitFullScreen()}>
        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <label className='create-edit-label' htmlFor='secretTitle'>
              Title
            </label>
            <div className='input-group'>
              <input
                type='text'
                id='secretTitle'
                name='secretTitle'
                placeholder='Enter Secret title...'
                className={`form-input-password ${
                  touchedFields.secretTitle &&
                  (secretTitle.length < 2 || secretTitle.length > 64)
                    ? 'password-input-error'
                    : ''
                }`}
                value={secretTitle}
                onChange={e => {
                  setSecretTitle(e.target.value);
                  markFieldAsTouched('secretTitle');
                }}
              />
            </div>
            {touchedFields.secretTitle &&
              (secretTitle.length < 2 || secretTitle.length > 64) && (
                <div>
                  <p className='form-error-message'>
                    *Title must be 2-64 characters in length!
                  </p>
                </div>
              )}
          </div>

          <div className='form-group'>
            <label className='create-edit-label' htmlFor='secretDescription'>
              Description
            </label>
            <div className='input-group'>
              <textarea
                id='secretDescription'
                name='secretDescription'
                placeholder="Enter Secret's Description..."
                className='form-control custom-textarea custInput my-custom-scroll-skinny'
                value={secretDescription}
                onChange={e => {
                  setSecretDescription(e.target.value);
                  markFieldAsTouched('secretDescription');
                  adjustTextAreaRows();
                }}
                style={
                  touchedFields.secretDescription &&
                  (secretDescription.length < 16 ||
                    secretDescription.length > 3000)
                    ? {
                        backgroundColor: 'rgb(253, 193, 193)',
                        borderRadius: '3px',
                        marginBottom: '5px',
                      }
                    : { borderRadius: '3px' }
                }
              />
              {touchedFields.secretDescription &&
              (secretDescription.length < 16 ||
                secretDescription.length > 3000) ? (
                <div>
                  <p className='form-error-message mb-0'>
                    {' '}
                    *Description details must be 16-3000 characters in length!
                  </p>
                </div>
              ) : null}
            </div>
          </div>

          {isChangingImage ? (
            <div className='form-group'>
              <div className='text-center mb-2'>
                <label htmlFor='isChangingImage' className='form-label'>
                  <input
                    type='checkbox'
                    checked={isChangingImage}
                    className={`${isChangingImage ? 'create-edit-label' : ''}`}
                    onChange={() => {
                      setIsChangingImage(!isChangingImage);
                      setSecretContent({ name: myItem.secretContent });
                    }}
                  ></input>{' '}
                  <span
                    className='text-primary'
                    onClick={() => {
                      setIsChangingImage(!isChangingImage);
                      setSecretContent({ name: myItem.secretContent });
                    }}
                  >
                    {' '}
                    Edit Image?{' '}
                  </span>
                </label>
                <input
                  type='file'
                  className='form-control-file text-primary custom-file-input'
                  id='secretContent'
                  accept='image/*'
                  style={{ display: 'none' }}
                  onChange={handleImageChange}
                />
                <div className='d-flex'>
                  <div
                    className={`d-flex justify-content-start align-items-center`}
                    id={imgCheck(1)}
                  >
                    <div
                      className='custom-upload-button'
                      onClick={() =>
                        document.getElementById('secretContent').click()
                      }
                    >
                      File <FiUpload />
                    </div>
                    <div
                      id='input1-name-text'
                      className='text-primary fs-italic'
                    >
                      {secretContent ? secretContent.name : '*No File...'}
                    </div>
                  </div>
                  {secretContent ? (
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
                        onClick={() => setSecretContent(null)}
                      />{' '}
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          ) : (
            <div className='text-center mb-2'>
              <label htmlFor='isChangingImage' className='form-label'>
                <input
                  type='checkbox'
                  checked={isChangingImage}
                  className={`${isChangingImage ? 'create-edit-label' : ''}`}
                  onChange={() => {
                    setIsChangingImage(!isChangingImage);
                  }}
                ></input>{' '}
                <span
                  className='text-primary'
                  onClick={() => {
                    setIsChangingImage(!isChangingImage);
                  }}
                >
                  Edit Image?
                </span>
              </label>
            </div>
          )}
        </form>
      </div>
      <div className='d-flex justify-content-around mt-3'>
        <Link to={''}>
          <button
            type='submit'
            id='create-submit'
            className='btn'
            disabled={!isValidToSubmit}
            style={{ textDecoration: 'none', width: '27vw', maxWidth: '120px' }}
          >
            Submit
          </button>
        </Link>
        <Link to='/top-secret-list'>
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

export default TopSecretEdit;
