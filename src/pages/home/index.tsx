// ** MUI Imports
import Grid from '@mui/material/Grid'

/* import { AvatarProps } from '@mui/material/Avatar' */
import { Box } from '@mui/system'
import { useTheme } from '@mui/material/styles'

// ** Models
import { Cruxi } from 'src/models/cruxi'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

import AppChat from '../apps/chat'
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

  return (
    <>
      <ApexChartWrapper>
        <Grid container spacing={6} className='match-height'>
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
        </Grid>
      </ApexChartWrapper>
      <FooterContent />
    </>
  )
}

export default Home
