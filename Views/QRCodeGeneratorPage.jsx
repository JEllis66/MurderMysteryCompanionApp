import React from 'react';
import TopNav from '../components/AdminGeneralNav.jsx';
import QRCodeGenerator from '../components/QRCodeGenerator.jsx';

export function QRCodeGeneratorPage(props) {
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
          overflow: 'hidden',
          height: 'calc( 100vh - 75px )',
        }}
      >
        <QRCodeGenerator />
      </div>
    </div>
  );
}

export default QRCodeGeneratorPage;
