import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Evmoscope</title>
        <meta name="description" content="Evmos explorer" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Link href="/">
          <a>
            <span>
              <Image src="/logo.svg" alt="Evmoscope Logo" width={260} height={69} />
            </span>
          </a>
        </Link>

        <div className={styles.grid}>
          <Link href={"/blocks"}>
            <a className={styles.card}>
              <h2>Bloks</h2>
              <p>Instantly deploy your Next.js site to a public URL with Vercel.</p>
            </a>
          </Link>

          <Link href={"/transactions"}>
            <a className={styles.card}>
              <h2>Transactions</h2>
              <p>Learn about Next.js in an interactive course with quizzes!</p>
            </a>
          </Link>

          <Link href={"/smartcontracts"}>
            <a className={styles.card}>
              <h2>Smartcontracts</h2>
              <p>Learn about Next.js in an interactive course with quizzes!</p>
            </a>
          </Link>

          <Link href={"/economics"}>
            <a className={styles.card}>
              <h2>Economics</h2>
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
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}
