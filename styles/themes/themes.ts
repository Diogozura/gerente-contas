import { createTheme } from '@mui/material/styles';

// Defina suas paletas de cores para o tema escuro
const darkTheme1 = createTheme({
  typography: {
    fontFamily: [
      'Quicksand', // Usando Quicksand como a fonte padrão
      'sans-serif',
    ].join(','),
    // h4: {
    //   fontFamily: 'Radio Canada, sans-serif', // Aplicando Radio Canada ao H2
    // },
      // h5: {
      //   fontFamily: 'Radio Canada, sans-serif', // Aplicando Radio Canada ao H3
      // },
  },
  palette: {
    mode: 'dark',
    primary: {
      main: '#703B8C', // azul claro
      contrastText: '#000',
    },
    secondary: {
      main: '#5E5E5E', // rosa claro
      contrastText: '#5E5E5E',
    },
    error: {
      main: '#f44336', // vermelho
    },
    warning: {
      main: '#ffa726', // laranja
    },
    info: {
      main: '#29b6f6', // azul
    },
    success: {
      main: '#66bb6a', // verde
    },
    background: {
      default: '#fff', // fundo escuro
      paper: '#f4f4f4', // papel escuro
    },
    text: {
      primary: '#5E5E5E', // texto branco
      secondary: '#b0bec5', // texto cinza claro
    },
  },
  components: {
    MuiDialog: {
      defaultProps: {
        disableScrollLock: true, // Desabilita o scroll lock para todos os Dialogs
      },
    },
    MuiMenu: {
      defaultProps: {
        disableScrollLock: true, // Desabilita o scroll lock para todos os Dialogs
      },
    },
  },
});

// Defina suas paletas de cores para outro tema escuro
const darkTheme2 = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#FFBD39', // laranja
      contrastText: '#5E5E5E',
    },
    secondary: {
      main: '#ff5722', // laranja escuro
      contrastText: '#5E5E5E',
    },
    error: {
      main: '#d32f2f', // vermelho escuro
    },
    warning: {
      main: '#ffa000', // laranja escuro
    },
    info: {
      main: '#0288d1', // azul escuro
    },
    success: {
      main: '#388e3c', // verde escuro
    },
    background: {
      default: '#f4f4f4', // fundo escuro
      paper: '#f4f4f4', // papel escuro
    },
    text: {
      primary: '#5E5E5E', // texto branco
      secondary: '#b0bec5', // texto cinza claro
    },
  // Custom color
  inherit: {
    main: '#5E5E5E',
  },
} as any,
  components: {
    MuiDialog: {
      defaultProps: {
        disableScrollLock: true, // Desabilita o scroll lock para todos os Dialogs
      },
    },
    MuiMenu: {
      defaultProps: {
        disableScrollLock: true, // Desabilita o scroll lock para todos os Dialogs
      },
    },
  },
});

// Defina suas paletas de cores para o tema claro
const lightTheme = createTheme({
  typography: {
    fontFamily: [
      'Quicksand', // Usando Quicksand como a fonte padrão
      'sans-serif',
    ].join(','),
    // h4: {
    //   fontFamily: 'Radio Canada, sans-serif', // Aplicando Radio Canada ao H2
    // },
      // h5: {
      //   fontFamily: 'Radio Canada, sans-serif', // Aplicando Radio Canada ao H3
      // },
  },
  palette: {
    mode: 'light',
    primary: {
      main: '#703B8C', // azul
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#f44336', // rosa
      contrastText: '#ffffff',
    },
    error: {
      main: '#f44336', // vermelho
    },
    warning: {
      main: '#ffa726', // laranja
    },
    info: {
      main: '#2196f3', // azul
    },
    success: {
      main: '#4caf50', // verde
    },
    background: {
      default: '#ffffff', // fundo claro
      paper: '#FBFBFB', // papel branco
    },
    text: {
      primary: '#000000', // texto preto
      secondary: '#5E5E5E', // texto cinza  
    },
     // Custom color
     inherit: {
      main: '#5E5E5E',
    },
  } as any,
  components: {
    MuiDialog: {
      defaultProps: {
        disableScrollLock: true, // Desabilita o scroll lock para todos os Dialogs
      },
    },
    MuiMenu: {
      defaultProps: {
        disableScrollLock: true, // Desabilita o scroll lock para todos os Dialogs
      },
    },
  },
});

export const themes = {
  // dark1: darkTheme1,
  dark1: darkTheme2,
  light: lightTheme,
};
