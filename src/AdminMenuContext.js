import React, { createContext, useContext, useState } from 'react';

const AdminMenuContext = createContext();

export function useAdminMenu() {
  return useContext(AdminMenuContext);
}

export function AdminMenuProvider({ children }) {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  }

  return (
    <AdminMenuContext.Provider value={{ isMenuOpen, setMenuOpen, toggleMenu, closeMenu }}>
      {children}
    </AdminMenuContext.Provider>
  );
}
