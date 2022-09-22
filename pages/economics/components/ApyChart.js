import { Line } from 'react-chartjs-2'
import { Chart as ChartJS } from 'chart.js/auto'
import { aprAndApy } from '../../../components/aprAndApy'
import styles from '../../../styles/Home.module.css'

export default function ApyChart() {
  const apy = []
  for (let i = 0; i < aprAndApy.length; i++) {
    apy.push({x: i, y: aprAndApy[i][2]})
  }

  const delayBetweenPoints = 40
  const previousY = (ctx) => ctx.index === 0 ? ctx.chart.scales.y.getPixelForValue(100) : ctx.chart.getDatasetMeta(ctx.datasetIndex).data[ctx.index - 1].getProps(['y'], true).y
  const animation = {
    x: {
      type: 'number',
      easing: 'linear',
      duration: delayBetweenPoints,
      from: NaN, // the point is initially skipped
      delay(ctx) {
        if (ctx.type !== 'data' || ctx.xStarted) {
          return 0
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
          return 0
        }
        ctx.yStarted = true
        return ctx.index * delayBetweenPoints
      }
    }
  }

  const tooltipTitle = (tooltipItems) => {
    let day

    tooltipItems.forEach(function(tooltipItem) {
      day = aprAndApy[tooltipItem.parsed.x][0]
    })
    return day
  }

  const chartData = {
    labels: aprAndApy.map(d => {return d[0]}),
    datasets: [{
      label: "  %",
      borderColor: '#0070f3',
      borderWidth: 2,
      radius: 0,
      data: apy
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
        text: "last 80 days chart",
        font: {
          size: 16,
          family: "'-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', 'sans-serif'",
          weight: 300
        },
        color: 'black'
      },
      tooltip: {
        backgroundColor: 'rgba(0, 112, 243, 0.6)',
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
    <div>
      <h4 className={styles.aprApyTitle}>
        APY {aprAndApy[aprAndApy.length - 1][2]}%
      </h4>
      <Line data={chartData} options={opt} type={'line'}/>
    </div>
  )
}
