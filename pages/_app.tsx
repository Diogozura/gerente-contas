import * as React from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { CacheProvider, EmotionCache } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import createEmotionCache from '../src/utils/createEmotionCache';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../src/components/layout/Header';
import Footer from '../src/components/layout/Footer';
import { FormProvider } from '../src/config/FormContext';
import { ThemeProvider } from '../styles/themes/themeContext';
import { useRouter } from 'next/router';
import '../styles/globals.css';
import { authenticatedPages } from "../src/config/authenticatedPages";

// Criação do cache para Emotion
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

// Função para aplicar o fundo da página com base na rota
const applyPageBackground = (pathname: string) => {
  if (authenticatedPages.includes(pathname)) {
    document.body.style.backgroundImage = 'url("/COLMEIA-FUNDO-1.svg")';
    document.body.style.backgroundSize = 'cover';
  } else {
    document.body.style.backgroundImage = '';
    document.body.style.backgroundColor = '#F7F7F7';
  }
};

function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const router = useRouter();
  const [currentPath, setCurrentPath] = React.useState<string>('');

  React.useEffect(() => {
    setCurrentPath(router.pathname);
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
              <Header currentPath={currentPath} />
              <Component {...pageProps} />
            
              <Footer />
              
            </ThemeProvider>
          </FormProvider>
        </CacheProvider>
        );
}

        export default MyApp;
