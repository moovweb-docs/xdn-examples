import '../styles/globals.css'
import '../styles/tailwind.css';
import App from 'next/app'
import Header from '../components/Header'
import { getCategories } from '../lib/cms'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <header className="md:flex bg-white rounded-lg p-2 justify-center">
        <Header categories={pageProps.categories} />
      </header>
      <Component {...pageProps} />
    </>
  )
}

MyApp.getInitialProps = async (appContext) => {
  const pageProps = await App.getInitialProps(appContext)
  
  pageProps.categories = await getCategories()

  return { pageProps }
}

export default MyApp
