import React from 'react';
import TopNav from '../components/HelpNav.jsx';
import HelpRequest from '../components/HelpRequest.jsx';

export function HelpRequestPage(props) {
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
        <HelpRequest />
      </div>
    </div>
  );
}

export default HelpRequestPage;
