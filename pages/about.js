import { Layout } from '../components/Layout'
import styles from '../styles/Home.module.css'

export default function About() {
  return (
    <Layout>
      <div className={styles.pageContainer}>
        <p>This application is a sketch of a kind of dashboard, explorer or data visualisation bar designed to aggregate, study and present all Evmos Ecosystem data, smart-contracts, dapps, txs, coins, ibc movements etc.</p>
        <h3>Sections:</h3>
        <ul>
          <li>Economics</li>
          <li>Blocks and Transactions</li>
          <li>Smart Contracts</li>
          <li>Validators</li>
          <li>IBC</li>
          <li>Social and Github</li>
        </ul>
      </div>
    </Layout>
  )
}
