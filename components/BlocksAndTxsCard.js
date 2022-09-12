import Link from 'next/link'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import dayjs from 'dayjs'

export default function BlocksAndTxsCard() {
  const initialInfo = {
    time: '',
    height: 0,
    txsPerBlock: 0,
    abt: 0
  }

  const url = 'https://tendermint.bd.evmos.org:26657/block'
  const [info, setInfo] = useState(initialInfo)

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

      setInfo({
        time: currentTime.format('HH:mm:ss'),
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
        <p><span>height:&nbsp;&nbsp;&nbsp;&nbsp;</span>{info.height}</p>
        <p><span>txs per block:&nbsp;&nbsp;&nbsp;&nbsp;</span>{info.txsPerBlock}</p>
        <p><span>exec. time:&nbsp;&nbsp;&nbsp;&nbsp;</span>{info.abt} sec</p>
        <p><span>block time:&nbsp;&nbsp;&nbsp;&nbsp;</span>{info.time}</p>
        <h2>Transactions</h2>
      </a>
    </Link>
  )
}
