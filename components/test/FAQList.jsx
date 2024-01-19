import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import { FiEdit, FiTrash } from 'react-icons/fi';
import { useConfirmation } from '../ConfirmationContext.js';
import { useActiveTab } from '../ActiveTabContext';
import '../CSS/table.css';

const FAQList = () => {
  const { showConfirmation } = useConfirmation();
  const { activeTab, setTab } = useActiveTab();
  const [faqs, setFaqs] = useState([]);

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
    const results = [
      {
        id: '009',
        question: 'How do I view the Breaking News?',
        answer: `Navigate to the 'Database' Page, and then view the '(Breaking) News' tab. Also, you may click the News notification that pops up once News is posted.`,
      },
      {
        id: '010',
        question: 'How do enter the Top Secret Section?',
        answer: `You must have security clearance in order to access this page. If you're having trouble connecting to this page, perhaps someone else knows something you don't...`,
      },
    ];
    setFaqs(results)
  }

  const handleConf = () => {
    console.log("conf faq")
  };

  useEffect(()=>{
    requestFullScreen();
    setTab('faq-list');
    fetchData();
  },[]);

  return (
    <div className='container text-center'>
      <h1 className='header-text mb-3'>FAQ List:</h1>
      <div
        className='d-flex justify-content-around'
        style={{ marginBottom: '15px' }}
      >
        <div></div>
        <Link to={'/faq-create'}>
          <button className='btn btn-primary' style={{ width: '35vw', maxWidth: '150px' }}>
            Create
          </button>
        </Link>
        <Link 
          to={''}
          onClick={() => {
            showConfirmation(
              'Are you sure you want to Clear the FAQ Data Table?',
              () => handleConf(),`clearFAQ`
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
      <div 
        className='table-container my-custom-scroll'
        style={{overflow: 'auto', height: '55vh',}}
      >
        <Table
          id='customTable'
          style={{ whiteSpace: 'nowrap' }}
        >
          <thead className='my-nav-font-color text-uppercase'>
            <tr className='border-table'>
              <th style={{ width: '80px', paddingLeft: '15px' }}>Actions</th>
              <th className='wrap-300-column text-center'>Question</th>
              <th className='wrap-300-column text-center'>Answer</th>
              <th>Time Created</th>
              <th>Last Updated</th>
            </tr>
          </thead>
          <tbody className='text-black'>
            {faqs.map((_, index) => (
              <tr className='border-table' key={index}>
                <td className='start' style={{ width: '120px' }}>
                  <div className='d-flex-column'>
                    <div><Link to={`/faq-edit/${faqs[index].id}`}>
                      <button
                        className='btn btn-secondary vView'
                      >
                        <FiEdit size={24} />
                      </button>
                    </Link></div>
                    <div><button
                      className='btn btn-danger vRemove mt-1'
                      onClick={() => {
                        showConfirmation(
                          `Are you sure you want to delete FAQ ID#: ${faqs[index].id}?`,
                          () => handleConf(),`delFAQs${faqs[index].id}`
                        );
                      }}
                    >
                      <FiTrash size={24} />
                    </button></div>
                  </div>
                </td>
                <td className='wrap-300-column'>{faqs[index].question}</td>
                <td className='wrap-300-column'>{faqs[index].answer}</td>
                <td>17:01 22 OCT 2023</td>
                <td>17:01 22 OCT 2023</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default FAQList;
