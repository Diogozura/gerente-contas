import React from 'react';
import { useTheme } from '../../../../../styles/themes/themeContext';

const ThemeToggleButton = () => {
  const { currentTheme, toggleTheme } = useTheme();

  const handleToggle = () => {
    const newTheme = currentTheme === 'light' ? 'dark1' : 'light';
    toggleTheme(newTheme);
  };

  return (
    <button onClick={handleToggle}>
      Mudar para {currentTheme === 'light' ? 'Dark' : 'Light'} Mode
    </button>
  );
};

export default ThemeToggleButton;
