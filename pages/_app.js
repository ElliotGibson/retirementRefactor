import '../styles/globals.css'

function MyApp({ Component, pageProps, router }) {
  //I prefer to always add the key here as it makes it much easier to integrate framer-motion for page transitions etc... once you have it added :)
  return <Component key={router.asPath} {...pageProps} />
}

export default MyApp
