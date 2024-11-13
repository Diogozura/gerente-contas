import * as React from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { CacheProvider, EmotionCache } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import createEmotionCache from '../src/utils/createEmotionCache';
import nookies from 'nookies';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../src/components/layout/Header';
import Footer from '../src/components/layout/Footer';
import { FormProvider } from '../src/config/FormContext';
import { ThemeProvider } from '../styles/themes/themeContext';
import { useRouter } from 'next/router';
import '../styles/globals.css';
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  
 

  React.useEffect(() => {
    const cookies = nookies.get(null); // Use null here, ctx is not available in the client-side
    const savedMode = cookies.theme === 'dark';

  }, []);

  const router = useRouter();
  const [currentPath, setCurrentPath] = React.useState('');



  React.useEffect(() => {
    document.body.style.backgroundImage = 'url("/COLMEIA-FUNDO-1.svg")';
    document.body.style.backgroundSize = 'cover';
    setCurrentPath(router.pathname);
 
  }, [router.pathname]);



  return (
    <CacheProvider value={emotionCache}>
      <FormProvider>
        <ThemeProvider>
          <CssBaseline />
          <Head>
            <meta name="viewport" content="initial-scale=1, width=device-width" />
          </Head>
          <Header currentPath={currentPath}/>
          <Component {...pageProps} />
          <ToastContainer />
          <Footer />
        </ThemeProvider>
      </FormProvider>
    </CacheProvider>
  );
}

export default MyApp;
