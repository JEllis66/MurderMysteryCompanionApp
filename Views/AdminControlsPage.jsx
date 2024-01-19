import React from 'react';
import TopNav from '../components/EventPortalNav.jsx';
import AdminControls from '../components/AdminControls.jsx';


export function AdminControlsPage(props) {
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
          overflowY: 'hidden',
          height: 'calc( 100vh - 75px )',
          maxHeight: '75vh'
        }}
      >
        <AdminControls />
      </div>
    </div>
  );
}

export default AdminControlsPage;
