import '../styles/globals.css'
import type { AppProps } from 'next/app'
import AppProvider from '../context/AppProvider'

function MyApp({ Component, pageProps }: AppProps) {
  
  return <div className='next-app'> 
    <AppProvider>
      <Component {...pageProps} />
    </AppProvider>
  </div>
}

export default MyApp
