import React from 'react';
import TopNav from '../components/RequestPortalNav.jsx';
import FAQList from '../components/FAQList.jsx';

export function FAQListPage(props) {
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
          height: 'calc( 90vh - 75px )',
        }}
      >
        <FAQList />
      </div>
    </div>
  );
}

export default FAQListPage;
