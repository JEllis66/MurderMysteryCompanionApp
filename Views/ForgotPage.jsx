import React from 'react';
import Forgot from '../components/Forgot.jsx';

export function ForgotPage(props) {
  return (
    <div className='container' style={{backgroundColor: '#303030'}}>
      <div style={{marginTop: '-30px', paddingBottom: '10px'}}>
        <Forgot />
      </div>
    </div>
  );
}

export default ForgotPage;
