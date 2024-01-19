// UserContext.js
import React, { createContext, useContext, useState } from 'react';

export const useUser = () => {
  return useContext(UserContext);
};

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [realName, setRealName] = useState('');
  const [appIdNum, setAppIdNum] = useState('');

  return (
    <UserContext.Provider value={{ user, setUser, realName, setRealName, appIdNum, setAppIdNum }}>
      {children}
    </UserContext.Provider>
  );
};
