import { Layout } from '../../components/Layout'
import styles from '../../styles/Home.module.css'
import { useState, useEffect } from 'react'
import RingLoader from "react-spinners/RingLoader"
import { Line } from 'react-chartjs-2'
import dayjs from 'dayjs'
import { Chart as ChartJS } from 'chart.js/auto'
import AprChart from './components/AprChart'
import ApyChart from './components/ApyChart'
import EvmosIcon from '../../components/EvmosIcon'
import classNames from 'classnames'

const PriceChart = ({ priceData }) => {
  const data = []
  for (let i = 0; i < priceData.length; i++) {
    data.push({x: i, y: priceData[i][1].toFixed(2)})
  }

  const delayBetweenPoints = 30
  const previousY = (ctx) => ctx.index === 0 ? ctx.chart.scales.y.getPixelForValue(100) : ctx.chart.getDatasetMeta(ctx.datasetIndex).data[ctx.index - 1].getProps(['y'], true).y
  const animation = {
    x: {
      type: 'number',
      easing: 'linear',
      duration: delayBetweenPoints,
      from: NaN, // the point is initially skipped
      delay(ctx) {
        if (ctx.type !== 'data' || ctx.xStarted) {
          return 0;
        }
        ctx.xStarted = true;
        return ctx.index * delayBetweenPoints
      }
    },
    y: {
      type: 'number',
      easing: 'linear',
      duration: delayBetweenPoints,
      from: previousY,
      delay(ctx) {
        if (ctx.type !== 'data' || ctx.yStarted) {
          return 0;
        }
        ctx.yStarted = true
        return ctx.index * delayBetweenPoints
      }
    }
  }

  const tooltipTitle = (tooltipItems) => {
    let day

    tooltipItems.forEach(function(tooltipItem) {
      day = dayjs(priceData[tooltipItem.parsed.x][0]).format('MMM D, YYYY')
    })
    return day
  }

  const chartData = {
    labels: priceData.map(p => dayjs(p[0]).format('DD/MM/YYYY')),
    datasets: [{
      label: "  $",
      data: data,
      borderColor: "#0070f3",
      borderWidth: 2,
      radius: 0
    }]
  }

  const opt = {
    animation,
    responsive: true,
    interaction: {
      intersect: false
    },
    plugins: {
      legend: false,
      title: {
        display: true,
        text: "last 100 days chart",
        font: {
          size: 16,
          family: "'-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', 'sans-serif'",
          weight: 300
        },
        color: 'black'
      },
      tooltip: {
        backgroundColor: 'rgba(0, 112, 243, 0.6)',
        bodySpacing: 3,
        callbacks: {
          title: tooltipTitle,
        },
        bodyFont: {
          size: 18,
          family: "'-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', 'sans-serif'",
          weight: 400
        },
        titleFont: {
          size: 18,
          family: "'-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', 'sans-serif'",
          weight: 400
        },
        caretSize: 10
      },
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        type: 'linear'
      },
      y: {
        grid: {
          display: false
        }
      }
    }
  }

  return (
    <>
      <Line data={chartData} options={opt} type={'line'}/>
    </>
  )
}

