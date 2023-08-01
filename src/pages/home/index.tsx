// ** MUI Imports
import Grid from '@mui/material/Grid'

/* import { AvatarProps } from '@mui/material/Avatar' */
import { Box } from '@mui/system'
import { useTheme } from '@mui/material/styles'

/* import { styled } from '@mui/material/styles' */

// ** Models

import { Cruxi } from 'src/models/cruxi'

// ** Custom Components Imports
/* import CustomAvatar from 'src/@core/components/mui/avatar' */

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

/* import ButtonBarContent from 'src/layouts/components/horizontal/ButtonBarContent' */
import { Canvas } from '@react-three/fiber'

// ** Styled Avatar component
/* const Avatar = styled(CustomAvatar)<AvatarProps>(({ theme }) => ({
  width: 40,
  height: 40,
  marginRight: theme.spacing(4)
})) */

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
            {/* <ButtonBarContent>
                             <Grid item xs={12}>
                <Box
                  sx={{
                    width: '20%',
                    height: '50%',
                    display: 'flex',
                    borderRadius: 1,
                    overflow: 'hidden',
                    position: 'relative',
                    boxShadow: skin === 'bordered' ? 0 : 6,
                    ...(skin === 'bordered' && { border: `1px solid ${theme.palette.divider}` })
                  }}
                >
                  <Avatar skin='light'  color={color}  variant='rounded'>
                     {icon}
                  </Avatar>
                </Box>
              </Grid>
            </ButtonBarContent> */}
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Box
              component='div'
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

          <Grid item xs={12} sm={6} md={8} height={550}>
            <AppChat />
          </Grid>

          <Grid item xs={12} md={4} /* height={450} */>
            <AnalyticsSessions />
          </Grid>
          <Grid item xs={12} md={4} /* height={450} */>
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
