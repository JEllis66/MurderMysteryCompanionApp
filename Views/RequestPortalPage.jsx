import React from 'react';
import TopNav from '../components/RequestPortalNav';
import RequestPortal from '../components/RequestPortal.jsx';

export function RequestPortalPage(props) {
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
        <RequestPortal />
      </div>
    </div>
  );
}

export default RequestPortalPage;
