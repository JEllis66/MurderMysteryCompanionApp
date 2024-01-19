import React, { useEffect, useState } from 'react';
import { FiEye, FiBookOpen, FiStar, FiShare2 } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import { useActiveTab } from '../ActiveTabContext';
import { useConfirmation } from '../ConfirmationContext.js';
import { useUser } from '../UserContext.js';
import '../CSS/table.css';

const MyItems = () => {
  const { user } = useUser();
  const { activeTab, setTab } = useActiveTab();
  const { showConfirmation } = useConfirmation();
  const [items, setItems] = useState([]);

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
    setTab('my-items');
    const fetchData = () => {
      return [
        {
          isFavorite: true,
          id: '008',
          title: 'Plane Ticket',
          lookupCode: '4JD82N7W',
          description: 'This is a One-Way airline ticket adressed to LAX from BOS. ',
          content: '1nWseEislGtQMyTDyDFkImfz3jQoGkdK7',
        },
        {
          isFavorite: false,
          id: '015',
          title: 'Knife',
          lookupCode: '93MD8WN',
          description: 'This Knife was crafted with the sole purpose of fileting yellowfin saku; this may belong to a chef known for their Japanese cuisine...',
          content: '1Q1ySuFVeZFtMIMuCRDm65xCiXlc74NPJ',
        },
        {
          isFavorite: false,
          id: '022',
          title: 'Mask',
          lookupCode: 'KTLS9SEJ',
          description: 'A mask worn by a suspect or something..?',
          content: '13j8hZDS2Oco2UkEGnroABGPSS5_NHIE3',
        }
      ];
    };

    const data = fetchData();
    setItems(data);
    // const fetchData = async () => {
    //   try {
    //     // Simulate fetching data from the server
    //     const response = await axios.get('/api/getPlayerNotes');
    //     setPlayerNotes(response.data);
    //   } catch (error) {
    //     console.error('Error fetching data:', error);
    //   }
    // };
  }, []); // Empty dependency array means this useEffect runs only once on mount

  useEffect(() => {
    // This useEffect will be triggered whenever Items changes
    updateDatabase(items);
  }, [items]);

  const updateDatabase = updatedItems => {
    console.log('Updating database:', updatedItems);
    // Simulate updating the database using Axios
    // You would replace the following line with your actual Axios request to update the database
    // axios.put('/api/updateItems', updatedItems);
  };

  const toggleLike = index => {
    // Use the callback form of setItems to ensure that the state has been updated
    setItems(prevItems => {
      const updatedItems = [...prevItems];
      updatedItems[index].isFavorite = !prevItems[index].isFavorite;
      return updatedItems;
    });
  };

  return (
    <div className='container text-center'>
      <h1 className='header-text my-page-font-color mb-2'>My Clues:</h1>
      
      <div className='my-custom-scroll' style={{height: '68vh', overflowY: 'auto'}}>
        {items.map((_, index) => (
        <div key={index} className='table-container text-black'>
          <Table  className='custom-table'>
            <thead className='customTableItems'>
              <tr className='text-uppercase'>
                <th style={{ padding: '8px 15px' }}>{
                  <div>
                    <div className='d-flex justify-content-between'>
                      <div style={{textDecoration: 'none', paddingRight: '3px'}}>
                        <div 
                          onClick={() => toggleLike(index)} 
                        >
                          <FiStar
                            className={`star-fav text-${items[index].isFavorite ? ('warning'):('white')}`}
                            style={{fill: `${items[index].isFavorite ? ('#ffc107'):('white')}`}}
                            size={20}
                          />
                        </div>
                      </div>
                      <div style={{paddingRight: '15px', paddingTop: '1px'}}>  
                        <Link
                          to={`/story-item-view/${items[index].id}`} //to specific ID number
                          style={{ textDecoration: 'none', color: 'white' }}
                          className='linked-title'
                        >
                          {items[index].title}
                        </Link>
                      </div>
                      <div></div>
                    </div>
                   </div>}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td
                  style={{ padding: '10px' }}
                >
                  <div className='d-flex align-items-center justify-content-center'>
                    <div 
                      className='text-start text-black' 
                      style={{
                        width: '80%', 
                        paddingRight: '10px',
                        fontSize: '12pt'
                      }}>
                      {items[index].description}
                    </div>
                    <div className='d-flex-column'>
                      <div style={{ width: '60px'}}>
                        <Link to={`/story-item-view/${items[index].id}`} style={{width: '95%'}}>
                          <button
                            className='btn btn-info vView text-uppercase fw-bold'
                            style={{ marginBottom: '2px' }}
                          >
                            <FiEye size={22} />
                          </button>
                        </Link>
                      </div>
                      <div style={{ width: '60px'}}>
                        <Link to={`/story-item/share/${items[index].lookupCode}`} style={{width: '95%'}}>
                          <button
                            className='btn btn-warning vEdit text-uppercase fw-bold'
                            style={{ marginTop: '2px' }}
                          >
                            <FiShare2 size={22} />
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
        ))}
      </div>
    </div>
  );
};

export default MyItems;
