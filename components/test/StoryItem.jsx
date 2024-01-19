import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import { FiEdit, FiTrash } from 'react-icons/fi';
import { MdOutlineQrCode2 } from "react-icons/md";
import { useActiveTab } from '../ActiveTabContext';
import { useConfirmation } from '../ConfirmationContext.js';
import '../CSS/table.css';

const StoryItem = () => {
  const { showConfirmation } = useConfirmation();
  const { activeTab, setTab } = useActiveTab();

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

  const items = 
    [
        {
          id: '008',
          title: 'Plane Ticket',
          lookupCode: '4JD82N7W',
          description: 'This is a One-Way airline ticket adressed to LAX from BOS. The ticket is under the name of CHARACTER B and appears to be part of a set...',
          content: 'ticket.png',
          noteContent:
            'This plane ticket was a one-way ticket to LAX. It appears to have staple holes meaning perhaps paired with another ticket...',
        },
        {
          id: '015',
          title: 'Knife',
          lookupCode: '93MD8WN',
          description: 'This Knife was crafted with the sole purpose of fileting yellowfin saku; this may belong to a chef known for their Japanese cuisine...',
          content: 'knife.png',
          noteContent:
            'This bloodstained appears to be chefs knife, one likely used only in fine-dining restaurants based on the quality...',
        },
      ];

  const handleConf = () => {
    console.log("conf item")
  };

  useEffect(()=>{
    requestFullScreen();
    setTab('story-item');
  },[])

  return (
    <div className='container text-center'>
      <h1 className="header-text text-center">Clue Items:</h1>
      <div
        className='d-flex justify-content-around'
        style={{ marginBottom: '15px' }}
      >
        <div></div>
        <Link to={'/create-story-item'}>
        
          <button className='btn btn-primary' style={{ width: '35vw', maxWidth: '150px' }}>
            Create
          </button>
        </Link>
        <Link 
          to={''}
          onClick={() => {
            showConfirmation(
              'Are you sure you want to Clear the Story/Item Data Table?',
              () => handleConf(),`clearItems`
            );
          }}
        >
          <button
            className='btn btn-danger'
            style={{ width: '35vw', maxWidth: '150px'}}
          >
            Clear
          </button>
        </Link>
        <div></div>
      </div>
      <div className='table-container my-custom-scroll-skinny'>
        <Table
          id='customTable'
          style={{ whiteSpace: 'nowrap' }}
        >
          <thead className='my-nav-font-color text-uppercase'>
            <tr className='border-table'>
              <th style={{ width: '80px', paddingLeft: '15px' }}>Actions</th>
              <th>ID#</th>
              <th>Name/Title</th>
              <th>Description</th>
              <th>Lookup Key</th>
              <th>Content</th>
              <th>Time Created</th>
              <th>Last Updated</th>
            </tr>
          </thead>
          <tbody className='text-black text-center'>
            {items.map((_, index) => (
              <tr className='border-table' key={index}>
                <td className='d-flex-column text-center' style={{ width: '120px' }}>
                  <div>
                    <Link to={`/story-item-edit/${items[index].id}`}>
                      <button
                        className='btn btn-secondary vView'
                        style={{ margin: '2px 0px' }}
                      >
                        <FiEdit size={24} />
                      </button>
                    </Link>
                  </div>
                  <div>
                    <button
                      className='btn btn-danger vRemove'
                      style={{ margin: '2px 0px' }}
                      onClick={() => {
                        showConfirmation(
                          `Are you sure you want to delete Story/Item ID#: ${items[index].id}?`,
                          () => handleConf(),`delItem${items[index].id}`
                        );
                      }}
                    >
                      <FiTrash size={24} />
                    </button>
                  </div>
                    <Link to={`/story-item/qr/${items[index].lookupCode}`}>
                      <button
                        className='btn btn-info vView'
                        style={{ margin: '2px 0px' }}
                      >
                        <MdOutlineQrCode2 style={{backgroundColor: 'white', margin: '-2px', borderRadius: '5px'}} size={28} />
                      </button>
                    </Link>
                  <div>
                  </div>
                </td>
                <td>{items[index].id}</td>
                <td>{items[index].title}</td>
                <td className='wrap-300-column'>{items[index].description}</td>
                <td>{items[index].lookupCode}</td>
                <td>{items[index].content}</td>
                <td>17:01 22 SEP 2023</td>
                <td>17:01 22 SEP 2023</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default StoryItem;
