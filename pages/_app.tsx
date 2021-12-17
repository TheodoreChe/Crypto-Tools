import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { PropertiesProvider } from '../state/Properties'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <PropertiesProvider>
      <Component {...pageProps} />
    </PropertiesProvider>
  )
}

export default MyApp
