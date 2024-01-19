import React from 'react';
import Home from '../components/Home.jsx';

export function HomePage(props) {
  return (
    <div className='container' style={{backgroundColor: '#303030'}}>
      <div style={{marginTop: '-30px', paddingBottom: '10px'}}>
        <Home />
      </div>
    </div>
  );
}

export default HomePage;
