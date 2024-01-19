import React from 'react';
import TopNav from '../components/StoryItemNav.jsx';
import NewsList from '../components/NewsList.jsx';

export function NewsListPage(props) {
  const { toggleNotification } = props;
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
        <NewsList toggleNotification={toggleNotification} />
      </div>
    </div>
  );
}

export default NewsListPage;
