import React from 'react';
import TopNav from '../components/GeneralNav.jsx';
import Vote from '../components/Vote.jsx';

export function VotePage(props) {
  return (
    <div className='App'>
      <div
        className='Navbar'
        style={{
          height: '65px',
          maxHeight: '66px',
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
        <Vote />
      </div>
    </div>
  );
}

export default VotePage;