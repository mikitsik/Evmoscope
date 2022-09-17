import Link from 'next/link'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'

export default function EconomicsCard() {
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
    const apr = (annualProvisions / pool.pool.bonded_tokens * 100).toFixed(2) - 4

    setEconomicsInfo({
      price: price,
      apr: apr,
      circSupply: circSupply,
      marketCap: marketCap,
      rank: rank,
      evmosMarkets: evmosMarkets
    })
  }

  useEffect(() => {
    const interval = setInterval(load, 7000)
    return () => clearInterval(interval)
  }, [])

  return (
    <Link href={"/economics"}>
      <a className={styles.card}>
        <h2>Economics</h2>
        <p><span>price:&nbsp;&nbsp;&nbsp;&nbsp;</span>${economicsInfo.price}</p>
        <p><span>apr:&nbsp;&nbsp;&nbsp;&nbsp;</span>{economicsInfo.apr}%</p>
        <p><span>circ. supply:&nbsp;&nbsp;&nbsp;&nbsp;</span>{economicsInfo.circSupply} M</p>
        <p><span>market cap:&nbsp;&nbsp;&nbsp;&nbsp;</span>${economicsInfo.marketCap} M</p>
        <p><span>rank:&nbsp;&nbsp;&nbsp;&nbsp;</span>{economicsInfo.rank}</p>
        <p><span>cosmos eco rank:&nbsp;&nbsp;&nbsp;&nbsp;</span>2</p>
        <p><span>markets:&nbsp;&nbsp;&nbsp;&nbsp;</span>{economicsInfo.evmosMarkets}</p>
      </a>
    </Link>
  )
}
