import { createContext, useState } from 'react';

export const SidebarContext = createContext();

const SidebarContextProvider = ({ children }) => {
  const [size, setSize] = useState('full');
  const [dark, setDark] = useState(localStorage.getItem('theme', false));
  const toggleSize = () => {
    if (size === 'full') {
      setSize('mini');
    } else {
      setSize('full');
    }
  };

  const toggleTheme = () => {
    if (dark) {
      setDark(false);

      localStorage.removeItem('theme');
    } else {
      setDark(true);

      localStorage.setItem('theme', true);
    }
  };
  if (localStorage.getItem('theme')) {
    document.body.classList.add('dark');
  } else {
    document.body.classList.remove('dark');
  }

  return (
    <SidebarContext.Provider value={{ size, toggleSize, toggleTheme, dark }}>
      {children}
    </SidebarContext.Provider>
  );
};

export default SidebarContextProvider;
