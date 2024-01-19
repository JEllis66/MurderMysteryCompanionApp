import React, {useEffect, useState} from 'react';
import { FiPackage } from 'react-icons/fi';
import { VscBook } from "react-icons/vsc";
import { useActiveTab } from '../ActiveTabContext';
import { Link, useParams } from 'react-router-dom';
import { useUser } from '../UserContext.js';

const SocialProfile = (props) => {

  const { id } = useParams();
  const { activeTab, setTab } = useActiveTab();
  const { user, realName } = useUser();
  const [ myCharacterData, setMyCharacterData ] = useState({});
  const [ murderVictim, setMurderVictim ] = useState('');

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
    setTab('my-profile');
    const fetchMurdData = () =>{
      //retrieve and set murder victim name
      return 'Jerry Lancaster'
    }
    const fetchData = () => {
      const murdVict = fetchMurdData();
      setMurderVictim(murdVict);
      //return char data
      const data = 
        {
          id: '007',
          name: `${user.username} (${realName})`,
          role: 'I am This Profession',
          relationship: `I first met ${murdVict} at this place doing this thing. I thought we would be friends forever.`,
          motive: `On this date, ${murdVict} made me angry because of a reason and that made me feel feelings. I cannot imagine doing this to someone personally. I would do anything to make them pay for their mistakes!`,
          backstory: 'I grew up in City, State where my hobbies were this and that. I always liked to do this particular thing that is odd but interesting! ',
        }
     ;
      
      setMyCharacterData(data);
    };

    fetchData();
    // const fetchData = async () => {
    //   try {
    //     // Simulate fetching data from the server
    //     const response = await axios.get('/api/getPlayerNotes');
    //     setPlayerNotes(response.data);
    //   } catch (error) {
    //     console.error('Error fetching data:', error);
    //   }
    // };
  }, []);

  useEffect(()=>{
    console.log("Character Data updated");
  }, [myCharacterData])

  useEffect(()=>{
    console.log("Victim Data updated");
  }, [murderVictim])

  return (
    <div className='container' style={{ display: 'flex', flexDirection: 'column', height: 'calc(90vh - 75px)' }}>
      <h1 className='header-text text-center mb-0'>{myCharacterData.name}</h1>
      <div id='top' style={{ flex: '1', overflowY: 'auto' }} className='mt-2 my-custom-scroll'>
        <div className='d-flex-column justify-content-start'>
          <p className='my-page-font-color'><span className='my-nav-lighter-font'>My Profession:</span> {myCharacterData.role}</p>
          <p className='my-page-font-color mt-3'><span className='my-nav-lighter-font'>My Story:</span> {myCharacterData.backstory}</p>
          <p className='my-page-font-color mt-3'><span className='my-nav-lighter-font'>Relation to {murderVictim}:</span> {myCharacterData.relationship}</p>
          <p className='my-page-font-color mt-3'><span className='my-nav-lighter-font'>Why I dislike {murderVictim}:</span> {myCharacterData.motive}</p>
          
        </div>
      </div>
      <div id='bottom' className='mb-0 pt-4'>
        
        <p className='my-page-font-color text-center mt-0 my-1 italic'>My Stuff:</p>
        <div className='d-flex justify-content-around'>
          <div></div>
          <Link to={'/journal-live/0'}>
            <button className='btn btn-success' style={{ width: '35vw', maxWidth: '120px' }}>
              <VscBook size={22}/>
            </button>
          </Link>
          <Link to={'/my-clues'}>
            <button className='btn btn-primary' style={{ width: '35vw', maxWidth: '120px' }}>
              <FiPackage size={22}/>
            </button>
          </Link>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default SocialProfile;
