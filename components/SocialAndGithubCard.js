import Link from 'next/link'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import RingLoader from "react-spinners/RingLoader"

export default function SocialAndGithubCard() {
  const urlCoingecko = 'https://api.coingecko.com/api/v3/coins/evmos'
  const urlPolkachu = 'https://evmos-api.polkachu.com/cosmos/gov/v1beta1/proposals'
  const [socialAndDevInfo, setSocialAndDevInfo] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  async function load() {
    const dataCoingecko = await fetch(urlCoingecko)
      .then((response) => {
        if (response.ok) return response.json()
      })

    if (!dataCoingecko) return

    const dataProposals = await fetch(urlPolkachu)
      .then((response) => {
        if (response.ok) return response.json()
      })

    if (!dataProposals) return


    setSocialAndDevInfo({
      votingProposals: dataProposals.proposals.filter(p => p.status === 'PROPOSAL_STATUS_VOTING_PERIOD').length,
      totalProposals: dataProposals.pagination.total,
      twitterFollowers: dataCoingecko.community_data.twitter_followers,
      telegramUsers: dataCoingecko.community_data.telegram_channel_user_count,
      forks: dataCoingecko.developer_data.forks,
      stars: dataCoingecko.developer_data.stars,
      issues: dataCoingecko.developer_data.total_issues - dataCoingecko.developer_data.closed_issues,
      contributors: dataCoingecko.developer_data.pull_request_contributors
    })

    setIsLoading(false)
  }

  useEffect(() => { load() }, [])

  const cssOverride = {
    display: "block",
    margin: "0 auto"
  }

  if (isLoading) {
    return (
      <Link href={"/social_and_github"}>
        <a className={styles.card}>
          <h2 className={styles.loading}>Social</h2>
          <RingLoader loading={isLoading} cssOverride={cssOverride} color={'#0070f3'} size={80} speedMultiplier={0.8} />
          <h2 className={styles.secondLoading}>Github</h2>
          <RingLoader loading={isLoading} cssOverride={cssOverride} color={'#0070f3'} size={80} speedMultiplier={0.8} />
        </a>
      </Link>
    )
  }

  return (
    <Link href={"/social_and_github"}>
      <a className={styles.card}>
        <h2>Social</h2>
        <p><span>voting proposals:</span>{socialAndDevInfo.votingProposals}</p>
        <p><span>total proposals:</span>{socialAndDevInfo.totalProposals}</p>
        <p><span>twitter followers:</span>{socialAndDevInfo.twitterFollowers}</p>
        <p><span>telegram users:</span>{socialAndDevInfo.telegramUsers}</p>
        <h2 className={styles.secondHeader}>Github</h2>
        <p><span>forks:</span>{socialAndDevInfo.forks}</p>
        <p><span>stars:</span>{socialAndDevInfo.stars}</p>
        <p><span>issues:</span>{socialAndDevInfo.issues}</p>
        <p><span>contributors:</span>{socialAndDevInfo.contributors}</p>
      </a>
    </Link>
  )
}
