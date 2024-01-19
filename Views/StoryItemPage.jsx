import React from 'react';
import TopNav from '../components/StoryItemNav.jsx';
import StoryItem from '../components/StoryItem.jsx';

export function StoryItemPage(props) {
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
        <StoryItem />
      </div>
    </div>
  );
}

export default StoryItemPage;
