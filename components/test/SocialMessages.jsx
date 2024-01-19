import React, { useEffect, useState, useRef, useLayoutEffect } from 'react';
import scrollIntoView from 'scroll-into-view-if-needed';
import { useActiveTab } from '../ActiveTabContext';
import { FiSend } from 'react-icons/fi';
import { useUser } from '../UserContext.js';
import io from 'socket.io-client';
import '../CSS/messages.css';

const users = [
  {
    id: '000',
    name: 'Application',
  },
  {
    id: '001',
    name: 'Johnson',
  },
  {
    id: '002',
    name: 'Jamie',
  },
  {
    id: '003',
    name: 'Daniel',
  },
];

const allMsgs = [
  {
    from: `000`,
    to: `002`, //character ID number
    content: `You are the killer! You used this item to kill Jerry Lancaster. Keep this information to yourself!`,
    read: true,
    timestamp: `Dec. 11, 2023 14:28`,
  },
  {
    from: `002`, //char
    to: `000`, //app
    content: `Should I vote for myself?`,
    read: true,
    timestamp: `Dec. 11, 2023 14:30`,
  },
  {
    from: `000`, //app
    to: `002`, //char
    content: `Not sure, Dan will need to determine the consequences of said action.`,
    read: true,
    timestamp: `Dec. 11, 2023 14:31`,
  },
  ////user msgs
  {
    from: `001`, //app
    to: `002`, //char
    content: `Greetings, Jamie, this is Johnson`,
    read: true,
    timestamp: `Dec. 18, 2023 11:31`,
  },
  {
    from: `002`, //app
    to: `001`, //char
    content: `Top o' the mornin' to ya!`,
    read: true,
    timestamp: `Dec. 18, 2023 11:34`,
  },
  {
    from: `001`, //app
    to: `003`, //char
    content: `Greetings, Daniel, this is Johnson`,
    read: true,
    timestamp: `Dec. 18, 2023 11:31`,
  },
  {
    from: `003`, //app
    to: `001`, //char
    content: `Ahoy mate!`,
    read: true,
    timestamp: `Dec. 18, 2023 11:32`,
  },
  {
    from: `002`, //app
    to: `003`, //char
    content: `Greetings, Daniel, this is Jamie`,
    read: true,
    timestamp: `Dec. 18, 2023 11:31`,
  },
  {
    from: `003`, //app
    to: `002`, //char
    content: `Hurry up with this damn app!`,
    read: true,
    timestamp: `Dec. 18, 2023 11:33`,
  },

];

