import React, { createContext, useContext, useState } from 'react';

const AlertContext = createContext();

export const useAlert = () => {
  return useContext(AlertContext);
};

export const AlertProvider = ({ children }) => {
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [onConfirmCallback, setOnConfirmCallback] = useState(null);
  const [command, setCommand] = useState('');

  const showAlert = (message, onConfirm, actionCommand) => {
    setAlertMessage(message);
    setOnConfirmCallback(() => onConfirm);
    setCommand(actionCommand);
    setAlertVisible(true);
  };

  const hideAlert = () => {
    setAlertVisible(false);
    setOnConfirmCallback(null);
  };

  return (
    <AlertContext.Provider
      value={{
        alertVisible,
        alertMessage,
        showAlert,
        hideAlert,
        command,
        setCommand,
      }}
    >
      {children}
    </AlertContext.Provider>
  );
};
