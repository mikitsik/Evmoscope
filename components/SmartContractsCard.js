import Link from 'next/link'
import styles from '../styles/Home.module.css'

export default function SmartContractsCard() {
  return (
    <Link href={"/smart_contracts"}>
      <a className={styles.card}>
        <h2>Smart Contracts</h2>
        <p><span>total:&nbsp;&nbsp;&nbsp;&nbsp;</span>---</p>
        <p><span>trading volume:&nbsp;&nbsp;&nbsp;&nbsp;</span>---</p>
        <p><span>top new:&nbsp;&nbsp;&nbsp;&nbsp;</span>---</p>
        <p><span>monthly active:&nbsp;&nbsp;&nbsp;&nbsp;</span>---</p>
      </a>
    </Link>
  )
}
