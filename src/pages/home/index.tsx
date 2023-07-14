// ** MUI Imports
import Grid from '@mui/material/Grid'
import { Box } from '@mui/system'
import { useTheme } from '@mui/material/styles'

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
import ButtonBarContent from 'src/layouts/components/horizontal/ButtonBarContent'

const Home = () => {
  const theme = useTheme()
  const { settings } = useSettings()

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
          <Grid item xs={12} sm={6} md={12} height={150}>
            <ButtonBarContent />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Box
              sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                borderRadius: 1,
                overflow: 'hidden',
                position: 'relative',
                backgroundColor: 'background.paper',
                boxShadow: skin === 'bordered' ? 0 : 6,
                ...(skin === 'bordered' && { border: `1px solid ${theme.palette.divider}` })
              }}
            >
              Acá vendría la animación
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={8} height={550}>
            <AppChat />
          </Grid>

          <Grid item xs={12} md={4}>
            <AnalyticsSessions />
          </Grid>
          <Grid item xs={12} md={4}>
            <AnalyticsVisitsByDay />
          </Grid>
          <Grid item xs={12} md={4} height={450}>
            <ChartjsPolarAreaChart
              yellow={yellowColor}
              info={polarChartInfo}
              grey={polarChartGrey}
              primary={primaryColor}
              green={polarChartGreen}
              legendColor={legendColor}
              warning={polarChartWarning}
            />
          </Grid>
        </Grid>
      </ApexChartWrapper>
      <FooterContent />
    </>
  )
}

export default Home
