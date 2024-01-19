import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import { FiEdit, FiTrash, FiBell, FiPower } from 'react-icons/fi';
import { useConfirmation } from '../ConfirmationContext.js';
import { useActiveTab } from '../ActiveTabContext';
import '../CSS/table.css';

const NewsList = () => {
  const { showConfirmation } = useConfirmation();
  const [allArticles, setAllArticles] = useState([]);
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

  const fetchData = () => {
    const data = [
      {
        id: "001",
        isActive: true,
        priority: 1,
        col_img_1: 'col_1_img.jpg',
        col_head_1: 'Header for Column One',
        col_1_text: 'Example Text is here for the first column. This will be the main content of this column.',
        col_img_2: 'col_2_img.jpg',
        col_head_2: 'Header for Column Two',
        col_2_text: 'Example Text is here for the second column. This will be the main content of this column.',
        col_img_3: 'col_3_img.jpg',
        col_head_3: 'Header for Column Three',
        col_3_text: 'Example Text is here for the third column. This will be the main content of this column.',
        date: 'Sunday, December 31st, 2023',
        created_at: '30 DEC 2023 14:44',
        updated_at: '30 DEC 2023 15:55'
      },
      {
        id: "002",
        isActive: false,
        priority: 1,
        col_img_1: 'Another_col_1_img.jpg',
        col_head_1: 'Another Header for Column One',
        col_1_text: 'Another Example Text is here for the first column. This will be the main content of this column.',
        col_img_2: 'Another_col_2_img.jpg',
        col_head_2: 'Another Header for Column Two',
        col_2_text: 'Another Example Text is here for the second column. This will be the main content of this column.',
        col_img_3: 'Another_col_3_img.jpg',
        col_head_3: 'Another Header for Column Three',
        col_3_text: 'Another Example Text is here for the third column. This will be the main content of this column.',
        date: 'Monday, January 1st, 2024',
        created_at: '30 DEC 2023 14:44',
        updated_at: '30 DEC 2023 15:55'
      },
    ]
    setAllArticles(data)
  }; 

  const notification = () => {
    console.log("NEWSLIST: trigger logic")
  };

  // Placeholder function for deletion logic
  const performNewsDeletion = () => {
    // Replace this with your actual deletion logic
    // For now, we'll use a placeholder string
    console.log('NEWSLIST: Performing deletion logic...');
  };

  const performNewsClear = () => {
    // Replace this with your actual deletion logic
    // For now, we'll use a placeholder string
    console.log('NEWSLIST: clear logic...');
  };

  useEffect(() => {
    requestFullScreen();
    fetchData();
    setTab('news-list');
  }, []);

  return (
    <div className='container'>
    <h1 className="header-text text-center">News Articles:</h1>
      <div
        className='d-flex justify-content-around'
        style={{ marginBottom: '15px' }}
      >
        <div></div>
        <Link to={'/news-create'}>
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
              'Are you sure you want to Clear the News Data Table?',
              () => performNewsClear(),'clearNews'
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
        <Table
          id='customTable'
          style={{
            overflowY: 'auto',
            height: 'calc(100% - 150px)',
          }}
        >
          <thead className='my-nav-font-color text-uppercase news-table text-center'>
            <tr className='border-table' style={{whiteSpace: 'nowrap'}}>
              <th style={{ width: '120px' }}>Actions</th>
              <th>ID#</th>
              <th>Col 1 Img</th>
              <th>Col 1 Head</th>
              <th className='word-wrap-td text-start' style={{minWidth:'200px'}}>Col 1 Text</th>
              <th>Col 2 Img</th>
              <th>Col 2 Head</th>
              <th className='word-wrap-td text-start' style={{minWidth:'200px'}}>Col 2 Text</th>
              <th>Col 3 Img</th>
              <th>Col 3 Head</th>
              <th className='word-wrap-td text-start' style={{minWidth:'200px'}}>Col 3 Text</th>
              <th>Date of Story</th>
              <th>Priority #</th>
              <th>Time Created</th>
              <th>Last Updated</th>
            </tr>
          </thead>
          <tbody>
            {allArticles.map((_, index) => (
              <tr key={index} className='border-table text-center'>
                <td className='d-flex-column text-center justify-content-center' style={{ width: '120px'}}>
                  <Link to={`/news-edit/${allArticles[index].id}`}>
                    <button
                      className='btn btn-secondary'
                      style={{ marginBottom: '2px' }}
                    >
                      <FiEdit size={24} />
                    </button>
                  </Link>
                  { !allArticles[index].isActive ? (
                    <button
                      className='btn btn-warning vEdit'
                      style={{ margin: '2px' }}
                      onClick={() => {
                        showConfirmation(
                          `Are you sure you want to Activate & Trigger Notification for Article ID #${allArticles[index].id}?`,
                          () => notification(), `trigNew${allArticles[index].id}`
                      );
                      }}
                      >
                        <FiBell size={24} />
                      </button> )
                    : (
                      <button
                      className='btn btn-success vPowerOff'
                      style={{ margin: '2px' }}
                      onClick={() => {
                        //setTempActiveCheck(!tempActiveCheck);
                        showConfirmation(
                          `Are you sure you want to deactivate News ID: ${allArticles[index].id}?`,
                          () => handleConf(),
                          `offNews${allArticles[index].id}`
                        );
                      }}
                    >
                      <FiPower size={24} />
                    </button>
                    )

                  }
                  <button
                    className='btn btn-danger vRemove'
                    style={{ marginTop: '2px' }}
                    onClick={() => {
                      showConfirmation(
                        `Are you sure you want to delete News Article ID#:${allArticles[index].id}?`, //add string variable for title of article or perhaps id
                        () => performNewsDeletion(),`delNews${allArticles[index].id}`
                      );
                    }}
                  >
                    <FiTrash size={24} />
                  </button>
                </td>
                <td> {allArticles[index].id} </td>
                <td style={{whiteSpace: 'nowrap'}}>{allArticles[index].col_img_1}</td>
                <td style={{whiteSpace: 'nowrap'}}>{allArticles[index].col_head_1}</td>
                <td className='word-wrap-td text-start' style={{minWidth:'200px'}}>{allArticles[index].col_1_text}</td>
                <td style={{whiteSpace: 'nowrap'}}>{allArticles[index].col_img_2}</td>
                <td style={{whiteSpace: 'nowrap'}}>{allArticles[index].col_head_2}</td>
                <td className='word-wrap-td text-start' style={{minWidth:'200px'}}>{allArticles[index].col_2_text}</td>
                <td style={{whiteSpace: 'nowrap'}}>{allArticles[index].col_img_3}</td>
                <td style={{whiteSpace: 'nowrap'}}>{allArticles[index].col_head_3}</td>
                <td className='word-wrap-td text-start' style={{minWidth:'200px'}}>{allArticles[index].col_3_text}</td>
                <td style={{whiteSpace: 'nowrap'}}>{allArticles[index].date}</td>
                <td style={{whiteSpace: 'nowrap'}}>{allArticles[index].priority}</td>
                <td style={{whiteSpace: 'nowrap'}}>{allArticles[index].created_at}</td>
                <td style={{whiteSpace: 'nowrap'}}>{allArticles[index].updated_at}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default NewsList;
