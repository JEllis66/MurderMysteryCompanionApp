import React from 'react';
import Login from '../components/Login.jsx';

export function LoginPage(props) {
  return (
    <div className='container' style={{overflow: 'hidden'}}>
      <div className=''>
        <Login />
      </div>
    </div>
  );
}

export default LoginPage;
