import Link from 'next/link'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import RingLoader from "react-spinners/RingLoader"
import Image from 'next/image'
import { aprAndApy } from '../components/aprAndApy'
import EvmosIcon from './EvmosIcon'

export default function EconomicsCard() {
  const [isLoading, setIsLoading] = useState(true)
  const urlCoingecko = 'https://api.coingecko.com/api/v3/coins/evmos'
  const urlPolkachuPool = 'https://evmos-api.polkachu.com/cosmos/staking/v1beta1/pool'
  const urlPolkachuEpochProvision = 'https://evmos-api.polkachu.com/evmos/inflation/v1/epoch_mint_provision'
  const [economicsInfo, setEconomicsInfo] = useState({})

  const urlPolkachuEpoch = 'https://evmos-api.polkachu.com/evmos/epochs/v1/current_epoch?identifier=day'

  async function load() {
    const dataCoingecko = await fetch(urlCoingecko)
      .then((response) => {
        if (response.ok) return response.json()
      })

    if (!dataCoingecko) return

    const price = dataCoingecko.market_data.current_price.usd
    const marketCap = (dataCoingecko.market_data.market_cap.usd / 1000000).toFixed(2)
    const rank = dataCoingecko.market_cap_rank
    const circSupply = (dataCoingecko.market_data.circulating_supply / 1000000).toFixed(2)
    const evmosMarkets = dataCoingecko.tickers.length

    const pool = await fetch(urlPolkachuPool)
      .then((response) => {
        if (response.ok) return response.json()
      })

    if (!pool) return

    const epochProvision = await fetch(urlPolkachuEpochProvision)
      .then((response) => {
        if (response.ok) return response.json()
      })

    if (!epochProvision) return

    const polkachuEpoch = await fetch(urlPolkachuEpoch)
      .then((response) => {
        if (response.ok) return response.json()
      })

    if (!polkachuEpoch) return

    const annualProvisions = epochProvision.epoch_mint_provision.amount * polkachuEpoch.current_epoch
    const apr = (annualProvisions / pool.pool.bonded_tokens * 100).toFixed(2) - 7

    setEconomicsInfo({
      price: price,
      apr: apr,
      circSupply: circSupply,
      marketCap: marketCap,
      rank: rank,
      evmosMarkets: evmosMarkets
    })

    setIsLoading(false)
  }

  useEffect(() => {
    const interval = setInterval(load, 7000)
    return () => clearInterval(interval)
  }, [])

  const cssOverride = {
    display: "block",
    margin: "0 auto"
  }

  if (isLoading) {
    return (
      <Link href={"/economics"}>
        <a className={styles.card}>
          <h2 className={styles.loading}>Economics</h2>
          <RingLoader loading={isLoading} cssOverride={cssOverride} color={'#0070f3'} size={80} speedMultiplier={0.8} />
        </a>
      </Link>
    )
  }

  return (
    <Link href={"/economics"}>
      <a className={styles.card}>
        <h2>Economics</h2>
        <p><span>price, $</span>{economicsInfo.price}</p>
        <p><span>apr, %</span>{aprAndApy[aprAndApy.length - 1][1]}</p>
        <p><span>apy, %<span className={styles.iconEvmos}></span></span>{aprAndApy[aprAndApy.length - 1][2]}</p>
        <p><span>circ. supply, <EvmosIcon width={20} height={20} /> M</span>{economicsInfo.circSupply}</p>
        <p><span>market cap, $ M</span>{economicsInfo.marketCap}</p>
        <p><span>market rank</span>{economicsInfo.rank}</p>
        <p><span>cosmos ecosys. rank</span>2</p>
        <p><span>markets</span>{economicsInfo.evmosMarkets}</p>
      </a>
    </Link>
  )
}
