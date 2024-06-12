import * as React from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { CacheProvider, EmotionCache } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { useRouter } from 'next/router';
import createEmotionCache from '../src/utils/createEmotionCache';
import lightTheme from '../styles/themes/light';
import darkTheme from '../styles/themes/dark';
import nookies from 'nookies';
import PublicLayout from '../src/components/base/Header/PublicLayout';
import PrivateLayout from '../src/components/base/Header/PrivateLayout';
import authenticatedPagesConfig from '../src/config/authenticatedPages.json';
import { isAuthenticated } from '../src/utils/auth';

const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

function MyApp(props: MyAppProps,ctx) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const [darkMode, setDarkMode] = React.useState(false);
  const router = useRouter();
  const authenticatedPages = authenticatedPagesConfig.authenticatedPages;

  React.useEffect(() => {
    const cookies = nookies.get();
    const savedMode = cookies.theme === 'dark';
    setDarkMode(savedMode);
  }, []);

  const appliedTheme = React.useMemo(() => (darkMode ? darkTheme : lightTheme), [darkMode]);

  const isAuthPage = authenticatedPages.includes(router.pathname);
  const userIsAuthenticated = isAuthenticated(ctx);

  React.useEffect(() => {
    if (isAuthPage && !userIsAuthenticated) {
      router.push('/login');
    }
  }, [isAuthPage, userIsAuthenticated, router]);

  const Layout = isAuthPage ? PrivateLayout : PublicLayout;

  if (isAuthPage && !userIsAuthenticated) {
    return null;
  }

  return (
    <>
  
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={appliedTheme}>
        <CssBaseline />
        <Head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
      </CacheProvider>
      </>
  );
}

export default MyApp;
