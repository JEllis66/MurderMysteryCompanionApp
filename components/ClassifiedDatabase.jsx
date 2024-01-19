import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Image from 'react-bootstrap/Image';
import { FiEye, FiStar } from 'react-icons/fi';
import '../CSS/table.css';

const ClassifiedDatabase = () => {
  const [visibleSecrets, setVisibleSecrets] = useState([]);
  

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
    const fetchData = () => {
      return [
        {
          id: '032',
          isFavorite: false,
          title: 'Bad Boi',
          content: '1mK_YCf_A01PEEuWfPU6kMOQp0X0SUr9R',
          description:
            'This boi is ungood; perhaps the worst trade deal in the history of trade deals ',
        },
        {
          id: '034',
          isFavorite: false,
          title: 'Bad Boi - again',
          content: '1mK_YCf_A01PEEuWfPU6kMOQp0X0SUr9R',
          description:
            'This boi is still ungood; very likely the worst trade deal in the history of trade deals ',
        },
        {
          id: '036',
          isFavorite: false,
          title: 'Bad Boi - again again',
          content: '1mK_YCf_A01PEEuWfPU6kMOQp0X0SUr9R',
          description:
            'This boi is a full-on baddy; certainly the worst trade deal in the history of trade deals, ever',
        },
      ];
    };

    const data = fetchData();
    setVisibleSecrets(data);
    
    // const fetchData = async () => {
    //   try {
    //     // Simulate fetching data from the server
    //     const response = await axios.get('/api/getVisibleSecrets');
    //     setVisibleSecrets(response.data);
    //   } catch (error) {
    //     console.error('Error fetching data:', error);
    //   }
    // };
  }, []); 

  useEffect(() => {
    // This useEffect will be triggered whenever visibleSecrets changes
    updateDatabase(visibleSecrets);
  }, [visibleSecrets]);

  const updateDatabase = updatedVisibleSecrets => {
    console.log('Updating database:', updatedVisibleSecrets);
    // Simulate updating the database using Axios
    // You would replace the following line with your actual Axios request to update the database
    // axios.put('/api/updateVisibleSecrets', updatedVisibleSecrets);
  };

  const toggleLike = index => {
    // Use the callback form of setPlayerNotes to ensure that the state has been updated
    setVisibleSecrets(prevVisibleSecrets => {
      const updatedVisibleSecrets = [...prevVisibleSecrets];
      updatedVisibleSecrets[index].isFavorite = !prevVisibleSecrets[index].isFavorite;
      return updatedVisibleSecrets;
    });
  };

  

  return (
    <div className='container text-center'>
      <h1 className='header-text text-center'>Top Secret Data:</h1>

      {visibleSecrets.map((_, index) => (
        <div
          key={index}
          className='table-container text-black'
          style={{ overflowY: 'auto' }}
        >
          <Table className='custom-table'>
            <thead className='customTableItems'>
              <tr className='text-uppercase'>
                <th style={{ padding: '8px 15px', backgroundColor: 'black' }}>
                  {
                    <div>
                      <div className='d-flex justify-content-between'>
                        <div
                          style={{
                            textDecoration: 'none',
                            paddingRight: '3px',
                          }}
                        >
                          <div onClick={() => toggleLike(index)}>
                            <FiStar
                              className={`star-fav text-${
                                visibleSecrets[index].isFavorite ? 'warning' : 'white'
                              }`}
                              style={{
                                fill: `${
                                  visibleSecrets[index].isFavorite ? '#ffc107' : 'white'
                                }`,
                              }}
                              size={20}
                            />
                          </div>
                        </div>
                        <div style={{ paddingRight: '15px' }}>
                          <Link
                            to={`/classified-view/${visibleSecrets[index].id}`} //to specific ID number
                            style={{ textDecoration: 'none', color: 'white' }}
                            id='linked-title'
                          >
                            {visibleSecrets[index].title}
                          </Link>
                        </div>
                        <div></div>
                      </div>
                    </div>
                  }
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: '10px' }}>
                  <div className='text-center d-flex-column justify-content-center'>
                    <Image
                      src={`https://drive.google.com/uc?export=view&id=${visibleSecrets[index].content}`}
                      style={{ width: '70vw', height: '30vh', borderRadius: '6px' }}
                      className='m-2'
                    />
                    <div className='d-flex align-items-center justify-content-center'>
                      <div
                        className='text-start text-black'
                        style={{
                          width: '80%',
                          paddingRight: '10px',
                          fontSize: '12pt',
                        }}
                      >
                        {visibleSecrets[index].description}
                      </div>
                      <div style={{ width: '60px' }}>
                        <Link to={`/classified-view/${visibleSecrets[index].id}`} style={{ width: '95%' }}>
                          <button
                            className='btn btn-info vView text-uppercase fw-bold'
                            style={{ marginBottom: '2px' }}
                          >
                            <FiEye size={22} />
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
  );
};

export default ClassifiedDatabase;
