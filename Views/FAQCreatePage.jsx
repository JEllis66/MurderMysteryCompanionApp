import React from 'react';
import TopNav from '../components/AdminGeneralNav.jsx';
import FAQCreate from '../components/FAQCreate.jsx';

export function FAQCreatePage(props) {
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
          height: 'calc( 100vh - 65px )',
        }}
      >
        <FAQCreate />
      </div>
    </div>
  );
}

export default FAQCreatePage;
