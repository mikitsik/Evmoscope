import { Layout } from '../../components/Layout'
import styles from '../../styles/Home.module.css'
import { useState, useEffect } from 'react'
import RingLoader from "react-spinners/RingLoader"
import { Line } from 'react-chartjs-2'
import dayjs from 'dayjs'
import { Chart as ChartJS } from 'chart.js/auto'

const PriceChart = ({ priceData }) => {

  const data = []
  let onY = priceData[0][1]
  for (let i = 0; i < priceData.length; i++) {
    onY = priceData[i][1].toFixed(2)
    data.push({x: i, y: onY})
  }

  const delayBetweenPoints = 50
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
        text: "Evmos $USD price chart last 100 days",
        font: {
          size: 20,
          family: "'-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', 'sans-serif'",
          weight: 400
        },
        color: 'black'
      },
      tooltip: {

        backgroundColor: '#3389eb',
        bodySpacing: 4,
        callbacks: {
          title: tooltipTitle,
        },
        bodyFont: {
          size: 20,
          family: "'-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', 'sans-serif'",
          weight: 400
        },
        titleFont: {
          size: 20,
          family: "'-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', 'sans-serif'",
          weight: 400
        },
        caretSize: 10,
        usePointStyle: false
      }
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
