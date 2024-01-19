import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiRefreshCw, FiUpload, FiX } from 'react-icons/fi';
// import axios from 'axios';
import '../CSS/Create.css';

const CreateStoryItem = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [lookupKey, setLookupKey] = useState('');
  const [itemImage, setItemImage] = useState(null);
  const [imageObject, setImageObject] = useState(null);
  const [searchWord1, setSearchWord1] = useState('');
  const [searchWord2, setSearchWord2] = useState('');
  const [searchWord3, setSearchWord3] = useState('');
  const [clueExists, setClueExists] = useState(false);
  const [murderItem, setMurderItem] = useState('');
  const [allItems, setAllItems] = useState([]);
  const [linkedItemList, setLinkedItemList] = useState([]);
  const [isValidToSubmit, setIsValidToSubmit] = useState(false);
  const [isThisLinked, setIsThisLinked] = useState(false);
  const [touchedFields, setTouchedFields] = useState({
    title: false,
    description: false,
    lookupKey: false,
    itemImage: false,
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

  const markFieldAsUntouched = fieldName => {
    setTouchedFields(prevTouchedFields => ({
      ...prevTouchedFields,
      [fieldName]: false,
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
    setLookupKey(codeRes);
  };

  const handleImageUpload = e => {
    e.preventDefault();
    const file = e.target.files[0];
    setImageObject(file);
    //upload imageObject to Drive
    const fileName = e.target.files[0].name;
    setItemImage({name: fileName});
    markFieldAsTouched('itemImage');
  };

  const checkValidation = () => {
    if (
      clueExists ||
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
      !itemImage || 
      itemImage === null || 
      itemImage === undefined
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

  useEffect(() => {
    checkValidation();
  }, [
    title,
    description,
    lookupKey,
    searchWord1,
    searchWord2,
    searchWord3,
    itemImage,
    isThisLinked,
    clueExists,
  ]);

  const handleSubmit = async e => {
    e.preventDefault();

    if (!isValidToSubmit) {
      return alert('Please review form fields and re-submit.');
    }

    // Check SQLmodel column names
    const storyItemData = {
      title,
      description,
      lookupKey,
      itemImage,
      searchWord1,
      searchWord2,
      searchWord3,
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
    // axios GET list of murderItems
    const murderItems = [
      {
        id: '002',
        linkedItem1: 'Knife',
        linkedItem2: 'Pistol',
        linkedItem3: 'Rifle',
      },
      {
        id: '003',
        linkedItem1: 'Poison',
        linkedItem2: 'Wrench',
        linkedItem3: 'Mask',
      },
      {
        id: '004',
        linkedItem1: 'Prop Wand',
        linkedItem2: 'Piano Wire',
        linkedItem3: 'Boot',
      },
    ];

    const linkedItemsArray = murderItems
      .map(item => [item.linkedItem1, item.linkedItem2, item.linkedItem3])
      .flat();

    // axios GET of current ClueItems
    const allClueItems = [
      {
        id: '008',
        title: 'Plane Ticket',
        lookupCode: '4JD82N7W',
        description:
          'This is a One-Way airline ticket addressed to LAX from BOS. ',
        content: '1nWseEislGtQMyTDyDFkImfz3jQoGkdK7',
      },
      {
        id: '015',
        title: 'Knife',
        lookupCode: '93MD8WN',
        description:
          'This Knife was crafted with the sole purpose of filleting yellowfin saku; this may belong to a chef known for their Japanese cuisine...',
        content: '1Q1ySuFVeZFtMIMuCRDm65xCiXlc74NPJ',
      },
      {
        id: '022',
        title: 'Mask',
        lookupCode: 'KTLS9SEJ',
        description: 'A mask worn by a suspect or something..?',
        content: '13j8hZDS2Oco2UkEGnroABGPSS5_NHIE3',
      },
    ];

    setAllItems(allClueItems);

    // Create a list of linked items whose names do not match any of the existing allClueItems titles
    const unmatchedLinkedItems = linkedItemsArray.filter(linkedItem => {
      return !allClueItems.some(clueItem => clueItem.title === linkedItem);
    });

    setLinkedItemList(unmatchedLinkedItems.sort());
  };

  useEffect(() => {
    if (!isThisLinked) {
      setTitle('');
      markFieldAsUntouched('title');
    }
  }, [isThisLinked]);

  useEffect(() => {
    const isTaken = allItems.map(item => item.title).includes(title);
    setClueExists(isTaken);
  }, [title]);

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
    fetchData();
  }, []);

  return (
    <div className='create-character-container'>
      <div>
        <h1 className='header-text' style={{ marginBottom: '-10px' }}>
          Create Clue Item
        </h1>
      </div>
      <div className='create-character-form' onClick={() => exitFullScreen()}>
        <form onSubmit={handleSubmit}>
          {isThisLinked ? (
            <div className='form-group'>
              <div
                className='text-center mb-2'
                onClick={() => setIsThisLinked(!isThisLinked)}
              >
                <label htmlFor='isThisLinked' className='form-label'>
                  <input
                    type='checkbox'
                    checked={isThisLinked}
                    className={`${isThisLinked ? 'create-edit-label' : ''}`}
                    onChange={() => setIsThisLinked(!isThisLinked)}
                  ></input>{' '}
                  <span className='text-primary'>Link this Clue Item? </span>
                </label>
              </div>
              <div className='d-flex-column'>
                <label className='create-edit-label' htmlFor='title'>
                  Clue Name
                </label>
                <select
                  id='title'
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className={`form-input-password`}
                  style={{ backgroundColor: 'white', height: '46px' }}
                >
                  <option disabled>-- Select --</option>
                  {linkedItemList.map(item => (
                    <React.Fragment key={item}>
                      <option value={item}>{item}</option>
                    </React.Fragment>
                  ))}
                </select>
              </div>
            </div>
          ) : (
            <div className='form-group'>
              <div
                className='text-center mb-2'
                onClick={() => {
                  setIsThisLinked(!isThisLinked);
                  setTitle(linkedItemList[0]);
                }}
              >
                <label htmlFor='isThisLinked' className='form-label'>
                  <input
                    type='checkbox'
                    checked={isThisLinked}
                    className={`${isThisLinked ? 'create-edit-label' : ''}`}
                    onChange={() => {
                      setIsThisLinked(!isThisLinked);
                      setTitle(linkedItemList[0]);
                    }}
                  ></input>{' '}
                  <span className='text-primary'>Link this Clue Item? </span>
                </label>
              </div>
              <label className='create-edit-label' htmlFor='title'>
                Clue Name
              </label>
              <div className='input-group'>
                <input
                  type='text'
                  id='title'
                  name='title'
                  placeholder="Enter your Clue's name..."
                  className={`form-input-password ${
                    touchedFields.title &&
                    (title.length < 2 || title.length > 64 || clueExists)
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
              {touchedFields.title &&
                (title.length < 2 || title.length > 64) && (
                  <div>
                    <p className='form-error-message'>
                      *Title must be 2-64 characters in length!
                    </p>
                  </div>
                )}
              {touchedFields.title && clueExists && (
                <div>
                  <p className='form-error-message'>*Clue name is already taken!</p>
                </div>
              )}
            </div>
          )}

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
                onClick={getRandomCode}
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

          <div className='text-start mb-3'>
            <label className='create-edit-label' htmlFor='itemImage'>
              Upload Image
            </label>
            <input
              type='file'
              className='form-control-file text-primary custom-file-input'
              id='itemImage'
              accept='image/*'
              style={{ display: 'none' }}
              onChange={handleImageUpload}
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
                <div id='input1-name-text' className='text-primary fs-italic'>
                  {itemImage
                    ? itemImage.name
                    : '*No File...'}
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

export default CreateStoryItem;
