import Link from 'next/link'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import RingLoader from "react-spinners/RingLoader"

export default function ValidatorsCard() {
  const [info, setInfo] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  async function load() {
    const validators = await fetch('https://evmos-api.polkachu.com/cosmos/staking/v1beta1/validators?pagination.limit=500', {
      method: 'GET',
      headers: {
      accept: 'application/json',
    }})
      .then((response) => {
        if (response.ok) return response.json()
      })
      .catch((error) => {
        console.log(error)
      })

    if (!validators) return

    const active = validators.validators.filter(v => v.status === 'BOND_STATUS_BONDED')
    const minBond = active.sort(function(a, b) { return a.tokens - b.tokens})[0].tokens / 10 ** 18
    const jailed = validators.validators.filter(v => v.jailed === true)
    const maxBondJailed = jailed.sort(function(a, b) { return b.tokens - a.tokens})[0].tokens / 10 ** 18

    setInfo({
      active: active.length,
      minBond: minBond.toFixed(),
      restakeEnabeled: 88,
      additionalRewards: '--',
      jailed: jailed.length,
      maxBondJailed: maxBondJailed.toFixed(),
      total: validators.validators.length
    })

    setIsLoading(false)
  }

  useEffect(() => { load() }, [])

  useEffect(() => { load() }, [])

  const cssOverride = {
    display: "block",
    margin: "0 auto"
  }

  if (isLoading) {
    return (
      <Link href={"/validators"}>
        <a className={styles.card}>
          <h2 className={styles.loading}>Validators</h2>
          <RingLoader loading={isLoading} cssOverride={cssOverride} color={'#0070f3'} size={80} speedMultiplier={0.8} />
        </a>
      </Link>
    )
  }

  return (
    <Link href={"/validators"}>
      <a className={styles.card}>
        <h2>Validators</h2>
        <p><span>active:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>{info.active}</p>
        <p><span>min bond with:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>{info.minBond}</p>
        <p><span>restake enabled on:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>{info.restakeEnabeled}</p>
        <p><span>additional rewards on:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>{info.additionalRewards}</p>
        <p><span>jailed:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>{info.jailed}</p>
        <p><span>max bond jailed:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>{info.maxBondJailed}</p>
        <p><span>total:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>{info.total}</p>
      </a>
    </Link>
  )
}
