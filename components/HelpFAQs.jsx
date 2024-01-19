import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { useActiveTab } from '../ActiveTabContext';
import '../CSS/table.css';

const HelpFAQs = () => {
  const { activeTab, setTab } = useActiveTab();
  const [activeFAQs, setActiveFAQs] = useState([]);

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

  useEffect(() => {
    requestFullScreen();
    setTab('help-faqs');
    const fetchData = () => {
      return [
        {
          question: 'How do I view the Breaking News?',
          answer: `Navigate to the 'Database' Page, and then view the '(Breaking) News' tab. Also, you may click the News notification that pops up once News is posted.`,
        },
        {
          question: 'How do enter the Top Secret Section?',
          answer: `You must have security clearance in order to access this page. If you're having trouble connecting to this page, perhaps someone else knows something you don't...`,
        },
      ];
    };

    const data = fetchData();
    setActiveFAQs(data);
  }, []);

  return (
    <div className='container text-start'>
      <h1 className='text-center header-text mb-3'>
        FAQ'<span className='text-lowercase'>s:</span>
      </h1>
      <div className='table-container my-custom-scroll' style={{ overflowY: 'auto', height: '70vh' }}>
        <Table
          id='customTable'
        >
          <thead>
            <tr
              className='my-nav-font-color text-center text-uppercase'
              style={{ whiteSpace: 'nowrap' }}
            >
              <th style={{ width: '40%', paddingLeft: '10px' }}>Question</th>
              <th style={{ width: '60%' }}>Answer</th>
            </tr>
          </thead>
          <tbody>
            {activeFAQs.map((faq, index) => (
              <tr key={index}>
                <td className='word-wrap-td text-start fw-bold' style={{ width: '40%', padding: '5px 10px' }}>
                  {faq.question}
                </td>
                <td
                  className='word-wrap-td text-start'
                  style={{ width: '60%', padding: '5px 10px' }}
                >
                  {faq.answer}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default HelpFAQs;