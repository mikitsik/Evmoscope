import styles from '../styles/Home.module.css'
import BlocksAndTxsCard from '../components/BlocksAndTxsCard'
import EconomicsCard from '../components/EconomicsCard'
import SmartContractsCard from '../components/SmartContractsCard'
import ValidatorsCard from '../components/ValidatorsCard'
import SocialAndGithubCard from '../components/SocialAndGithubCard'
import IbcCard from '../components/IbcCard'
import { Layout } from '../components/Layout'

export default function Home() {
  return (
    <Layout>
      <div className={styles.grid}>
        <EconomicsCard />
        <BlocksAndTxsCard />
        <SmartContractsCard />
        <ValidatorsCard />
        <IbcCard />
        <SocialAndGithubCard />
      </div>
    </Layout>
  )
}
