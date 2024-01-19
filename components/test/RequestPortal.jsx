import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import { FiInfo, FiCheck } from 'react-icons/fi';
import { useConfirmation } from '../ConfirmationContext.js';
import { useActiveTab } from '../ActiveTabContext';
import '../CSS/table.css';

const RequestPortal = () => {
  const { showConfirmation } = useConfirmation();
  const [userRequests, setUserRequests] = useState([]);
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

  const handleConf = () => {
    console.log('Clear Request Table Prompt active');
  };

  const fetchData = () => {
    return [
      {
        id: '071',
        username: 'Daniel',
        isResolved: true,
        subject: 'Item Search',
        concern: 'What do I do when I have found an item?',
        resolution:
          'You can scan the QR Code, or search the ID# to add the item to your inventory.',
      },
      {
        id: '072',
        username: 'Jamie',
        isResolved: false,
        subject: 'QR Code',
        concern:
          'I cannot scan this QR code to add an item I found to my list of evidence items. Please help!',
        resolution: '',
      },
      {
        id: '073',
        username: 'Bob',
        isResolved: false,
        subject: 'Killer Known',
        concern:
          'What do I do, or who do I speak with once I believe I know who the killer is?',
        resolution: '',
      },
    ];
  };

  useEffect(() => {
    requestFullScreen();
    setTab('request-portal');
    setUserRequests(fetchData());
  }, []);

  return (
    <div className='container text-center'>
      <h1 className='header-text mb-3'>User Requests:</h1>
      <div className='d-flex-column justify-content-center'>
        <Link
          className='btn btn-danger mb-2'
          onClick={() => {
            showConfirmation(
              'Are you sure you want to Clear the Request Data Table?',
              () => handleConf(),
              'clearRequests'
            );
          }}
        >
          Clear Table
        </Link>
        <div
          className='table-container mt-1 my-custom-scroll'
          style={{ overflow: 'auto', height: '65vh' }}
        >
          <Table className='text-black' id='customTable'>
            <thead className='my-nav-font-color'>
              <tr>
                <th style={{ width: '10%', paddingLeft: '10px' }}>Review</th>
                <th style={{ width: '15%' }}>From</th>
                <th style={{ width: '75%' }}>Title</th>
              </tr>
            </thead>
            <tbody>
              {userRequests.map((_, index) => (
                <tr key={index}>
                  <td style={{ width: '10%', paddingLeft: '10px' }}>
                    <Link to={`/request-admin-view/${userRequests[index].id}`}>
                      <button
                        className='btn btn-info vView'
                        style={{ marginBottom: '2px' }}
                      >
                        <FiInfo size={32} style={{ color: 'black' }} />
                      </button>
                    </Link>
                    <Link to={''}>
                      <button
                        onClick={() => {
                          showConfirmation(
                            `Mark Request ID#: ${userRequests[index].id} as resolved?`,
                            () => handleConf(),
                            `resRequ${userRequests[index].id}`
                          );
                        }}
                        className='btn btn-success vAdd'
                        style={{ marginTop: '2px' }}
                      >
                        <FiCheck size={32} style={{ color: 'white' }} />
                      </button>
                    </Link>
                  </td>
                  <td className='text-danger fw-bold' style={{ width: '15%' }}>
                    {userRequests[index].username}
                  </td>
                  <td className='text-start' style={{ width: '75%' }}>
                    {userRequests[index].concern}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default RequestPortal;
