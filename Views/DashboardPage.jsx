import React from 'react';
import TopNav from '../components/HomeNav.jsx';
import Dashboard from '../components/Dashboard.jsx';

export function DashboardPage(props) {
  return (
    <div className='App'>
      <div
        className='Navbar'
        style={{
          height: '65px',
          width: '100%',
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
        <Dashboard />
      </div>
    </div>
  );
}

export default DashboardPage;
