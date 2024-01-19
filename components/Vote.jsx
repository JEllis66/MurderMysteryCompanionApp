import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import { FiUpload } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useUser } from '../UserContext.js';

const Vote = props => {
  const [myVote, setMyVote] = useState('-- Select Candidate --');
  const [activePlayers, setActivePlayers] = useState([]);
  const [isValid, setIsValid] = useState(false);
  const [currentVote, setCurrentVote] = useState('');
  const { user } = useUser();

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

  const handleVote = e => {
    e.preventDefault();
    setCurrentVote(myVote);
    //write vote to database sql put myVote
    //include character name user.username
    console.log('Voting for: ', myVote);
    console.log('Voted By: ', user.username);
  };

  const checkValidity = () => {
    myVote !== '-- Select Candidate --' ? setIsValid(true) : setIsValid(false);
  };

  useEffect(() => {
    checkValidity();
  }, [myVote]);

  useEffect(() => {
    requestFullScreen();
    const fetchData = () => {
      setActivePlayers([
        'Jerry Lancaster',
        'Neon Styx',
        'Justice LaMont',
        'Bailey Eugene',
        'Ishana Lancaster-Dunbar',
        'Taylor Lancaster',
        'Punchy LaRue',
        'Donovan White',
        'Onyx Magnolia',
        'Ryan Powers',
        'Anette Chambers',
        'Baron Lancaster',
        'The Leiutenant',
      ]);
      //setPlayersVoteviaaxios
      setCurrentVote('');

    };
    fetchData();
  }, []);

  return (
    <div className='container text-center'>
      <div className='d-flex-column justify-content-center'>
        <form
          onSubmit={handleVote}
          className='px-1 py-3 home-login-form mt-0'
          style={{ maxWidth: '90vw', width: '80vw', marginTop: '-10vh' }}
        >
          <div
            className='form-group mb-2 text-center'
            style={{ padding: '0px 10px' }}
          >
            <label htmlFor='myVote'>
              <span className='create-edit-label text-uppercase' style={{ fontSize: '14pt' }}>
                Vote for Killer:
              </span>
            </label>
            <select
              type='select'
              id='myVote'
              name='myVote'
              placeholder='-- Select Candidate --'
              className='form-input-password'
              value={myVote}
              onChange={e => setMyVote(e.target.value)}
            >
              <option disabled>-- Select Candidate --</option>
              {activePlayers.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          <div className='d-flex justify-content-around my-2'>
            <div></div>
            <div style={{ width: '35vw' }}>
              <button
                type='submit'
                className='btn'
                disabled={!isValid}
                style={{ width: '95%' }}
                id={`${isValid ? 'create-submit' : 'invalid-vote'}`}
              >
                Vote <FiUpload />
              </button>
            </div>
            <Link to={`/dashboard`} style={{ width: '35vw' }}>
              <button
                id='create-cancel'
                className='btn'
                style={{ width: '95%' }}
              >
                Cancel
              </button>
            </Link>
            <div></div>
          </div>
        </form>
        {currentVote === '' ? null : (
          <div className='table-container'>
            <Table id='customTable' style={{ whiteSpace: 'nowrap' }}>
              <thead className='my-nav-font-color text-center text-uppercase'>
                <tr>
                  <th>Your Current Vote:</th>
                </tr>
              </thead>
              <tbody className='text-black text-center'>
                <tr>
                  <td className='text-uppercase fw-bold'>{currentVote}</td>
                </tr>
              </tbody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Vote;