const SocialMessages = props => {
  const { activeTab, setTab } = useActiveTab();
  const { user } = useUser();
  const [allMessages, setAllMessages] = useState([]);
  const [myMessages, setMyMessages] = useState([]);
  const [myNewMessage, setMyNewMessage] = useState('');
  const [activeUsers, setActiveUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [canSendUserMessages, setCanSendUserMessages] = useState(true);
  const [recipient, setRecipient] = useState('Application');
  const [isInit, setIsInit] = useState(true);
  const [clicked, setClicked] = useState(false);

  const messageContainerRef = useRef(null);

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

  const exitFullScreen = () => {
    const checkIfMobile = () => {
      const userAgent = navigator.userAgent;
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)
    };
  	if (checkIfMobile){
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen(); // Firefox
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen(); // Chrome, Safari, and Opera
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen(); // Internet Explorer
      }
    }
  };

  const adjustTextAreaRows = () => {
    const textarea = document.getElementById('myNewMessage');
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight+5}px`;
  };

  const nonInit = () => {
    setIsInit(false);
  };

  useEffect(() => {
    if (clicked && isInit) {
      nonInit();
      setRecipient('000');
    }
  }, [clicked]);

  useEffect(() => {
    if (recipient !== '-- Choose Recipient --' && canSendUserMessages) {
      nonInit();
    }
  }, [recipient]);

  useEffect(() => {
    adjustTextAreaRows();
  }, [myNewMessage]);

  const sendMessage = e => {
    console.log(e);
  };

  const handleRecipientChange = e => {
    const recipId = e.target.value;
    fetchUserMessages(recipId).then(() => {
      const thisUserMessages = allMessages.filter(msg => (msg.from === recipId && msg.to === user.id) || (msg.to === recipId && msg.from === user.id) );
      setMyMessages(thisUserMessages);
      const selectedUser = activeUsers.find(usr => usr.id === recipId);
      setRecipient(selectedUser?.id || '-- Choose Recipient --');
      localStorage.setItem('savedRecipient', recipId);
    })
  };

  const fetchSavedMessages = () => {
    return new Promise(resolve => {
      setActiveUsers(users);
      setFilteredUsers(users.filter(usr => usr.id !== user.id));
      setAllMessages(allMsgs);
      const savedRecipId = localStorage.getItem('savedRecipient');
      const userMsgs = (allMsgs.filter(msg => (msg.from === savedRecipId && msg.to === user.id) || (msg.to === savedRecipId && msg.from === user.id)))
      setMyMessages(userMsgs);
      setRecipient(users.find(usr => usr.id === savedRecipId).id)
    })
  };
  
  const fetchUserData = () => {
    //probably get this data from 
    //activeUsers column from the application/controls table data
    return new Promise(resolve => {
      setActiveUsers(users);
      setFilteredUsers(users.filter(usr => usr.id !== user.id));
      resolve(users);
    });
  };

  const fetchMsgData = users => {
    return new Promise(resolve => {
    //return char msg data where all to is Application (id or string) value and active user ids
      setAllMessages(allMsgs);
      setRecipient('000');
      setMyMessages(allMsgs.filter(msg => (msg.from === '000' && msg.to === user.id) || (msg.to === '000' && msg.from === user.id)));
      resolve(allMsgs);
    });
  };
  
  const fetchUserMessages = recId => {
    return new Promise(resolve => {
      const initialRecipient = activeUsers.find(usr => usr.id === recId);
      setRecipient(initialRecipient.name);
      setMyMessages(allMessages.filter(msg => (msg.from === recId && msg.to === user.id) || (msg.to === recId && msg.from === user.id )));
      resolve(myMessages);
    });
  };

  const fetchData = () => {
    return new Promise(resolve => {
      fetchUserData().then((users)=>{
        fetchMsgData().then(allMsgs => {
          resolve(allMsgs);
      });
      })
    })
  }

  useEffect(() => {
    requestFullScreen();
    setTab('my-messages');

    //axios GET if application allows user to user messaging
    const appUserMessaging = false;
    setCanSendUserMessages(appUserMessaging)
    //setCanSendUserMessages(result);


    //then.....
      const savedRecipId = localStorage.getItem('savedRecipient');
      if (savedRecipId && appUserMessaging) {
        fetchSavedMessages(savedRecipId).then(()=>{
          nonInit();
        });
      } else {
        fetchData().then((resolve)=>{
         resolve();
        });
      }

    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTo({
        top: messageContainerRef.current.scrollHeight,
        behavior: 'smooth',
      });
      
      document.addEventListener('focusin', (e) => {
        const element = e.target;
        scrollIntoView(element, {
          behavior: 'smooth',
          scrollMode: 'if-needed',
          block: 'end',
          inline: 'end',
        });
      });
    }

    const socket = io('http://my-backend-server-url');
    socket.on('new_message', (newMessage) => {
      setAllMessages((prevMessages) => [...prevMessages, newMessage]);
    });
    return () => {
      socket.disconnect();
    };

  }, []);

  useLayoutEffect(() => {
    // Scroll to the bottom with a smooth transition on updates
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTo({
        top: messageContainerRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [myMessages, myNewMessage]);



  useEffect(() => {
    console.log('User Data updated');
  }, [activeUsers]);  
  
  useEffect(() => {
    console.log('Message Data updated');
    console.log(myMessages)
  }, [myMessages]);

  return (
    <div
      className='container'
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: 'calc(95vh - 75px)',
      }}
      onClick={() => requestFullScreen()}
    >
      {canSendUserMessages ? (
        <div
          className='form-group mb-2'
          style={{
            marginTop: '-5px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <label
            className='create-edit-label'
            id='messaging-label'
            htmlFor='recipient'
          >
            
            <span style={{ marginLeft: '15px' }}>Messaging With:</span>
          </label>
          <div className='input-group'>
            <select
              id='recipient'
              name='recipient'
              placeholder='Choose Recipient...'
              className={`form-input-password ${isInit ? 'fst-italic' : null}`}
              value={recipient || '-- Choose Recipient --'}
              style={{
                backgroundColor: 'var(--app-background-color)',
                color: `${isInit ? 'gray' : 'var(--page-font-color)'}`,
                border: '1px solid var(--primary-button-color)',
                marginTop: '-15px',
                padding: '16px',
                fontSize: '18pt',
                borderRadius: '23px'
              }}
              onClick={() => (!clicked ? setClicked(true) : null)}
              onChange={handleRecipientChange}
            >
              <option disabled>-- Choose Recipient --</option>
              {filteredUsers.map((usr, index) => (
                <option key={index} value={usr.id}> {usr.name} </option>
              ))}
            </select>
          </div>
          {(recipient === '-- Choose Recipient --' ||
            recipient === '' ||
            recipient === null ||
            recipient === undefined) &&
          !isInit ? (
            <div>
              <p className='form-error-message'>
                {' '}
                *You must Select the Recipient to your new message!
              </p>
            </div>
          ) : null}
        </div>
      ) : (
        <h1 className='header-text text-center mb-2'>App Messages:</h1>
      )}
      <div
        id='top'
        style={{ flex: '1', overflowY: 'auto' }}
        className='mt-2 my-custom-scroll'
        ref={messageContainerRef}
      >
        <div className='d-flex-column justify-content-start message-box'>
          {myMessages.map((_, index) => (
            <div
              key={index}
              className={`mb-2`}
              style={
                myMessages[index].from === '000' || myMessages[index].from !== user.id
                  ? { marginRight: '45px' }
                  : { marginLeft: '45px', marginRight: '2px' }
              }
            >
              <div
                className={`message message-${
                  myMessages[index].from === '000' || myMessages[index].from !== user.id
                   ? 'received' 
                   : 'sent'
                }`}
              >
                <div
                  className={`message-content-${
                    myMessages[index].from === '000' || myMessages[index].from !== user.id
                      ? 'received'
                      : 'sent'
                  }`}
                >
                  {myMessages[index].content}
                </div>
                
              </div>
              <div
                className={`message-details-${
                  myMessages[index].from === '000' || myMessages[index].from !== user.id
                    ? 'received'
                    : 'sent'
                }`}
              >
                <span
                  className={`my-page-font-color italic px-1`}
                  style={myMessages[index].from === '000' || myMessages[index].from !== user.id
                    ? { fontSize: '10pt', textAlign: 'end' }
                    : { fontSize: '10pt', textAlign: 'end' }
                  }
                >
                  {myMessages[index].timestamp.substring(14, 19)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div id='bottom' className=' my-0 pt-2'>
        <form onSubmit={sendMessage}>
          <div className='form-group'>
            <label className='create-edit-label' htmlFor='myNewMessage'>New Message:</label>
            <div className='input-group'>
              <textarea
                id='myNewMessage'
                name='myNewMessage'
                placeholder='Enter message here...'
                className='form-textarea my-custom-scroll-skinny'
                value={myNewMessage}
                onChange={e => {
                  setMyNewMessage(e.target.value);
                  adjustTextAreaRows();
                }}
                onClick={() => exitFullScreen()}
                style={{maxHeight: '180px'}}
              />
              <button
                type='submit'
                disabled={myNewMessage.length === 0}
                onClick={() => requestFullScreen()}
                className='refresh-button'
                style={{
                  width: '38px',
                }}
              >
                <FiSend />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SocialMessages;
