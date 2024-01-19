// JournalLive.jsx
import React, { useState, useEffect } from 'react';
import {
  FiEye,
  FiStar,
  FiMaximize2,
  FiMinimize2,
  FiFileText,
  FiPlus,
  FiMinus,
} from 'react-icons/fi';
import { AiOutlineFileSearch } from 'react-icons/ai';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useActiveTab } from '../ActiveTabContext';
import Table from 'react-bootstrap/Table';
import '../CSS/Journal.css';

const JournalLive = () => {
  const navigate = useNavigate();
  const [content, setContent] = useState('');
  const [items, setItems] = useState([]);
  const [windowHeight, setWindowHeight] = useState(0);
  const { activeTab, setTab } = useActiveTab();
  const [position, setPosition] = useState('0');
  const { linkPosition } = useParams();
  const [liveHeight, setLiveHeight] = useState(`${(windowHeight - 180) / 2}px`);
  const [itemNotesHeight, setItemNotesHeight] = useState(
    `${(windowHeight - 180) / 2}px`
  );

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

  const adjustTextareaRows = () => {
    const textarea = document.getElementById('live');
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight+5}px`;
  };

  const fetchData = () => {
    return [
      {
        isFavorite: true,
        isExpanded: false,
        id: '008',
        title: 'Plane Ticket',
        lookupCode: '4JD82N7W',
        description:
          'This is a One-Way airline ticket adressed to LAX from BOS. The ticket is under the name of CHARACTER B and appears to be part of a set...',
        content: 'ticket',
        noteContent: 'My Note about this Plane Ticket...',
      },
      {
        isFavorite: false,
        isExpanded: false,
        id: '015',
        title: 'Knife',
        lookupCode: '93MD8WN',
        description:
          'This Knife was crafted with the sole purpose of fileting yellowfin saku; this may belong to a chef known for their Japanese cuisine...',
        content: 'knife',
        noteContent: 'My Note about this Knife...',
      },
    ];
  };

  useEffect(() => {
    updateDatabase(items);
  }, [items]);

  const updatePageScaling = pos => {
    if (pos === '0') {
      setTab('notes-landing');
      setPosition('0');
      setLiveHeight(`${(windowHeight - 190) / 2}px`);
      setItemNotesHeight(`${(windowHeight - 190) / 2}px`);
    } else if (pos === '1') {
      setTab('open-journal');
      setPosition('1');
      setLiveHeight(`${windowHeight - 210}px`);
      setItemNotesHeight('0px');
    } else if (pos === '2') {
      setTab('clue-notes');
      setPosition('2');
      setLiveHeight('0px');
      setItemNotesHeight(`${windowHeight - 210}px`);
    } else {
      console.log('position not properly set: ', pos);
    }
  };

  useEffect(() => {
    updatePageScaling(linkPosition);
  }, [liveHeight, itemNotesHeight, linkPosition]);

  useEffect(() => {
    updatePageScaling(position);
  }, [position, windowHeight]);

  const updateDatabase = updatedItems => {
    console.log('Updating database:', updatedItems);
    // Simulate updating the database using Axios
    // You would replace the following line with your actual Axios request to update the database
    // axios.put('/api/updateItems', updatedItems);
  };

  const toggleLike = index => {
    setItems(prevItems => {
      const updatedItems = [...prevItems];
      updatedItems[index].isFavorite = !prevItems[index].isFavorite;
      return updatedItems;
    });
  };

  const toggleExpand = index => {
    setItems(prevItems => {
      const updatedItems = [...prevItems];
      updatedItems[index].isExpanded = !prevItems[index].isExpanded;
      return updatedItems;
    });
  };

  useEffect(() => {
    requestFullScreen();
    setWindowHeight(window.innerHeight);

    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    const data = fetchData();
    setItems(data);
    updatePageScaling(linkPosition);

    const savedContent = localStorage.getItem('noteContent');
    if (savedContent) {
      setContent(savedContent);
    }

    setTimeout(() => {
      adjustTextareaRows();
    }, 50);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleContentChange = event => {
    adjustTextareaRows();
    const newContent = event.target.value;
    setContent(newContent);
    localStorage.setItem('noteContent', newContent);
  };

  return (
    <div className='container mt-0'>
      <div className='container container-header text-center d-flex justify-content-between' style={{border: '1px solid #303030', borderBottom: '1px solid #aaa'}}>
        <h2 className='header-text my-app-button-color-to-font text-center'>
          <FiFileText style={{ marginTop: '-3px' }} /> Quick Notes:
        </h2>
        {liveHeight === `${windowHeight - 210}px` ? (
          <FiMinimize2
            className='window-change'
            onClick={() => {
              updatePageScaling('0');
              navigate('/journal-live/0');
            }}
          />
        ) : (
          <FiMaximize2
            className='window-change'
            onClick={() => {
              if( liveHeight === `${(windowHeight - 190) / 2}px`){
                updatePageScaling('1');
                navigate('/journal-live/1');
              } else {
                updatePageScaling('0');
                navigate('/journal-live/0');
              }
            }}
          />
        )}
      </div>
      <div
        id='live-journal-container'
        className='my-custom-scroll'
        style={{ height: liveHeight, overflowY: 'auto', border: '1px solid #303030', borderTop: 'none' }}
      >
        <div className='paper'>
          <div className='ruled-lines'></div>
          <textarea
            placeholder='Privately write notes into this expanding textbox....'
            id='live'
            value={content}
            onChange={handleContentChange}
            className='form-control textarea-journal-live'
          />
        </div>
      </div>

      <div className='container container-header text-center d-flex justify-content-between mt-2' style={{border: '1px solid #303030', borderBottom: '1px solid #aaa'}}>
        <h2 className='header-text my-page-font-color'>
          <AiOutlineFileSearch style={{ marginTop: '-3px' }} /> Clue Notes:
        </h2>
        {itemNotesHeight === `${windowHeight - 210}px` ? (
          <FiMinimize2
            className='window-change'
            onClick={() => {
              updatePageScaling('0');
              navigate('/journal-live/0');
            }}
          />
        ) : (
          <FiMaximize2
            className='window-change'
            onClick={() => {
              if( liveHeight === `${(windowHeight - 190) / 2}px`){
                updatePageScaling('2');
                navigate('/journal-live/2');
              } else {
                updatePageScaling('0');
                navigate('/journal-live/0');
              }
            }}
          />
        )}
      </div>
      <div
        id='clue-notes-container'
        className='mt-0 my-custom-scroll'
        style={{ height: itemNotesHeight, overflowY: 'auto', border: '1px solid #303030', borderTop: 'none' }}
      >
        {items.map((_, index) => (
          <div key={index}>
          {items[index].isExpanded ? (
            <div key={index} className='table-container text-black'>
              <Table className='custom-table'>
                <thead className='customTableItems no-border'>
                  <tr className='text-uppercase'>
                    <th style={{ padding: '8px 15px' }}>
                      <div className='d-flex justify-content-between'>
                        <div style={{ paddingRight: '3px' }}>
                          <div onClick={() => toggleLike(index)}>
                            <FiStar
                              className={`star-fav text-${
                                items[index].isFavorite ? 'warning' : 'white'
                              }`}
                              style={{
                                fill: `${
                                  items[index].isFavorite ? '#ffc107' : 'white'
                                }`,
                              }}
                              size={20}
                            />
                          </div>
                        </div>
                        <div style={{ paddingRight: '15px', paddingTop: '1px' }}>
                          <Link
                            to={`/story-item-journal-view/${items[index].id}`} //to specific ID number
                            style={{ textDecoration: 'none', color: 'white' }}
                            className='linked-title'
                          >
                            {items[index].title}
                          </Link>
                        </div>
                        <div className='minimize-icon-div' style={{marginRight: '-3px'}}>
                          <div>
                            <FiMinus onClick={() => toggleExpand(index)} className='expand-icon fw-bold text-black' style={{paddingRight: '4px'}} size={22}/>
                          </div>
                        </div>
                      </div>
                    </th>
                  </tr>
                </thead>
                  <tbody>
                    <tr>
                      <td style={{ padding: '10px' }}>
                        <div className='d-flex align-items-center justify-content-center'>
                          <div
                            className='text-start text-black'
                            style={{
                              width: '80%',
                              paddingRight: '10px',
                              fontSize: '12pt',
                            }}
                          >
                            {items[index].noteContent}
                          </div>
                          <div style={{ width: '60px' }}>
                            <Link
                              to={`/story-item-journal-view/${items[index].id}`}
                              style={{ width: '95%' }}
                            >
                              <button
                                className='btn btn-info vView text-uppercase fw-bold'
                                style={{ marginBottom: '2px' }}
                              >
                                <FiEye size={22} />
                              </button>
                            </Link>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
              </Table>
            </div>) 
            : (
                <div className='mini-items'>
                  <div className='d-flex justify-content-between'>
                    <div style={{ padding: '1px 3px 0px 0px' }}>
                      <div onClick={() => toggleLike(index)}>
                        <FiStar
                          className={`star-fav text-${
                            items[index].isFavorite ? 'warning' : 'white'
                          }`}
                          style={{
                            fill: `${
                              items[index].isFavorite ? '#ffc107' : 'white'
                            }`,
                            paddingLeft: '3px',
                            paddingBottom: '1px',
                          }}
                          size={23}
                        />
                      </div>
                    </div>
                    <div style={{ paddingRight: '15px', paddingTop: '1px' }}>
                      <Link
                        to={`/story-item-journal-view/${items[index].id}`} //to specific ID number
                        style={{ textDecoration: 'none', color: 'white' }}
                        className='linked-title text-uppercase fw-bold'
                      >
                        {items[index].title}
                      </Link>
                    </div>
                    <div className='maximize-icon-div'>
                      <div>
                        <FiPlus onClick={() => toggleExpand(index)} className='expand-icon fw-bold text-white' style={{paddingRight: '4px'}} size={22}/>
                      </div>
                    </div>
                  </div>
                </div>
              ) 
          }
        </div>
        ))}
      </div>
    </div>
  );
};

export default JournalLive;