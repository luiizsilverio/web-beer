import Head from 'next/head'
import { GlobalStyle } from '../styles/global'
import { BeerProvider } from '@/contexts'
import Layout from '@/components/Layout'

export default function App({ Component, pageProps }) {
  return (
    <>    
      <Head>
        <title>My-Beer</title>
        <link rel="shortcut icon" href="favicon.png" type="image/png" />
        <link rel="shortcut icon" href="favicon.png" type="image/png" />
				<link rel="preconnect" href="https://fonts.googleapis.com" />        
        <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;700&family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet" />
      </Head>
                
      <GlobalStyle />
      
      <BeerProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </BeerProvider>
    </>
  )
}
