import React from 'react';
import TopNav from '../components/HelpNav.jsx';
import Help from '../components/Help.jsx';

export function HelpPage(props) {
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
          height: 'calc( 95vh - 200px )',
        }}
      >
        <Help />
      </div>
    </div>
  );
}

export default HelpPage;
