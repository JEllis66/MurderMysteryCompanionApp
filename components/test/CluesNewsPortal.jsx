import { React, useEffect } from 'react';
import { useActiveTab } from '../ActiveTabContext';
import { Link } from 'react-router-dom';
import { FiPackage, FiLock, FiBell } from 'react-icons/fi';
import { useAlert } from '../AlertContext.js';
import '../CSS/info-popup.css';

const CluesNewsPortal = () => {
  const { activeTab, setTab } = useActiveTab();
  const { showAlert } = useAlert();

  const handleConf = () =>{
    console.log("Closing alert.")
  }

  const showChange = input => {
    if (input === 'how') {
      showAlert(
        `Welcome to the "Clues & News Portal" where you can create/edit Clues, Secret Clues, and News Articles!`, 
        () => handleConf(),``
      );
    } else if (input === 'clues') {
      showAlert(
        `The "Clue Items" Page is used to manage the normal clue items.`, 
        () => handleConf(),``
      );
    } else if (input === 'secret') {
      showAlert(
        `The "Classified" Page is used to manage the classified/secret clue items.`, 
        () => handleConf(),``
      );
    } else {
      showAlert(
        `The "News" Page is used to manage news articles.`, 
        () => handleConf(),``
      );
    }
  };

  useEffect(() => {
    setTab('clues-news');
  }, [activeTab]);

  return (
    <div className='container justify-content-center'>
      <div className='pb-2'>
        <h1 className="header-text text-center">Clue & News Portal:</h1>
      </div>

      <div
        className='info-container container pt-2 my-custom-scroll'
        style={{ 
          overflowY: 'auto', 
          padding: '0px 10px', 
          height: '65vh',
          marginTop: '-15px' 
        }}
      >
        <div className='info-popup-mini mt-4' id='clues-news-welcome'>
            <div className='info-header pb-2' style={{ cursor: 'default'}}>
              <h3 className='text-black pt-3'>Clues & News</h3>
              <div className='info-icon' onClick={() => showChange('how')}>i</div>
            </div>
          </div>

          <div className='info-popup-mini mt-1' id='clue-manager'>
            <div className='info-header pb-2' style={{cursor: 'default'}}>
              <Link style={{ textDecoration: 'none', cursor: 'pointer' }} to={'/story-item'}>
                <h3 className='text-primary pt-3'><FiPackage style={{padding: '5px', marginTop: '-4px', backgroundColor: 'rgba(0,0,0,0.1)', borderRadius: '5px'}} size={28}/> <u>Clue Items:</u></h3>
              </Link>
              <div className='info-icon' onClick={() => showChange('clues')}>i</div>
            </div>
          </div>

          <div className='info-popup-mini mt-1' id='classified-manager'>
            <div className='info-header pb-2' style={{cursor: 'default'}}>
              <Link style={{ textDecoration: 'none', cursor: 'pointer' }} to={'/top-secret-list'}>
                <h3 className='text-primary text-center pt-3'><FiLock style={{padding: '5px', marginTop: '-4px', backgroundColor: 'rgba(0,0,0,0.1)', borderRadius: '5px'}} size={28}/> <u>Classified:</u></h3>
              </Link>
              <div className='info-icon' onClick={() => showChange('secret')}>i</div>
            </div>
          </div>

          <div className='info-popup-mini mt-1' id='news-list'>
            <div className='info-header pb-2' style={{cursor: 'default'}}>
              <Link style={{ textDecoration: 'none', cursor: 'pointer' }} to={'/news-list'}>
                <h3 className='text-primary text-center pt-3'><FiBell style={{padding: '5px', marginTop: '-4px', backgroundColor: 'rgba(0,0,0,0.1)', borderRadius: '5px'}} size={28} /> <u>News:</u></h3>
              </Link>
              <div className='info-icon' onClick={() => showChange('news')}>i</div>
            </div>
          </div>

      </div>
    </div>
  );
};

export default CluesNewsPortal;
