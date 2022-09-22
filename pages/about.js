import { Layout } from '../components/Layout'
import styles from '../styles/Home.module.css'

export default function About() {
  return (
    <Layout>
      <div className={styles.pageContainer}>
        <h2>Hi there!</h2>
        <p>This application is a kind of dashboard, explorer or data visualisation bar designed to study and represent Evmos Ecosystem data, smart-contracts, dapps, txs, coins, ibc movements etc.</p>
        <p>I developed this app within a week before the hackathon ends. It is just a sketch or skeleton. In order to become a full-fledged application it is necessary to make the right architecture, to apply the necessary tools and make a proper UI/UX design. Due to winners announcement on or around October 10, 2022 I am going to develop this app actively.</p>
        <h3>ToDo</h3>
        <p>Core improvements and code refactoring</p>
        <ul>
          <li>architect production with best practicies and morden technologies</li>
          <li>run a mainnet node to avoid redundant fetch queries and to get the data directly</li>
          <li>develop software for the best data managing, e.g. light-weight backend server or middleware</li>
          <li>add postgresql and redis for the best analizing and quick responding</li>
          <li>implement graphql or ruby hotwire to avoid information garbage</li>
        </ul>
      </div>
    </Layout>
  )
}
