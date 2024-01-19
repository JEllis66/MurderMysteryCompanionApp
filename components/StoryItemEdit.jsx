import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FiRefreshCw, FiUpload, FiX } from 'react-icons/fi';
import '../CSS/Create.css';

const EditStoryItem = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [lookupKey, setLookupKey] = useState('');
  const [itemImage, setItemImage] = useState(null);
  const [imageObject, setImageObject] = useState(null);
  const [searchWord1, setSearchWord1] = useState('');
  const [searchWord2, setSearchWord2] = useState('');
  const [searchWord3, setSearchWord3] = useState('');
  const [isChangingImage, setIsChangingImage] = useState(false);
  const [isImageUploaded, setIsImageUploaded] = useState(false);
  const [isValidToSubmit, setIsValidToSubmit] = useState(false);
  const [compareSettings, setCompareSettings] = useState({});
  const [touchedFields, setTouchedFields] = useState({
    title: false,
    description: false,
    lookupKey: false,
    searchWord1: false,
    searchWord2: false,
    searchWord3: false,
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

  const markFieldAsTouched = fieldName => {
    setTouchedFields(prevTouchedFields => ({
      ...prevTouchedFields,
      [fieldName]: true,
    }));
  };

  const getRandomCode = () => {
    const validChars = 'ABCDEFGHJKLMNPRTUVWXY23456789';
    let codeRes = '';
    while (codeRes.length < 8) {
      let randomIndex = Math.floor(Math.random() * validChars.length);
      let newChar = validChars[randomIndex];
      codeRes += newChar;
    }
    return codeRes;
  };

  const setRandomCode = () => {
    setLookupKey(getRandomCode());
  };

  const checkValidation = () => {
    if (
      title.length < 2 ||
      title.length > 64 ||
      description.length < 16 ||
      description.length > 3000 ||
      lookupKey.length !== 8 ||
      searchWord1.length < 2 ||
      searchWord1.length > 64 ||
      searchWord2.length > 64 ||
      searchWord2.length === 1 ||
      searchWord3.length > 64 ||
      searchWord3.length === 1 ||
      itemImage === null ||
      itemImage === undefined ||
      (compareSettings.title === title &&
        compareSettings.description === description &&
        compareSettings.lookupKey === lookupKey &&
        compareSettings.searchWord1 === searchWord1 &&
        compareSettings.searchWord2 === searchWord2 &&
        compareSettings.searchWord3 === searchWord3 &&
        !isChangingImage) ||
      (compareSettings.title === title &&
        compareSettings.description === description &&
        compareSettings.lookupKey === lookupKey &&
        compareSettings.searchWord1 === searchWord1 &&
        compareSettings.searchWord2 === searchWord2 &&
        compareSettings.searchWord3 === searchWord3 &&
        isChangingImage &&
        { test: compareSettings.content }.test ===
          { test: itemImage.name }.test)
    ) {
      setIsValidToSubmit(false);
    } else {
      setIsValidToSubmit(true);
    }
  };

  const adjustTextAreaRows = () => {
    const textarea = document.getElementById('description');
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight + 5}px`;
  };

  const imgCheck = input => {
    if (input === 1) {
      let idVal;
      if (itemImage) {
        idVal = 'fileInputPopulated';
      } else {
        idVal = 'fileInput';
      }
      return idVal;
    }
  };

  useEffect(() => {
    requestFullScreen();
    // Emulated fetch to pre-fill form fields
    // Replace this with actual axios call to your API
    // For now, it just sets some default values
    const fetchData = async () => {
      try {
        // Emulated response data
        const response = {
          title: 'Sample Title',
          description: 'Sample Description',
          content: 'content.png',
          lookupKey: 'ABC12345',
          searchWord1: 'SampleWord1',
          searchWord2: 'SampleWord2',
          searchWord3: 'SampleWord3',
        };

        setCompareSettings(response);
        setTitle(response.title);
        setDescription(response.description);
        setLookupKey(response.lookupKey);
        setSearchWord1(response.searchWord1);
        setSearchWord2(response.searchWord2);
        setSearchWord3(response.searchWord3);
        setItemImage({ name: response.content });
      } catch (error) {
        console.error('Error fetching story item:', error);
      }
    };

    fetchData();
  }, []); // Run only once on component mount

  const handleSubmit = async e => {
    e.preventDefault();

    if (!isValidToSubmit) {
      return alert('Please review form fields and re-submit.');
    }

    // Check SQL model column names
    const storyItemData = {
      title,
      description,
      lookupKey,
      searchWord1,
      searchWord2,
      searchWord3,
      content: itemImage,
    };

    try {
      // Make a PUT request to update the story item
      // Replace 'your-api-url' and '/api/story-items/:id' with your actual API endpoint
      const response = await axios.put(
        `http://your-api-url/api/story-items/${id}`,
        storyItemData
      );

      // Handle the response, maybe redirect to another page or show a success message
      console.log(response.data); // Log the response for now
    } catch (error) {
      console.error('Error updating story item:', error);
    }
  };

  handleImageChange = e => {
    e.preventDefault();
    const file = e.target.files[0];
    setImageObject(file);
    //upload imageObject to Drive
    const fileName = e.target.files[0].name;
    setItemImage({ name: fileName });
    setIsImageUploaded(true);
  };

  useEffect(() => {
    checkValidation();
  }, [
    title,
    description,
    lookupKey,
    searchWord1,
    searchWord2,
    searchWord3,
    isChangingImage,
    itemImage,
    isImageUploaded,
  ]);

  return (
    <div className='create-character-container'>
      <div>
        <h1 className='header-text' style={{ marginBottom: '-10px' }}>
          Edit Clue Item:
        </h1>
      </div>
      <div className='create-character-form' onClick={() => exitFullScreen()}>
        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <label className='create-edit-label' htmlFor='title'>
              Clue Item Title
            </label>
            <div className='input-group'>
              <input
                type='text'
                id='title'
                name='title'
                placeholder='Enter Clue Item title...'
                className={`form-input-password ${
                  touchedFields.title && (title.length < 2 || title.length > 64)
                    ? 'password-input-error'
                    : ''
                }`}
                value={title}
                onChange={e => {
                  setTitle(e.target.value);
                  markFieldAsTouched('title');
                }}
              />
            </div>
            {touchedFields.title && (title.length < 2 || title.length > 64) && (
              <div>
                <p className='form-error-message'>
                  *Title must be 2-64 characters in length!
                </p>
              </div>
            )}
          </div>

          <div className='form-group'>
            <label className='create-edit-label' htmlFor='description'>
              Description
            </label>
            <div className='input-group'>
              <textarea
                id='description'
                name='description'
                placeholder="Enter clue's description..."
                className='form-control custom-textarea custInput my-custom-scroll-skinny'
                value={description}
                style={
                  touchedFields.description &&
                  (description.length < 16 || description.length > 1000)
                    ? {
                        backgroundColor: 'rgb(253, 193, 193)',
                        borderRadius: '3px',
                        marginBottom: '5px',
                      }
                    : { borderRadius: '3px' }
                }
                onChange={e => {
                  setDescription(e.target.value);
                  markFieldAsTouched('description');
                  adjustTextAreaRows();
                }}
              />
              {touchedFields.description &&
              (description.length < 16 || description.length > 3000) ? (
                <div>
                  <p className='form-error-message'>
                    {' '}
                    *Description details must be 16-3000 characters in length!
                  </p>
                </div>
              ) : null}
            </div>
          </div>

          <div className='form-group'>
            <label className='create-edit-label' htmlFor='lookupKey'>
              Lookup Key
            </label>
            <div className='input-group'>
              <input
                type='text'
                id='lookupKey'
                name='lookupKey'
                placeholder='Create Story/Item Lookup Key...'
                className='form-input'
                value={lookupKey}
                style={
                  touchedFields.lookupKey && lookupKey.length !== 8
                    ? { backgroundColor: 'rgb(253, 193, 193)' }
                    : null
                }
                onChange={e => {
                  setLookupKey(e.target.value.toUpperCase());
                  markFieldAsTouched('lookupKey');
                }}
              />
              <button
                type='button'
                className='refresh-button'
                style={{
                  width: '38px',
                }}
                onClick={setRandomCode}
              >
                <FiRefreshCw />
              </button>
              {touchedFields.lookupKey && lookupKey.length !== 8 ? (
                <div>
                  <p className='form-error-message'>
                    {' '}
                    *Lookup keys must be 8 characters in length!
                  </p>
                </div>
              ) : null}
            </div>
          </div>

          <div className='form-group'>
            <label className='create-edit-label' htmlFor='searchWord1'>
              Search Word 1
            </label>
            <div className='input-group'>
              <input
                type='text'
                id='searchWord1'
                name='searchWord1'
                placeholder='Enter Search Word 1...'
                className='form-input-password'
                value={searchWord1}
                style={
                  touchedFields.searchWord1 &&
                  (searchWord1.length < 2 || searchWord1.length > 64)
                    ? { backgroundColor: 'rgb(253, 193, 193)' }
                    : null
                }
                onChange={e => {
                  setSearchWord1(e.target.value);
                  markFieldAsTouched('searchWord1');
                }}
              />
            </div>
            {touchedFields.searchWord1 &&
            (searchWord1.length < 2 || searchWord1.length > 64) ? (
              <div>
                <p className='form-error-message'>
                  {' '}
                  *1st Search Word is required and must be 2-64 characters in
                  length!
                </p>
              </div>
            ) : null}
          </div>

          <div className='form-group'>
            <label htmlFor='searchWord2'>
              <span className='text-secondary'> Search Word 2 (optional) </span>
            </label>
            <div className='input-group'>
              <input
                type='text'
                id='searchWord2'
                name='searchWord2'
                placeholder='Enter Search Word 2...'
                className='form-input-password'
                value={searchWord2}
                style={
                  touchedFields.searchWord2 &&
                  searchWord2.length !== 0 &&
                  (searchWord2.length < 2 || searchWord2.length > 64)
                    ? { backgroundColor: 'rgb(253, 193, 193)' }
                    : null
                }
                onChange={e => {
                  setSearchWord2(e.target.value);
                  markFieldAsTouched('searchWord2');
                }}
              />
            </div>
            {touchedFields.searchWord2 &&
            searchWord2.length !== 0 &&
            (searchWord2.length < 2 || searchWord2.length > 64) ? (
              <div>
                <p className='form-error-message'>
                  {' '}
                  *Optional search words must be 2-64 characters in length!
                </p>
              </div>
            ) : null}
          </div>

          <div className='form-group'>
            <label htmlFor='searchWord3'>
              <span className='text-secondary'> Search Word 3 (optional) </span>
            </label>
            <div className='input-group'>
              <input
                type='text'
                id='searchWord3'
                name='searchWord3'
                placeholder='Enter Search Word 3...'
                className='form-input-password'
                value={searchWord3}
                style={
                  touchedFields.searchWord3 &&
                  searchWord3.length !== 0 &&
                  (searchWord3.length < 2 || searchWord3.length > 64)
                    ? { backgroundColor: 'rgb(253, 193, 193)' }
                    : null
                }
                onChange={e => {
                  setSearchWord3(e.target.value);
                  markFieldAsTouched('searchWord3');
                }}
              />
            </div>
            {touchedFields.searchWord3 &&
            searchWord3.length !== 0 &&
            (searchWord3.length < 2 || searchWord3.length > 64) ? (
              <div>
                <p className='form-error-message'>
                  {' '}
                  *Optional search words must be 2-64 characters in length!
                </p>
              </div>
            ) : null}
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
                      setItemImage({ name: compareSettings.content });
                    }}
                  ></input>{' '}
                  <span
                    className='text-primary'
                    onClick={() => {
                      setIsChangingImage(!isChangingImage);
                      setItemImage({ name: compareSettings.content });
                    }}
                  >
                    {' '}
                    Edit Image?{' '}
                  </span>
                </label>
                <input
                  type='file'
                  className='form-control-file text-primary custom-file-input'
                  id='itemImage'
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
                        document.getElementById('itemImage').click()
                      }
                    >
                      File <FiUpload />
                    </div>
                    <div
                      id='input1-name-text'
                      className='text-primary fs-italic'
                    >
                      {itemImage ? itemImage.name : '*No File...'}
                    </div>
                  </div>
                  {itemImage ? (
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
                        onClick={() => setItemImage(null)}
                      />{' '}
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          ) : (
            <div
              className='text-center mb-2'
              onClick={() => {
                setIsChangingImage(!isChangingImage);
                setItemImage({ name: compareSettings.content });
              }}
            >
              <label htmlFor='isChangingImage' className='form-label'>
                <input
                  type='checkbox'
                  checked={isChangingImage}
                  className={`${isChangingImage ? 'create-edit-label' : ''}`}
                  onChange={() => {
                    setItemImage({ name: compareSettings.content });
                    setIsChangingImage(!isChangingImage);
                  }}
                ></input>{' '}
                <span className='text-primary'> Edit Image? </span>
              </label>
            </div>
          )}
        </form>
      </div>
      <div className='d-flex justify-content-around mt-2'>
        <button
          disabled={!isValidToSubmit}
          type='submit'
          id='create-submit'
          className='btn'
          style={{
            textDecoration: 'none',
            width: '30vw',
            maxWidth: '120px',
          }}
        >
          Submit
        </button>
        <Link to='/story-item'>
          <button
            className='btn'
            id='create-cancel'
            style={{
              textDecoration: 'none',
              width: '30vw',
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

export default EditStoryItem;