export default function Economics() {

  const [economicsData, setEconomicsData] = useState({
    priceData: [],
    evmosData: {},
    inflationRate: [],
    sircSupply: 0,
    bondedTokens: 0
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const marketChart = await fetch('https://api.coingecko.com/api/v3/coins/evmos/market_chart?vs_currency=usd&days=100')
      const marketChartJson = await marketChart.json()
      const coingeckoEvmosData = await fetch('https://api.coingecko.com/api/v3/coins/evmos')
      const coingeckoEvmosDataJson = await coingeckoEvmosData.json()
      const inflationData = await fetch('https://rest.bd.evmos.org:1317/evmos/inflation/v1/inflation_rate')
      const inflationDataJson = await inflationData.json()
      const circSupplyData = await fetch('https://rest.bd.evmos.org:1317/evmos/inflation/v1/circulating_supply')
      const circSupplyDataJson = await circSupplyData.json()
      const bondedData = await fetch('https://rest.bd.evmos.org:1317/cosmos/staking/v1beta1/pool')
      const bondedDataJson = await bondedData.json()


      setEconomicsData({
        priceData: marketChartJson.prices,
        evmosData: coingeckoEvmosDataJson,
        inflationRate: parseFloat(inflationDataJson.inflation_rate).toFixed(2),
        sircSupply: (parseFloat(circSupplyDataJson.circulating_supply.amount) / 10**18).toFixed(),
        bondedTokens: (parseFloat(bondedDataJson.pool.bonded_tokens) / 10**18).toFixed()
      })

      setIsLoading(false)
    }
    load()
  }, [])

  const cssOverride = {
    display: "block",
    margin: "0 auto"
  }

  const Markets = () => {
    const tickersCount = economicsData.evmosData.tickers.length
    const tickers = economicsData.evmosData.tickers
    const [isExpand, setIsExpand] = useState(false)
    const toggleExpand = () => {
    setIsExpand((prevState) => { return !prevState})
  }

    return (
      <>
        <h3>{tickersCount} available markets</h3>
        <div className={classNames(styles.marketsContainer, { [styles.marketsContainerExpand]: isExpand })}>
          <div className={styles.markesItem}>
            <div>Exchange</div>
            <div>Pair</div>
            <div>Price</div>
            <div>24h volume</div>
          </div>
          {tickers.map((t, index) => {
            return (
              <a className={styles.markesItem}
                href={t.trade_url}
                target="_blank"
                rel="noopener noreferrer"
                key={index}
              >
                <div>{t.market.name}</div>
                <div className={styles.markesItemPair}>
                  <span>{t.coin_id}</span><span>/{t.target_coin_id}</span>
                </div>
                <div>${t.converted_last.usd}</div>
                <div>${t.converted_volume.usd.toFixed()}</div>
              </a>
            )
          })}

        </div>
        <div className={styles.marketsExpand}>
          <span onClick={() => toggleExpand()}>{isExpand ? 'Compress' : 'Expand'}</span>
        </div>
      </>
    )
  }

  return (
    <Layout>
      <div className={styles.pageContainer}>
        <div className={styles.economicsChartsContainer}>
          <div className={styles.priceChart}>
            {isLoading ?
              <RingLoader loading={isLoading} cssOverride={cssOverride} color={'#0070f3'} size={80} speedMultiplier={0.8} /> :
              <div>
                <h3 className={styles.priceTitle}>
                  <EvmosIcon width={20} height={20} />&nbsp;
                  price ${economicsData.evmosData.market_data.current_price.usd.toFixed(2)}
                </h3>
                <PriceChart priceData={economicsData.priceData}/>
                <div className={styles.underPriceChartSection}>
                  <div>
                    <h4>Epoch mint provision</h4>
                    <div className={styles.underPriceChartSubtitle}>
                      <EvmosIcon width={17} height={17} />&nbsp;&nbsp;847602.7
                    </div>
                  </div>
                  <div>
                    <h4>Inflation</h4>
                    <div className={styles.underPriceChartSubtitle}>
                      %&nbsp;{economicsData.inflationRate}
                    </div>
                  </div>
                  <div>
                    <h4>Mint denom</h4>
                    <div className={styles.underPriceChartSubtitle}>
                      aevmos
                    </div>
                  </div>
                  <div>
                    <h4>Mint decimal</h4>
                    <div className={styles.underPriceChartSubtitle}>
                      18
                    </div>
                  </div>
                  <div>
                    <h4>Circ. supply</h4>
                    <div className={styles.underPriceChartSubtitle}>
                      <EvmosIcon width={17} height={17} />&nbsp; M,&nbsp;
                      {(economicsData.sircSupply / 10**6).toFixed(1)}
                    </div>
                  </div>
                  <div>
                    <h4>Bonded tokens</h4>
                    <div className={styles.underPriceChartSubtitle}>
                      <EvmosIcon width={17} height={17} />&nbsp; M,&nbsp;
                      {(economicsData.bondedTokens / 10**6).toFixed(1)}
                    </div>
                  </div>
                  <div>
                    <h4>Staking ratio</h4>
                    <div className={styles.underPriceChartSubtitle}>
                      % {(economicsData.bondedTokens / economicsData.sircSupply * 100).toFixed(2) }
                    </div>
                  </div>
                </div>
              </div>
            }
          </div>
          <div className={styles.aprApyContainer}>
            <div className={styles.aprChart}>
              <AprChart />
            </div>
            <div className={styles.apyChart}>
              <ApyChart />
            </div>
          </div>
        </div>
        <div className={styles.markets}>
          {isLoading ?
            <RingLoader loading={isLoading} cssOverride={cssOverride} color={'#0070f3'} size={80} speedMultiplier={0.8} /> :
            <Markets />
          }
        </div>
      </div>
    </Layout>
  )
}
