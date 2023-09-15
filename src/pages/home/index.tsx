// ** MUI Imports
import Grid from '@mui/material/Grid'

/* import { AvatarProps } from '@mui/material/Avatar' */
import { Box } from '@mui/system'
import { useTheme } from '@mui/material/styles'

// ** Models
import { Cruxi } from 'src/models/cruxi'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// ** Demo Components Imports
import AnalyticsSessions from 'src/views/dashboards/analytics/AnalyticsSessions'
import AnalyticsVisitsByDay from 'src/views/dashboards/analytics/AnalyticsVisitsByDay'
import AppChat from '../apps/chat'
import ChartjsPolarAreaChart from 'src/views/charts/chartjs/ChartjsPolarAreaChart'
import FooterContent from 'src/layouts/components/shared-components/footer/FooterContent'

// ** Hooks
import { useSettings } from 'src/@core/hooks/useSettings'

// ** Third Party Styles Import
import 'chart.js/auto'
import { Canvas } from '@react-three/fiber'

const Home = () => {
  // ** Hooks
  const { settings } = useSettings()
  const theme = useTheme()

  // Vars
  const { skin } = settings
  const yellowColor = '#ffe802'
  const primaryColor = '#836af9'
  const polarChartGrey = '#4f5d70'
  const polarChartInfo = '#299aff'
  const polarChartGreen = '#28dac6'
  const polarChartWarning = '#ff8131'
  const legendColor = theme.palette.text.secondary

  return (
    <>
      <ApexChartWrapper>
        <Grid container spacing={6} className='match-height'>
          <Grid item xs={12} sm={6} md={4}>
            <Box
              component='div'
              sx={{
                width: '100%',
                height: '27rem' /* '100%' */,
                display: 'flex',
                borderRadius: 1,
                overflow: 'hidden',
                position: 'relative',
                backgroundColor: 'background.paper',
                boxShadow: '4px 4px 4px 0px rgba(255, 255, 255, 0.50)',
/*                 boxShadow: skin === 'bordered' ? 0 : 6, */
                ...(skin === 'bordered' && { border: `1px solid ${theme.palette.divider}` })
              }}
            >
              <Canvas camera={{ position: [0, 0, 5], fov: 40 }}>
                <ambientLight intensity={1.8} />
                <ambientLight intensity={1.8} />
                <directionalLight position={[10, 10, 5]} intensity={1.8} />
                <directionalLight position={[-10, -10, -5]} intensity={1.8} />
                <pointLight position={[0, 50, 0]} intensity={2.8} />
                <Cruxi />
              </Canvas>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={8} >
            <AppChat />
          </Grid>

          <Grid item xs={12} md={4} height={'28.125rem'}>
            <AnalyticsSessions />
          </Grid>
          <Grid item xs={12} md={4} height={'28.125rem'}>
            <AnalyticsVisitsByDay />
          </Grid>
          <Grid item xs={12} md={4} height={'28.125rem'}>
            <ChartjsPolarAreaChart
              info={polarChartInfo}
              grey={polarChartGrey}
              green={polarChartGreen}
              yellow={yellowColor}
              primary={primaryColor}
              warning={polarChartWarning}
              legendColor={legendColor}
            />
          </Grid>
        </Grid>
      </ApexChartWrapper>
      <FooterContent />
    </>
  )
}

export default Home
