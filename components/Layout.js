import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import Logo from './Logo'

export function Layout({ children }) {
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
          <Link href="/about">
            <a>About</a>
          </Link>
        </div>
        <div className={styles.layoutContainer}>
          { children }
        </div>
      </main>

      <footer className={styles.footer}>
        Made with
        <span className={styles.logo}>
          <Image src="/heart.svg" alt="heart" width={40} height={16} />
        </span>
        <a
          href="https://evmos.org/"
          target="_blank"
          rel="noopener noreferrer"
        >to Evmos</a>
      </footer>
    </div>
  )
}
