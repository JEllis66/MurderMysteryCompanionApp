import React, { useEffect, useState, useRef, useLayoutEffect } from 'react';
import scrollIntoView from 'scroll-into-view-if-needed';
import { useActiveTab } from '../ActiveTabContext';
import { FiSend } from 'react-icons/fi';
import io from 'socket.io-client';
import '../CSS/messages.css';

const users = [
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
    to: `001`, //character ID number
    content: `You are the killer! You used this item to kill Jerry Lancaster. Keep this information to yourself!`,
    read: true,
    timestamp: `Dec. 11, 2023 14:28`,
  },
  {
    from: `001`, //char
    to: `000`, //app
    content: `Should I vote for myself?`,
    read: true,
    timestamp: `Dec. 11, 2023 14:30`,
  },
  {
    from: `000`, //app
    to: `001`, //char
    content: `Not sure, Dan will need to determine the consequences of said action.`,
    read: true,
    timestamp: `Dec. 11, 2023 14:31`,
  },
  {
    from: `000`,
    to: `002`, //character ID number
    content: `Hello, Jamie. You should hurry up and complete this app already`,
    read: true,
    timestamp: `Dec. 13, 2023 15:28`,
  },
  {
    from: `002`, //char
    to: `000`, //app
    content: `I am trying my best`,
    read: true,
    timestamp: `Dec. 13, 2023 15:30`,
  },
  {
    from: `000`, //app
    to: `002`, //char
    content: `Well your best is not good enough apparently... Try doing better. Being better. Actually caring!`,
    read: true,
    timestamp: `Dec. 13, 2023 15:31`,
  },

  {
    from: `000`,
    to: `003`, //character ID number
    content: `Greetings, Dan the Man. I hope we can meet to discuss app progress/direction soon`,
    read: true,
    timestamp: `Dec. 18, 2023 11:28`,
  },
  {
    from: `003`, //char
    to: `000`, //app
    content: `*Automated Response*: Dan is busy at the moment, you will have to wait until he is free to respond. He appreciates your patience!`,
    read: true,
    timestamp: `Dec. 18, 2023 11:30`,
  },
  {
    from: `000`, //app
    to: `003`, //char
    content: `I hope you are enjoying your new job, good sir!`,
    read: true,
    timestamp: `Dec. 18, 2023 11:31`,
  },
];

