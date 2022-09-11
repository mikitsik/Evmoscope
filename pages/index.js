import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import dayjs from 'dayjs'

export default function Home() {

  const BlocksCard = () => {
    const initialBlockInfo = {
      time: '',
      height: 0,
      txsPerBlock: 0,
      abt: 0
    }

    const url = 'https://tendermint.bd.evmos.org:26657/block'
    const [blockInfo, setBlockInfo] = useState(initialBlockInfo)

    useEffect(() => {
      async function load() {
        const currentBlock = await fetch(url)
          .then((response) => {
            if (response.ok) return response.json()
          })

        if (!currentBlock) return

        const height = currentBlock.result.block.header.height
        const currentTime = dayjs(currentBlock.result.block.header.time)

        const previousBlock = await fetch(`${url}?height=${parseInt(height) - 1}`)
        .then((response) => {
          if (response.ok) return response.json()
        })

        if (!previousBlock) return

        const previousTime = dayjs(previousBlock.result.block.header.time)

        setBlockInfo({
          time: currentTime.format('ddd, DD MMM YYYY HH:mm:ss'),
          height: height,
          txsPerBlock: currentBlock.result.block.data.txs.length,
          abt: currentTime.diff(previousTime, 'second', true)
        })
      }
      const interval = setInterval(load, 2500)

      return () => clearInterval(interval)

    }, [])


    return (
      <Link href={"/blocks"}>
        <a className={styles.card}>
          <h2>Blocks</h2>
          <p><span>time:&nbsp;&nbsp;</span>{blockInfo.time}</p>
          <p><span>height:&nbsp;&nbsp;</span>{blockInfo.height}</p>
          <p><span>txs per block:&nbsp;&nbsp;</span>{blockInfo.txsPerBlock}</p>
          <p><span>average block time:&nbsp;&nbsp;</span>{blockInfo.abt} sec</p>
        </a>
      </Link>
    )
  }

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
          <BlocksCard />

          <Link href={"/transactions"}>
            <a className={styles.card}>
              <h2>Transactions</h2>
              <p>Learn about Next.js in an interactive course with quizzes!</p>
            </a>
          </Link>

          <Link href={"/smart_contracts"}>
            <a className={styles.card}>
              <h2>Smart Contracts</h2>
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
