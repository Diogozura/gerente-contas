import * as React from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { CacheProvider, EmotionCache } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import createEmotionCache from '../src/utils/createEmotionCache';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../src/components/layout/Footer';
import { FormProvider } from '../src/config/FormContext';
import { ThemeProvider } from '../styles/themes/themeContext';
import { useRouter } from 'next/router';
import '../styles/globals.css';
import { authenticatedPages } from "../src/config/authenticatedPages";
import { ToastNotificationContainer } from '@/components/common/AlertToast';
import PrivateLayout from "@/components/layout/Header/PrivateLayout";
import PublicLayout from '@/components/layout/Header/PublicLayout';

// Criação do cache para Emotion
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

// Função para aplicar o fundo da página com base na rota
const applyPageBackground = (pathname: string) => {
  if (authenticatedPages.includes(pathname)) {
    document.body.style.backgroundImage = 'url("/COLMEIA-FUNDO-1.svg")';
    // document.body.style.backgroundSize = '';
  } else {
    document.body.style.backgroundImage = '';
    document.body.style.backgroundColor = '#ffffff';
  }
};

function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const router = useRouter();
  const isAuthenticatedPage = authenticatedPages.includes(router.pathname);
  React.useEffect(() => {
   
    applyPageBackground(router.pathname); // Aplica o fundo com base na página
  }, [router.pathname]);


  return (
    <CacheProvider value={emotionCache}>
      <FormProvider>
        <ThemeProvider>
        
              <CssBaseline />
              <Head>
                <meta name="viewport" content="initial-scale=1, width=device-width" />
              </Head>
              {isAuthenticatedPage ? <PublicLayout /> :  <PrivateLayout />}
              <Component {...pageProps} />
              <ToastNotificationContainer />
              <Footer />
              
            </ThemeProvider>
          </FormProvider>
        </CacheProvider>
        );
}

        export default MyApp;