const UserMessaging = props => {
  // const { id } = useParams();
  const { activeTab, setTab } = useActiveTab();
  const [allMessages, setAllMessages] = useState([]);
  const [myMessages, setMyMessages] = useState([]);
  const [myNewMessage, setMyNewMessage] = useState('');
  const [activeUsers, setActiveUsers] = useState([]);
  const [canSendUserMessages, setCanSendUserMessages] = useState(true);
  const [recipient, setRecipient] = useState('-- Choose Recipient --');
  const [isInit, setIsInit] = useState(true);
  const [clicked, setClicked] = useState(false);

  const messageContainerRef = useRef(null);

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

  const exitFullScreen = () => {
    const checkIfMobile = () => {
      const userAgent = navigator.userAgent;
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        userAgent
      );
    };
    if (checkIfMobile) {
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
    textarea.style.height = `${textarea.scrollHeight + 5}px`;
  };

  const nonInit = () => {
    setIsInit(false);
  };

  useEffect(() => {
    if (clicked && isInit) {
      nonInit();
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
    //send to current recipient id
  };

  const handleRecipientChange = e => {
    const recipId = e.target.value;
    fetchUserMessages(recipId).then(() => {
      const thisUserMessages = allMessages.filter(
        msg => msg.from === recipId || msg.to === recipId
      );
      setMyMessages(thisUserMessages);
      const selectedUser = activeUsers.find(user => user.id === recipId);
      setRecipient(selectedUser?.id || '-- Choose Recipient --');
      localStorage.setItem('savedRecipient', recipId);
    });
  };

  const fetchSavedMessages = () => {
    return new Promise(resolve => {
      setActiveUsers(users);
      setAllMessages(allMsgs);
      const savedRecipId = localStorage.getItem('savedRecipient');
      const userMsgs = allMsgs.filter(
        msg => (msg.from === savedRecipId && msg.to === "000") || (msg.to === savedRecipId && msg.from === "000")
      );
      setMyMessages(userMsgs);
      setRecipient(users.find(user => user.id === savedRecipId).id);
    });
  };

  const fetchUserData = () => {
    //probably get this data from
    //activeUsers column from the application/controls table data
    return new Promise(resolve => {
      setActiveUsers(users);
      resolve(users);
    });
  };

  const fetchMsgData = users => {
    return new Promise(resolve => {
      //return char msg data where all to is Application (id or string) value and active user ids

      setAllMessages(allMsgs);
      resolve(allMsgs);
    });
  };

  const fetchUserMessages = recId => {
    return new Promise(resolve => {
      const initialRecipient = activeUsers.find(user => user.id === recId);
      console.log(recId, activeUsers);
      setRecipient(initialRecipient.name);
      setMyMessages(
        allMessages.filter(msg => (msg.from === recId && msg.to === '000') || (msg.to === recId && msg.from === '000'))
      );
      resolve(myMessages);
    });
  };

  const fetchData = () => {
    return new Promise(resolve => {
      fetchUserData().then(users => {
        fetchMsgData().then(allMsgs => {
          resolve(allMsgs);
        });
      });
    });
  };

  useEffect(()=>{
    setMyMessages(
      allMessages.filter(msg => (msg.from === recipient && msg.to === '000') || (msg.to === recipient && msg.from === '000'))
    );
  },[allMessages])

  useEffect(() => {
    requestFullScreen();
    setTab('user-messaging');
    const savedRecipId = localStorage.getItem('savedRecipient');
    if (savedRecipId) {
      fetchSavedMessages(savedRecipId).then(() => {
        resolve();
      });
    } else {
      fetchData().then(resolve => {
        console.log('fresh fetch');
        resolve();
      });
    }

    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTo({
        top: messageContainerRef.current.scrollHeight,
        behavior: 'smooth',
      });

      document.addEventListener('focusin', e => {
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
    console.log('Data updated');
  }, [myMessages, allMessages, recipient]);

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
                padding: '12px 16px',
                fontSize: '18pt',
                borderRadius: '23px'
              }}
              onClick={() => (!clicked ? setClicked(true) : null)}
              onChange={handleRecipientChange}
            >
              <option disabled>-- Choose Recipient --</option>
              {activeUsers.map((user, index) => (
                <option className='msg-option-font' key={index} value={user.id}>
                  {' '}
                  {user.name}{' '}
                </option>
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
                *You must Select the Recipient to view your messages!
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
                myMessages[index].to === '000'
                  ? { marginRight: '45px' }
                  : { marginLeft: '45px', marginRight: '2px' }
              }
            >
              <div
                className={`message message-${
                  myMessages[index].to === '000' ? 'received' : 'sent'
                }`}
              >
                <div
                  className={`message-content-${
                    myMessages[index].to === '000' ? 'received' : 'sent'
                  }`}
                >
                  {myMessages[index].content}
                </div>
              </div>
              <div
                className={`message-details-${
                  myMessages[index].to === '000' ? 'received' : 'sent'
                }`}
              >
                <span
                  className={`my-page-font-color italic px-1`}
                  style={
                    myMessages[index].to === '000'
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
            <label className='create-edit-label' htmlFor='myNewMessage'>
              New Message:
            </label>
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
                style={{ maxHeight: '180px' }}
              />
              <button
                type='submit'
                disabled={myNewMessage.length === 0}
                className='refresh-button'
                onClick={() => requestFullScreen()}
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

export default UserMessaging;
