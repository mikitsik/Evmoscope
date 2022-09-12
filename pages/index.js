import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import BlocksAndTxsCard from '../components/BlocksAndTxsCard'
import EconomicsCard from '../components/EconomicsCard'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Evmoscope</title>
        <meta name="description" content="Evmos explorer" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.header}>
        <Link href="/">
          <a>
            <span>
              <Image src="/logo.svg" alt="Evmoscope Logo" width={260} height={69} />
            </span>
          </a>
        </Link>
      </div>

      <main className={styles.main}>
        <div className={styles.grid}>
          <BlocksAndTxsCard />
          <EconomicsCard />

          <Link href={"/smart_contracts"}>
            <a className={styles.card}>
              <h2>Smart Contracts</h2>
              <p>Learn about Next.js in an interactive course with quizzes!</p>
            </a>
          </Link>

          <Link href={"/social"}>
            <a className={styles.card}>
              <h2>Social</h2>
              <p>Discover and deploy boilerplate example Next.js projects.</p>
            </a>
          </Link>


          <Link href={"/validators"}>
            <a className={styles.card}>
              <h2>Validators</h2>
              <p>
                Instantly deploy your Next.js site to a public URL with Vercel.
              </p>
            </a>
          </Link>
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
