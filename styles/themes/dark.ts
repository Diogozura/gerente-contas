// /styles/themes/dark.ts
import { createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    primary: {
      main: '#212121', // Preto
      light: '#424242', // Cinza escuro
      dark: '#000000', // Preto puro
    },
    secondary: {
      main: '#ffcc00', // Laranja escuro
    },
    text: {
      primary: '#fff', // Branco
      secondary: '#e0e0e0', // Cinza claro
    },
    background: {
      default: '#212121', // Preto
      paper: '#303030', // Cinza escuro
    },
  },
});

export default darkTheme;
