import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Image from 'react-bootstrap/Image';
import { FiEdit, FiTrash, FiPower } from 'react-icons/fi';
import { useConfirmation } from '../ConfirmationContext.js';
import { useActiveTab } from '../ActiveTabContext';
import '../CSS/table.css';

const TopSecretList = () => {
  const { showConfirmation } = useConfirmation();
  const { activeTab, setTab } = useActiveTab();
  const [allItems, setAllItems] = useState([]);
  const [tempActiveCheck, setTempActiveCheck] = useState(true);

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

  const fetchData = () => {
    // axios GET list of secretItems
    const allSecretItems = [
      {
        id: '032',
        isActive: true,
        secretTitle: 'Bad Boi',
        secretContent: '1mK_YCf_A01PEEuWfPU6kMOQp0X0SUr9R',
        secretDescription:
          'This boi is ungood; perhaps the worst trade deal in the history of trade deals ',
        created_at: '17:01 22 SEP 2023',
        updated_at: '17:23 22 SEP 2023',
      },
      {
        id: '034',
        isActive: true,
        secretTitle: 'Bad Boi - again',
        secretContent: '1mK_YCf_A01PEEuWfPU6kMOQp0X0SUr9R',
        secretDescription:
          'This boi is still ungood; very likely the worst trade deal in the history of trade deals ',

        created_at: '17:07 22 SEP 2023',
        updated_at: '17:07 22 SEP 2023',
      },
      {
        id: '036',
        isActive: true,
        secretTitle: 'Bad Boi - again again',
        secretContent: '1mK_YCf_A01PEEuWfPU6kMOQp0X0SUr9R',
        secretDescription:
          'This boi is a full-on baddy; certainly the worst trade deal in the history of trade deals, ever',

        created_at: '17:01 24 SEP 2023',
        updated_at: '09:56 25 SEP 2023',
      },
    ];
    setAllItems(allSecretItems);
  };

  const handleConf = () => {
    console.log('conf secret');
  };

  useEffect(() => {
    requestFullScreen();
    setTab('top-secret-list');
    fetchData();
  }, []);

  return (
    <div className='container text-center'>
      <h1 className='header-text text-center'>Secret Items:</h1>
      <div
        className='d-flex justify-content-around'
        style={{ marginBottom: '15px' }}
      >
        <div></div>
        <Link to={'/top-secret-create'}>
          <button
            className='btn btn-primary'
            style={{ width: '35vw', maxWidth: '150px' }}
          >
            Create
          </button>
        </Link>
        <Link
          to={''}
          onClick={() => {
            showConfirmation(
              'Are you sure you want to Clear the Top Secret Data Table?',
              () => handleConf(),
              `clearSecret`
            );
          }}
        >
          <button
            className='btn btn-danger'
            style={{ width: '35vw', maxWidth: '150px' }}
          >
            Clear
          </button>
        </Link>
        <div></div>
      </div>
      <div className='table-container'>
        <Table id='customTable'>
          <thead
            className='my-nav-font-color text-uppercase'
            style={{ whiteSpace: 'nowrap' }}
          >
            <tr className='border-table'>
              <th style={{ width: '80px', paddingLeft: '15px' }}>Actions</th>
              <th>ID#</th>
              <th>Name</th>
              <th>Description</th>
              <th>Content</th>
              <th>Time Created</th>
              <th>Last Updated</th>
            </tr>
          </thead>
          <tbody className='text-black'>
            {allItems.map((_, index) => (
              <tr className='border-table' key={index}>
                <td className='start d-flex-column' style={{ width: '120px' }}>
                  <div>
                    <Link to={`/top-secret-edit/${allItems[index].id}`}>
                      <button
                        className='btn btn-secondary'
                        style={{ marginBottom: '2px' }}
                      >
                        <FiEdit size={24} />
                      </button>
                    </Link>
                  </div>
                  <div>
                    {allItems[index].isActive ? (
                      <button
                        className='btn btn-success vPowerOff'
                        style={{ margin: '2px 0px' }}
                        onClick={() => {
                          showConfirmation(
                            `Are you sure you want to deactivate Secret ID: ${allItems[index].id}?`,
                            () => handleConf(),
                            `secDeac${allItems[index].id}` //chand item isActive on confnotification file
                          );
                        }}
                      >
                        <FiPower size={24} />
                      </button>
                    ) : (
                      <button
                        className='btn vPowerOn'
                        style={{ margin: '2px 0px' }}
                        onClick={() => {
                          //setTempActiveCheck(!tempActiveCheck);
                          showConfirmation(
                            `Are you sure you want to activate Secret ID: ${allItems[index].id}?`,
                            () => handleConf(),
                            `secActi${allItems[index].id}`
                          );
                        }}
                      >
                        <FiPower size={24} />
                      </button>
                    )}
                  </div>
                  <div>
                    <button
                      className='btn btn-danger vRemove'
                      style={{ marginTop: '2px' }}
                      onClick={() => {
                        showConfirmation(
                          `Are you sure you want to delete Secret ID#: ${allItems[index].id}?`,
                          () => handleConf(),
                          `delSecr${allItems[index].id}`
                        );
                      }}
                    >
                      <FiTrash size={24} />
                    </button>
                  </div>
                </td>
                <td style={{ whiteSpace: 'nowrap' }}>{allItems[index].id}</td>
                <td style={{ whiteSpace: 'nowrap' }}>
                  {allItems[index].secretTitle}
                </td>
                <td className='text-start' style={{ minWidth: '200px' }}>
                  {allItems[index].secretDescription}
                </td>
                <td style={{ whiteSpace: 'nowrap' }}>
                  <Image
                    style={{ maxWidth: '300px', borderRadius: '6px' }}
                    src={`https://drive.google.com/uc?export=view&id=${allItems[index].secretContent}`}
                    alt={`${allItems[index].title}.jpg`}
                  />
                </td>
                <td style={{ whiteSpace: 'nowrap' }}>
                  {allItems[index].created_at}
                </td>
                <td style={{ whiteSpace: 'nowrap' }}>
                  {allItems[index].updated_at}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default TopSecretList;
