import React from 'react';
import ReactDOM from 'react-dom/client';
import { UserProvider } from './UserContext.js';

import { App } from './App.jsx'

ReactDOM.createRoot( 
  document.querySelector('#root')
).render(
  <UserProvider>
    <App />
  </UserProvider>
  )