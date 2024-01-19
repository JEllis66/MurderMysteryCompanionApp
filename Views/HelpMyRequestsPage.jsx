import React from 'react';
import TopNav from '../components/HelpNav.jsx';
import HelpMyRequests from '../components/HelpMyRequests.jsx';

export function HelpFAQsPage(props) {
  return (
    <div className='App'>
      <div
        className='Navbar'
        style={{
          height: '65px',
          width: '100vw',
        }}
      >
        <TopNav />
      </div>
      <div
        className='my-custom-scroll'
        style={{
          marginTop: '65px',
          padding: `10px 0px`,
          width: '100vw',
          overflowY: 'auto',
          height: 'calc( 100vh - 75px )',
        }}
      >
        <HelpMyRequests />
      </div>
    </div>
  );
}

export default HelpFAQsPage;