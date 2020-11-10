import '../styles/globals.css';
import '../styles/tailwind.css';
import Header from '../components/Header';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <header className="md:flex bg-white rounded-lg p-2 justify-center">
        <Header />
      </header>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
