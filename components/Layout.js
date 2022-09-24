import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Logo from './Logo'
import Footer from './Footer'
import NavBar from './NavBar'
import dynamic from 'next/dynamic'

export function Layout({ children }) {
  const NavBar = dynamic(() => import('./NavBar'), { ssr: false })

  return (
    <div className={styles.container}>
      <Head>
        <title>Evmoscope</title>
        <meta name="description" content="Evmos explorer" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Logo width="345" height="90"/>
      <main className={styles.main}>
        <NavBar />
        { children }
      </main>
      <Footer />
    </div>
  )
}
