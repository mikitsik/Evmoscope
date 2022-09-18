import { Layout } from '../components/Layout'
import styles from '../styles/Home.module.css'
import DevelopingPage from '../components/DevelopingPage'

export default function BlocksAndTxs() {
  return (
    <Layout>
      <div className={styles.pageContainer}>
        <DevelopingPage />
      </div>
    </Layout>
  )
}
