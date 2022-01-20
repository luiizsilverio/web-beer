import Head from 'next/head'
import { GlobalStyle } from '../styles/global'
import Layout from '@/components/Layout'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>My-Beer</title>
				<link rel="preconnect" href="https://fonts.googleapis.com" />        
        <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;700&family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet" />
      </Head>
                
      <GlobalStyle />
      
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}
