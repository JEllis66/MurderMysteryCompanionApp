import React, { useEffect, useState } from 'react';
import { FiArrowLeft, FiCheck, FiTrash } from 'react-icons/fi';
import { Link, useParams } from 'react-router-dom';
import { useConfirmation } from '../ConfirmationContext.js';
import '../CSS/Login.css';

const RequestAdminView = () => {
  const { id } = useParams();
  const { showConfirmation } = useConfirmation();
  const [isLoaded, setIsLoaded] = useState(false);
  const [thisRequest, setThisRequest] = useState({});

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
 

  const handleConf = () => {
    console.log("requestDel");
  };

  const fetchData = num => {
    const data = [
      {
        id: '071',
        username: 'Daniel',
        realName: 'Dan',
        isResolved: true,
        subject: 'Item Search',
        concern: 'What do I do when I have found an item?',
        resolution:
          'You can scan the QR Code, or search the ID# to add the item to your inventory.',
        created_at: '13 Jan 2024 17:22'
      },
      {
        id: '072',
        username: 'Jamie',
        realName: 'James',
        isResolved: false,
        subject: 'QR Code',
        concern:
          'I cannot scan this QR code to add an item I found to my list of evidence items. Please help!',
        resolution: '',
        created_at: '13 Jan 2024 16:56'
      },
      {
        id: '073',
        username: 'Bob',
        realName: 'Robert',
        isResolved: false,
        subject: 'Killer Known',
        concern:
          'What do I do, or who do I speak with once I believe I know who the killer is?',
        resolution: '',
        created_at: '13 Jan 2024 18:08:01'
      },
    ];
    const requestOfInterest = data.find(request => request.id === id);
    setThisRequest(requestOfInterest || null);
  };

  useEffect(()=>{
    if (thisRequest){
      setIsLoaded(true);
    }
  },[thisRequest])

  useEffect(()=>{
    requestFullScreen();
    fetchData(id);
  },[])

  if (!isLoaded) {
    return (
      <div className='loading-container'>
        <div className='loading-circle'></div>
        <div className='loading-circle'></div>
        <div className='loading-circle'></div>
      </div>
    );
  }

  return (
    <div
      className='container'
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: 'calc(90vh - 75px)',
      }}
    >
      <h1 className='big-header-text text-center mb-1'>{thisRequest.username[thisRequest.username.length - 1] === 's' ? `${thisRequest.username+"'"}` : `${thisRequest.username+"'s"}`} Request</h1>
      <div className='mt-4' id='top' style={{ flex: '1', overflowY: 'auto' }}>
        <div className='d-flex-column justify-content-start'>
        <h3 className='my-page-font-color'><span className='my-nav-lighter-font' >Subject:</span>{' '}{thisRequest.subject}</h3>
          <h3 className='my-page-font-color'><span className='my-nav-lighter-font' >Concern:</span> {thisRequest.concern}</h3>
        </div>
      </div>
      <div id='bottom'>
        <div
          className='text-secondary d-flex-column text-center justify-content-center'
          style={{ fontStyle: 'italic' }}
        >
          <p className='mx-2 my-0'>Request By: {thisRequest.realName}</p>
          <p className='mx-2 mb-2'>Created At: {thisRequest.created_at}</p>
        </div>
        <div className='d-flex justify-content-around'>
          <div></div>
          <Link className='text-center' to={'/request-portal'} style={{ width: '30%' }}>
            <button className='btn btn-secondary' style={{ width: '90%' }}>
              <FiArrowLeft size={22}/>
            </button>
          </Link>
          <Link className='text-center' to={''} style={{ width: '30%' }}>
            <button 
              className='btn btn-success' style={{ width: '90%' }}
              onClick={() => {
                showConfirmation(
                  `Mark Request ID#: ${thisRequest.id} as resolved?`,
                  () => handleConf(),`resRequ${thisRequest.id}`
                );
              }}
            >
              <FiCheck size={22}/>
            </button>
          </Link>
          <Link className='text-center' to={''} style={{ width: '30%' }}>
            <button
              className='btn btn-danger' style={{ width: '90%' }}
              onClick={() => {
                showConfirmation(
                  `Are you sure you want to delete Request ID#: ${request.id}?`,
                  () => handleConf(),`delRequ${request.id}`
                );
              }}
            >
              <FiTrash size={22}/>
            </button>
          </Link>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default RequestAdminView;
