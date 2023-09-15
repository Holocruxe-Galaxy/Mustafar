// ** MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Third Party Imports
import { PolarArea } from 'react-chartjs-2'
import { ChartData, ChartOptions } from 'chart.js'

// ** Custom Components Imports
import OptionsMenu from 'src/@core/components/option-menu'

interface PolarAreaProps {
  info: string
  grey: string
  green: string
  yellow: string
  primary: string
  warning: string
  legendColor: string
}

const ChartjsPolarAreaChart = (props: PolarAreaProps) => {
  // ** Props
  const { info, grey, green, yellow, primary, warning, legendColor } = props

  const options: ChartOptions<'polarArea'> = {
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 500 },
    layout: {
      padding: {
        top: -5,
        bottom: -45
      }
    },
    scales: {
      r: {
        grid: { display: false },
        ticks: { display: false }
      }
    },
    plugins: {
      legend: {
        position: 'right',
        labels: {
          padding: 25,
          boxWidth: 9,
          color: legendColor,
          usePointStyle: true
        }
      }
    }
  }

  const data: ChartData<'polarArea'> = {
    labels: ['Programar', 'Cine', 'Natación', 'Viajar', 'Leer', 'Comer'],
    datasets: [
      {
        borderWidth: 0,
        label: 'Escala',
        data: [19, 17.5, 15, 13.5, 11, 9],
        backgroundColor: [primary, yellow, warning, info, grey, green]
      }
    ]
  }

  return (
    <Card sx={{boxShadow: '4px 4px 4px 0px rgba(255, 255, 255, 0.50)'}}>
      <CardHeader
        title='Intereses'
        action={
          <OptionsMenu
            iconProps={{ fontSize: 20 }}
            options={['Refrescar', 'Editar', 'Compartir']}
            iconButtonProps={{ size: 'small', className: 'card-more-options', sx: { color: 'text.secondary' } }}
          />
        }
      />
      <CardContent>
        <PolarArea data={data} height={350} options={options} />
      </CardContent>
    </Card>
  )
}

export default ChartjsPolarAreaChart
