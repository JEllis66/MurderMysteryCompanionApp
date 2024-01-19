import React from 'react';
import TopNav from '../components/StoryItemNav.jsx';
import TopSecretList from '../components/TopSecretList.jsx';

export function TopSecretListPage(props) {
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
        <TopSecretList />
      </div>
    </div>
  );
}

export default TopSecretListPage;
