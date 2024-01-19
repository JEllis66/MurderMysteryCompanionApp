import React, { useState, useEffect } from 'react';
import Image from 'react-bootstrap/Image';
import Table from 'react-bootstrap/Table';
import QrReader from 'react-qr-reader';
import { Link } from 'react-router-dom';
import { FiSend, FiCamera, FiPlus, FiEye } from 'react-icons/fi';
import { useActiveTab } from '../ActiveTabContext';
import { useUser } from '../UserContext.js';
import '../CSS/table.css';

const SearchDB = () => {
  const [search, setSearch] = useState('');
  const [showCamera, setShowCamera] = useState(false);
  const [isLandscape, setIsLandscape] = useState(false);
  const [searchResultsArray, setSearchResultsArray] = useState([]);
  const [lastSearch, setLastSearch] = useState('');

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

  const { setTab } = useActiveTab();
  const { user } = useUser();

  const handleScan = data => {
    if (data) {
      setSearch(data);
      searchDatabase(data);
      setShowCamera(false);
    }
  };

  const handleError = error => {
    console.error('Error scanning barcode:', error);
  };

  const updateGridLayout = () => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    setIsLandscape(vw > vh);
  };

  const fetchData = () => {
    // Simulate a delay to mimic the time it takes to fetch data from a real database
    return new Promise((resolve) => {
    setTimeout(() => {
      const result = [
        {
          id: '008',
          title: 'Plane Ticket',
          lookupCode: '4JD82N7W',
          searchWord1: 'TICKET',
          searchWord2: 'PLANE',
          searchWord3: 'ITEM',
          content: '17SVl6T3hSSyNeZhMmdo80YOvujwXRRAC',
        },
        {
          id: '015',
          title: 'Knife',
          lookupCode: '93MD8WN',
          searchWord1: 'KNIFE',
          searchWord2: 'BLOODY',
          searchWord3: 'ITEM',
          content: '1CQ7-BcKgO6xhKMpEnKLBYrP77QQ8neKO',
        },
        {
          id: '022',
          title: 'Mask',
          lookupCode: 'KTLS9SEJ',
          searchWord1: 'MASK',
          searchWord2: 'BLOODY',
          searchWord3: 'ITEM',
          content: '1s8LmlE_Z5UVAqQ9PUeOiVQsz3Dar7lmM',
        },
      ];
      resolve(result);
    }, 100);
  });
};

  useEffect(() => {
    updateGridLayout();
    requestFullScreen();
    setTab('browse-database');
    window.addEventListener('resize', updateGridLayout);

    const storedSearch = (localStorage.getItem('storedSearch') || '').toUpperCase();
    setSearch(storedSearch);

    const storedLastSearch = (localStorage.getItem('lastSearch') || '').toUpperCase();
    setLastSearch(storedLastSearch);

    const storedResults = localStorage.getItem('storedResults');

    if (storedResults) {
      const parsedResults = JSON.parse(storedResults);
      console.log('Parsed Results from localStorage:', parsedResults);
      setSearchResultsArray(parsedResults);
      console.log('Using stored search results.');
    } else {
      console.log('No stored results found.');
      if (storedSearch) {
        searchDatabase(storedSearch);
      } else {
        fetchData().then((result) => {
          setSearchResultsArray([]);
          console.log('Item database search complete.');
        });
      }
    }

    return () => {
      window.removeEventListener('resize', updateGridLayout);
    };
  }, []);

  const searchDatabase = (inputValue) => {
  fetchData().then((result) => {
    const matchingItemsCode = result.filter(item => item.lookupCode === inputValue.toUpperCase());
    const matchingItemsWord1 = result.filter(item => item.searchWord1 === inputValue.toUpperCase());
    const matchingItemsWord2 = result.filter(item => item.searchWord2 === inputValue.toUpperCase());
    const matchingItemsWord3 = result.filter(item => item.searchWord3 === inputValue.toUpperCase());
    // Combine arrays into a single array
    const matchingItems = [
      ...matchingItemsCode,
      ...matchingItemsWord1,
      ...matchingItemsWord2,
      ...matchingItemsWord3,
    ];
    setSearchResultsArray(matchingItems);
  });
};

  const handleSearchChange = (e) => {
    const storedSearch = e.target.value.toUpperCase();
    setSearch(storedSearch);
    localStorage.setItem('storedSearch', storedSearch);
  };

  const handleSearchHistory = () => {
    setLastSearch(search.toUpperCase());
    localStorage.setItem('lastSearch', search.toUpperCase());
  };

  useEffect(() => {
    console.log('updating search results', searchResultsArray);
  }, [searchResultsArray]);

  return (
    <div className='container text-center align-center'>
      <div className='create-character-container d-flex-column justify-content-center mb-0'>
        <form
          id='searchForm'
          style={{ width: isLandscape ? '600px' : '90%' }}
          onSubmit={e => {
            e.preventDefault();
            searchDatabase(search);
            handleSearchHistory();
            setShowCamera(false);
          }}
        >
          <div
            className='form-group'
            style={{ textAlign: 'center', position: 'relative' }}
          >
            <label htmlFor='search' className='header-text mb-1'>
              Clue Search:
            </label>
            <div className='input-group'>
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '5%',
                  transform: 'translateY(-50%)',
                  cursor: 'pointer',
                }}
                onClick={() => setShowCamera(!showCamera)}
              >
                <FiCamera className='my-app-button-color-to-font' size={isLandscape ? '6vh' : '4.1vh'} />
              </div>
              <input
                type='text'
                id='searchInput'
                name='search'
                placeholder='type here'
                className='form-input-password text-center'
                value={search}
                onChange={handleSearchChange}
                style={{
                  fontSize: isLandscape ? '6vh' : '4.1vh',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  right: '5%',
                  transform: 'translateY(-50%)',
                  cursor: 'pointer',
                }}
              >
                <button type='submit' style={{ background: 'none', border: 'none' }}>
                  <FiSend className='my-app-button-color-to-font' size={isLandscape ? '6vh' : '4.1vh'} />
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
      {showCamera && (
        <div className='camera-container my-3 mx-2'>
          <QrReader
            delay={150}
            onError={handleError}
            onScan={handleScan}
            style={{ width: '100%' }}
          />
        </div>
      )}
      <h2 className={`header-text mb-2`}>SEARCH RESULTS:</h2>

      <div className='text-center my-custom-scroll' style={{ height: '50vh', overflowY: 'auto' }}>
        {searchResultsArray.length < 1 ? (
          <div className='table-container'>
            <p className='my-page-font-color italic mt-4'>
              No Items match: "<span className='text-info text-uppercase'>{lastSearch}</span>"
            </p>
            <p className='my-page-font-color italic' style={{ marginTop: '-10px' }}>
              {' '}
              Please check your search for a possible error.{' '}
            </p>
          </div>
        ) : null}
        {searchResultsArray.map((item, index) => (
          <div key={index} className='table-container'>
            <Table className='text-white' id='customTable'>
              <thead className='text-uppercase' id='customTableItems'>
                <tr style={{ whiteSpace: 'nowrap' }}>
                  <th style={{ width: '25%' }}>
                    <Link 
                      to={`/story-item-search-view/${item.id}`}
                      className='linked-title-search'
                    >
                      {item.title}
                    </Link>
                  </th>
                </tr>
              </thead>
              <tbody className='text-black'>
                <tr>
                  <td>
                    <Link 
                      to={`/story-item-search-view/${item.id}`}
                      style={{textDecoration: 'none'}}
                    >
                      <Image
                        src={`https://drive.google.com/uc?export=view&id=${item.content}`}
                        alt={`${item.title}.jpg`}   
                        style={{ maxWidth: '70vw', maxHeight: '25vh', borderRadius: '6px' }} 
                      />
                    </Link>
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchDB;
