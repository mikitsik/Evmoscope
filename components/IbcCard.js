import Link from 'next/link'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'

export default function IbcCard() {
  const urlChannels = 'https://evmos-api.polkachu.com/ibc/core/channel/v1/channels'
  const urlConnections = 'https://evmos-api.polkachu.com/ibc/core/connection/v1/connections'
  const [info, setInfo] = useState({})

  async function load() {
    const dataChannels = await fetch(urlChannels)
      .then((response) => {
        if (response.ok) return response.json()
      })

    if (!dataChannels) return

    const dataConnections = await fetch(urlConnections)
      .then((response) => {
        if (response.ok) return response.json()
      })

    if (!dataConnections) return

    setInfo({
      openChannels: dataChannels.channels.filter(ch => ch.state === 'STATE_OPEN').length,
      openConnections: dataConnections.connections.filter(con => con.state === 'STATE_OPEN').length
    })
  }

  useEffect(() => { load() }, [])

  return (
    <Link href={"/ibc"}>
      <a className={styles.card}>
        <h2>IBC</h2>
        <p><span>open channels:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>{info.openChannels}</p>
        <p><span>open connections:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>{info.openConnections}</p>
      </a>
    </Link>
  )
}
