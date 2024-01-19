import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import { FiEdit, FiX, FiCheckCircle, FiEye } from 'react-icons/fi';
import { useActiveTab } from '../ActiveTabContext';
import { useConfirmation } from '../ConfirmationContext.js';
import { useUser } from '../UserContext.js';
import '../CSS/table.css';

const HelpMyRequests = () => {
  const { activeTab, setTab } = useActiveTab();
  const { showConfirmation } = useConfirmation();
  const [hide, setHide] = useState(false);
  const { user } = useUser();

  const [myRequests, setMyRequests] = useState([]);

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

  const fetchData = () => {
        return [
          {
            id: '071',
            isResolved: true,
            subject: 'Item Search',
            concern: 'What do I do when I have found an item?',
            resolution: 'You can scan the QR Code, or search the ID# to add the item to your inventory.'
          },
          {
            id: '072',
            isResolved: false,
            subject: 'QR Code',
            concern: 'I cannot scan this QR code to add an item I found to my list of evidence items. Please help!'
          },
          {
            id: '073',
            isResolved: false,
            subject: 'Killer Known',
            concern: 'What do I do, or who do I speak with once I believe I know who the killer is?'
          },
        ];
      };

  useEffect(() => {
    requestFullScreen();
    setTab('help-my-requests');
    const storedHide = localStorage.getItem('hideRequests');
    if (storedHide !== null) {
      setHide(JSON.parse(storedHide));
      if(JSON.parse(storedHide) === true || JSON.parse(storedHide) === 'true'){
        setMyRequests(fetchData().filter(request => request.isResolved === false))
      } else {
        setMyRequests(fetchData());
      }
    } else {
      setMyRequests(fetchData());
    }
  }, []);


  const performDeletion = () => {
    // Replace this with your actual deletion logic
    // For now, here's a placeholder string
    console.log('Performing deletion logic...');
    console.log('Deleted item with ID: deletionLogicPlaceHolder');
  };

  const handleConfirm = () => {
    // Handle the confirmation (e.g., perform the deletion)
    performDeletion(); // Call the deletion logic function
    // Close the confirmation dialog (you can add this logic if needed)
  };

  const handleHide = () => {
    const newHide = !hide;
    const newRequests = newHide
      ? fetchData().filter(request => request.isResolved === false)
      : fetchData();

    setMyRequests(newRequests);
    setHide(newHide);

    localStorage.setItem('hideRequests', JSON.stringify(newHide));
  };

  return (
    <div className='container text-center'>
      <h1 className='header-text mb-2'>My Requests:</h1>
      <div onClick={() => handleHide()}>
        <input
          type="checkbox"
          style={{ marginRight: '5px' }}
          checked={hide}
          onChange={() => handleHide()}
          className='hideCheck'
        />
        <label 
          className='my-page-font-color mb-2 hideCheck'
        > 
          Hide Resolved Requests 
        </label>
      </div>
      { myRequests.map((_,index) => (
        <div key={index} className='table-container'>
          <Table id='customTable'>
            {
              myRequests[index].isResolved
              ? (
                  <thead className='text-bg-success'>
                    <tr
                      className='text-uppercase'
                      style={{ whiteSpace: 'nowrap' }}
                    >
                      <th style={{width: '10%'}}></th>
                      <th style={{width: '75%'}} className='text-center'>{myRequests[index].subject}: closed</th>
                      <th style={{width: '10%'}}></th>
                    </tr>
                  </thead>
                ) : (
                  <thead className='text-bg-warning'>
                    <tr
                      className='text-uppercase'
                      style={{ whiteSpace: 'nowrap' }}
                    >
                      <th className='text-center' style={{ width: '10%'}}>
                        <Link to={`/request-edit/${myRequests[index].id}`}>
                          <button
                            className='btn btn-info vInfo'
                            style={{ borderRadius: '50%', height: '25px', width: '25px', marginLeft: '3px', border: 'solid 1px black' }}
                          >
                            <FiEdit style={{margin: '-13px 3px 2px -7px'}}/>
                          </button>
                        </Link>
                      </th>
                      <th className='text-center overflow-hidden-th' style={{ width: '75%'}}>{myRequests[index].subject.length > 10 ? (myRequests[index].subject.substring(0,8)+'...'):(myRequests[index].subject+':')} open</th>
                      <th style={{ width: '10%'}}>
                        <button
                          className='btn btn-danger vRemove'
                          style={{ borderRadius: '50%', height: '25px', width: '25px', marginRight: '3px', border: 'solid 1px black' }}
                          onClick={() => {
                            showConfirmation(
                              'Are you sure you want to DELETE this Request?',
                              () => handleConf(),`delRequ${myRequests[index].id}`
                            );
                          }}
                        >
                          <FiX style={{margin: '-13px 3px 1px -8px'}}/>
                        </button>
                      </th>
                    </tr>
                  </thead>
                    )
                  }
                  
              
            <tbody>
              <tr>
                <td style={{width: '10%'}}></td>
                <td style={{width: '75%'}} className='word-wrap-td text-stretch fw-bold'>
                  {myRequests[index].concern}
                </td>
                <td style={{width: '10%'}}></td>
              </tr>
              {
                myRequests[index].isResolved
                ? (<tr>
                    <td style={{width: '10%'}}></td>
                    <td className='italic' style={{width: '75%'}}>
                      {myRequests[index].resolution}
                    </td>
                    <td style={{width: '10%'}}></td>
                  </tr>)
                : (null)
              }
            </tbody>
          </Table>
        </div>
      ))}
    </div>
  );
};

export default HelpMyRequests;
