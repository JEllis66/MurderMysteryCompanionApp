import React from 'react';
import { Link } from 'react-router-dom';
import { FiBell } from 'react-icons/fi';
import '../CSS/Notification.css';

const Notification = ({ isVisible, message }) => {

  return (
    <Link to='/news' className='notification-link'>
      <div className={`notification-bubble d-flex justify-content-start ${isVisible ? 'appear' : 'disappear'}`}>
        <div className='icon text-center'>
          <FiBell className='text-warning' size={24} style={{paddingTop: '3px'}} />
        </div>
        <div className='text text-warning text-center' style={{ paddingRight: '15%' }}>
          { message ? message : 'BREAKING NEWS!!!' }
        </div>
      </div>
    </Link>
  );
};

export default Notification;
