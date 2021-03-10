import '../styles/globals.css'
import '../styles/tailwind.css'
import Header from '../components/Header'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import LoadingIndicator from '../components/LoadingIndicator'
import { prefetch } from '@xdn/prefetch/window/prefetch'
import { Metrics } from '@xdn/rum'

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    router.events.on('routeChangeStart', () => setLoading(true))
    router.events.on('routeChangeComplete', () => setLoading(false))

    // register a listener for SW messages to prefetch images from the PLP API responses
    const { serviceWorker } = navigator
    if (serviceWorker) {
      serviceWorker.addEventListener('message', event => {
        if (event.data.action === 'prefetch') {
          prefetch(event.data.url, event.data.as, event.data.options)
        }
      })
    }

    new Metrics({
      token: '1bb4495f-626b-407c-a1aa-48451d42a02f',
    })
  }, [])

  return (
    <>
      {loading && <LoadingIndicator />}
      <Header />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
