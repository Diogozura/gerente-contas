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
import authenticatedPagesConfig from '../src/config/authenticatedPages.json';
import { isAuthenticated } from '../src/utils/auth';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../src/components/layout/Header';
import Footer from '../src/components/layout/Footer';
import { FormProvider } from '../src/config/FormContext';

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
    const cookies = nookies.get(ctx);
    const savedMode = cookies.theme === 'dark';
    setDarkMode(savedMode);
  }, [ctx]);
  const appliedTheme = React.useMemo(() => (darkMode ? darkTheme : lightTheme), [darkMode]);

  const isAuthPage = authenticatedPages.includes(router.pathname);
  const userIsAuthenticated = isAuthenticated(ctx);

  React.useEffect(() => {
    if (isAuthPage && !userIsAuthenticated) {
      router.push('/auth/login');
    }
  }, [isAuthPage, userIsAuthenticated, router]);



  if (isAuthPage && !userIsAuthenticated) {
    return null;
  }

  return (
    <>
    <CacheProvider value={emotionCache}>
    <FormProvider>

   
      <ThemeProvider theme={appliedTheme}>
        <CssBaseline />
        <Head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
       <Header/>
     
            <Component {...pageProps} />
            <ToastContainer />  
            <Footer/>
  
      </ThemeProvider>
      </FormProvider>
      </CacheProvider>
      </>
  );
}

export default MyApp;
