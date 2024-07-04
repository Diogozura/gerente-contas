// /components/ColorModeSwitcher.tsx
import React from 'react';
import { IconButton } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

interface ColorModeSwitcherProps {
  toggleDarkMode: () => void;
}

const ColorModeSwitcher: React.FC<ColorModeSwitcherProps> = ({ toggleDarkMode }) => {
  const theme = useTheme();

  return (
    <IconButton onClick={toggleDarkMode} color="inherit">
      {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
    </IconButton>
  );
};

export default ColorModeSwitcher;
