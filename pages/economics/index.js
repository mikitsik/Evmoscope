import { Layout } from '../../components/Layout'
import styles from '../../styles/Home.module.css'
import { useState, useEffect } from 'react'
import RingLoader from "react-spinners/RingLoader"
import PriceChart from './components/PriceChart'

export default function Economics() {
  const [priceData, setPriceData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const response = await fetch('https://api.coingecko.com/api/v3/coins/evmos/market_chart?vs_currency=usd&days=100')
      const json = await response.json()
      setPriceData(json.prices)
      setIsLoading(false)
    }
    load()
  }, [])

  const cssOverride = {
    display: "block",
    margin: "0 auto"
  }

  return (
    <Layout>
      <div className={styles.pageContainer}>
        <div className={styles.priceChart}>
          {isLoading ?
            <RingLoader loading={isLoading} cssOverride={cssOverride} color={'#0070f3'} size={80} speedMultiplier={0.8} /> :
            <PriceChart priceData={priceData}/>
          }
        </div>
      </div>
    </Layout>
  )
}
