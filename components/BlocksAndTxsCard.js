import Link from 'next/link'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import dayjs from 'dayjs'

export default function BlocksAndTxsCard() {
  const initialInfo = {
    time: '',
    height: 0,
    txsPerBlock: 0,
    abt: 0,
    cosmosTypeTxs: 0,
    ethTypeTxs: 0
  }

  const url = 'https://tendermint.bd.evmos.org:26657/block'
  const [info, setInfo] = useState(initialInfo)

  const url2 = 'https://tendermint.bd.evmos.org:26657/abci_info?'
  async function load2() {
    const currentBlock = await fetch(url2)
      .then((response) => {
        if (response.ok) return response.json()
      })

    if (!currentBlock) return

    const height = currentBlock.result.response.last_block_height

    const currentBlockAndTxs = await fetch(`https://rest.bd.evmos.org:1317/cosmos/tx/v1beta1/txs/block/${height}`)
      .then((response) => {
        if (response.ok) return response.json()
      })

    if (!currentBlockAndTxs) return

    const currentTime = dayjs(currentBlockAndTxs.block.header.time)
    const previousBlockHeight = currentBlockAndTxs.block.last_commit.height
    const txsPerBlock = currentBlockAndTxs.block.data.txs.length
    const ethTxs = currentBlockAndTxs.txs.map((i) => /MsgEthereumTx/.exec(i.body.messages[0]['@type'])).filter(i => i !== null).length
    const cosmosTxs = txsPerBlock - ethTxs

    const previousBlock = await fetch(`https://tendermint.bd.evmos.org:26657/block?height=${previousBlockHeight}`)
      .then((response) => {
        if (response.ok) return response.json()
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
    const interval = setInterval(load2, 3000)
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
