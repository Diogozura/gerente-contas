// /pages/_app.tsx
import * as React from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { CacheProvider, EmotionCache } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import createEmotionCache from '../src/utils/createEmotionCache';
import lightTheme from '../styles/themes/light';
import darkTheme from '../styles/themes/dark';
import ColorModeSwitcher from '../src/components/ThemeToggle';
import nookies from 'nookies';

const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const [darkMode, setDarkMode] = React.useState(false);

  React.useEffect(() => {
    const cookies = nookies.get();
    const savedMode = cookies.theme === 'dark';
    setDarkMode(savedMode);
  }, []);

  const appliedTheme = React.useMemo(
    () => (darkMode ? darkTheme : lightTheme),
    [darkMode]
  );

 

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={appliedTheme}>
        <CssBaseline />
        <Head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        
        <Component {...pageProps} />
      </ThemeProvider>
    </CacheProvider>
  );
}

export default MyApp;
