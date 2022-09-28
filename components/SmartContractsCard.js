import Link from 'next/link'
import styles from '../styles/Home.module.css'

export default function SmartContractsCard() {
  return (
    <Link href={"/smart_contracts"}>
      <a className={styles.card}>
        <h2>Smart Contracts</h2>
        <p><span>total</span>--</p>
        <p><span>trading volume</span>--</p>
        <p><span>top new</span>--</p>
        <p><span>monthly active</span>--</p>
        <p><span>coins</span>--</p>
        <p><span>dapps</span>--</p>
      </a>
    </Link>
  )
}
