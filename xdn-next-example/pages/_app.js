import '../styles/globals.css'
import Header from '../components/Header'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <header>
        <Header />
      </header>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
