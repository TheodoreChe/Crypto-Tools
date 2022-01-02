import { useStore } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { AppProps } from 'next/app'
import { wrapper } from '@/state/store'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  const store = useStore()
  return (
    // @ts-ignore
    <PersistGate loading={null} persistor={store.__persistor}>
      <Component {...pageProps} />
    </PersistGate>
  )
}

export default wrapper.withRedux(MyApp)
