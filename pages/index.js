import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import BlocksAndTxsCard from '../components/BlocksAndTxsCard'
import EconomicsCard from '../components/EconomicsCard'
import SmartContractsCard from '../components/SmartContractsCard'
import ValidatorsCard from '../components/ValidatorsCard'
import SocialAndGithubCard from '../components/SocialAndGithubCard'

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
              <Image src="/logo.svg" alt="Evmoscope Logo" width={340} height={90} />
            </span>
          </a>
        </Link>
      </div>

      <main className={styles.main}>
        <div className={styles.grid}>
          <BlocksAndTxsCard />
          <SmartContractsCard />
          <EconomicsCard />
          <ValidatorsCard />
          <SocialAndGithubCard />
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
