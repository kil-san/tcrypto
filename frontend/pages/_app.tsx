import '../styles/globals.css'
import Header from 'components/Header'
import Footer from 'components/Footer'
import { EthersProvider } from 'contexts'
import dynamic from 'next/dynamic'

function MyApp({ Component, pageProps }) {
  return (
    <EthersProvider>
      <Header />
      <div style={{ marginTop: '5em' }}>
        <Component {...pageProps} />
      </div>
      <Footer />
    </EthersProvider>
  )
}

export default MyApp
