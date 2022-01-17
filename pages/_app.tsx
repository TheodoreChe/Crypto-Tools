import { useStore } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { AppProps } from 'next/app'
import ReactTooltip from 'react-tooltip'
import { ModalProvider } from 'styled-react-modal'
import { wrapper } from '@/state/store'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  const store = useStore()
  return (
    // @ts-ignore
    <PersistGate loading={null} persistor={store.__persistor}>
      <ModalProvider>
        <Component {...pageProps} />
        <ReactTooltip effect="solid" globalEventOff="click" />
      </ModalProvider>
    </PersistGate>
  )
}

export default wrapper.withRedux(MyApp)
