import '../styles/globals.css';
import '../styles/tailwind.css';
import Header from '../components/Header';
import { install } from '@xdn/prefetch/window';

function MyApp({ Component, pageProps }) {
  if (process.browser) {
    document.addEventListener('DOMContentLoaded', function () {
      install({ includeCacheMisses: true });
    });
  }

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
