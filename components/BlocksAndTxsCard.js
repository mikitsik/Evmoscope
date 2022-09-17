import Link from 'next/link'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import dayjs from 'dayjs'

export default function BlocksAndTxsCard() {
  const [info, setInfo] = useState({})
  async function load() {
    const currentBlock = await fetch('https://tendermint.bd.evmos.org:26657/abci_info?', {
      method: 'GET',
      headers: {
      accept: 'application/json',
    }})
      .then((response) => {
        if (response.ok) return response.json()
      })
      .catch((error) => {
        console.log(error)
      })

    if (!currentBlock) return

    const height = currentBlock.result.response.last_block_height

    const currentBlockAndTxs = await fetch(`https://evmos-api.polkachu.com/cosmos/tx/v1beta1/txs/block/${height}`, {
      method: 'GET',
      headers: {
      accept: 'application/json',
    }})
      .then((response) => {
        if (response.ok) return response.json()
      })
      .catch((error) => {
        console.log(error)
      })

    if (!currentBlockAndTxs) return

    const currentTime = dayjs(currentBlockAndTxs.block.header.time)
    const previousBlockHeight = currentBlockAndTxs.block.last_commit.height
    const txsPerBlock = currentBlockAndTxs.block.data.txs.length
    const ethTxs = currentBlockAndTxs.txs.filter(i => /MsgEthereumTx/.exec(i.body.messages[0]['@type'])).length
    const cosmosTxs = txsPerBlock - ethTxs

    const previousBlock = await fetch(`https://tendermint.bd.evmos.org:26657/block?height=${previousBlockHeight}`, {
      method: 'GET',
      headers: {
      accept: 'application/json',
    }})
      .then((response) => {
        if (response.ok) return response.json()
      })
      .catch((error) => {
        console.log(error)
      })

    if (!previousBlock) return

    const previousTime = dayjs(previousBlock.result.block.header.time)

    setInfo({
      time: currentTime.format('HH:mm:ss'),
      height: height,
      txsPerBlock: txsPerBlock,
      abt: currentTime.diff(previousTime, 'second', true).toFixed(2),
      cosmosTypeTxs: cosmosTxs,
      ethTypeTxs: ethTxs
    })
  }

  useEffect(() => {
    const interval = setInterval(load, 3000)
    return () => clearInterval(interval)
  }, [])


  return (
    <Link href={"/blocks"}>
      <a className={styles.card}>
        <h2>Blocks</h2>
        <p><span>height:&nbsp;&nbsp;&nbsp;&nbsp;</span>{info.height}</p>
        <p><span>exec. time:&nbsp;&nbsp;&nbsp;&nbsp;</span>{info.abt} sec</p>
        <p><span>block time:&nbsp;&nbsp;&nbsp;&nbsp;</span>{info.time}</p>
        <h2 className={styles.secondHeader}>Transactions</h2>
        <p><span>txs per block:&nbsp;&nbsp;&nbsp;&nbsp;</span>{info.txsPerBlock}</p>
        <p><span>cosmos type:&nbsp;&nbsp;&nbsp;&nbsp;</span>{info.cosmosTypeTxs}</p>
        <p><span>ethereum type:&nbsp;&nbsp;&nbsp;&nbsp;</span>{info.ethTypeTxs}</p>
        <p><span>total:&nbsp;&nbsp;&nbsp;&nbsp;</span>--</p>
      </a>
    </Link>
  )
}
