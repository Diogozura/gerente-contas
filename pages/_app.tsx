import type { AppProps } from 'next/app'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'; 
import GlobalStyle from "../styles"; 


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />

      <GlobalStyle />
      <ToastContainer />
    </>
  )
}
export default MyApp
