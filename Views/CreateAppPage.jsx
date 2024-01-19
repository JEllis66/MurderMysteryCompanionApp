import React from 'react';
import TopNav from '../components/CreateAppNav.jsx';
import CreateApp from '../components/CreateApp.jsx';

export function CreateAppPage(props) {
  return (
    <div className=''>
      <div
        className='Navbar'
        style={{
          height: '65px',
          width: '100%',
        }}
      >
        <TopNav />
      </div>
      <div
        className='my-custom-scroll'
        style={{
          marginTop: '65px',
          padding: `5px 0px`,
          width: '100vw',
          overflowY: 'auto',
          height: 'calc( 100vh - 75px )',
        }}
      >
        <CreateApp />
      </div>
    </div>
  );
}

export default CreateAppPage;
