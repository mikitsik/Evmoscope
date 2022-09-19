import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import Logo from './Logo'
import { useRouter } from 'next/router'
import Footer from './Footer'

const pages = [
  {path: '/about', name: 'About'},
  {path: '/social_and_github', name: 'Social & Github'},
  {path: '/ibc', name: 'IBC'},
  {path: '/validators', name: 'Validators'},
  {path: '/smart_contracts', name: 'Smart Contracts'},
  {path: '/blocks_and_txs', name: 'Blocks & Txs'},
  {path: '/economics', name: 'Economics'}
]

export function Layout({ children }) {
  const { asPath } = useRouter()
  const links = asPath === '/' ? pages.filter(p => p.path === '/about') : pages

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
          { links.map(l => {
            return <Link key={l.name} href={l.path}>
              <a className={(asPath === l.path) ? styles.isActiveLink : undefined}>{l.name}</a>
            </Link>
          }) }
        </div>
        { children }
      </main>
      <Footer />
    </div>
  )
}
