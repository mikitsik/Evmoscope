import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import Logo from './Logo'
import { useRouter } from 'next/router'
import Footer from './Footer'

const pages = [
  {path: '/validators', name: 'Validators'},
  {path: '/social_and_github', name: 'Social & Github'},
  {path: '/smart_contracts', name: 'Smart Contracts'},
  {path: '/ibc', name: 'IBC'},
  {path: '/economics', name: 'Economics'},
  {path: '/blocks_and_txs', name: 'Blocks & Txs'},
  {path: '/about', name: 'About'}
]

export function Layout({ children }) {
  const { asPath } = useRouter()
  const links = asPath === '/' ? pages.filter(p => p.path === '/about') : pages.filter(p => p.path !== asPath)

  return (
    <div className={styles.container}>
      <Head>
        <title>Evmoscope</title>
        <meta name="description" content="Evmos explorer" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Logo />
      <main className={styles.main}>
        <div className={styles.navMain}>
          { links.map(l => { return <Link href={l.path}>{l.name}</Link> }) }
        </div>
        { children }
      </main>
      <Footer />
    </div>
  )
}
