// SideMenuContext.js 
import React, { createContext, useContext, useState } from 'react';

const SideMenuContext = createContext();

export function useSideMenu() {
  return useContext(SideMenuContext);
}

export function SideMenuProvider({ children }) {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const closeMenu = () =>{
    setMenuOpen(false);
  }

  return (
    <SideMenuContext.Provider value={{ isMenuOpen, setMenuOpen, toggleMenu, closeMenu }}>
      {children}
    </SideMenuContext.Provider>
  );
}
