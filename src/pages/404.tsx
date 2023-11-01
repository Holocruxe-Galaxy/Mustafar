// ** React Imports
import { ReactNode } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Components
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Styled Components
const BoxWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    width: '90vw'
  }
}))

// ** 3D Model
// import { Canvas } from '@react-three/fiber'
// import { PerspectiveCamera } from '@react-three/drei'

// !! De acá viene el renderizado de Cruxis que se usa en el Canvas
// import CruxisCanvas from '../@core/components/custom-errors/models/Cruxis'

// TODO: Descomentar lo de abajo para darle estilos al PNG
// const Img = styled('img')(({ theme }) => ({
//   marginTop: theme.spacing(15),
//   marginBottom: theme.spacing(15),
//   [theme.breakpoints.down('lg')]: {
//     height: 450,
//     marginTop: theme.spacing(10),
//     marginBottom: theme.spacing(10)
//   },
//   [theme.breakpoints.down('md')]: {
//     height: 400
//   }
// }))

const Error404 = () => {
  return (
    <Box component='div' className='content-center'>
      <Box
        component='div'
        sx={{ p: 5, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}
      >
        <BoxWrapper>
          <Typography variant='h1' sx={{ mb: 2.5 }}>
            404
          </Typography>
          <Typography variant='h5' sx={{ mb: 2.5, letterSpacing: '0.18px', fontSize: '1.5rem !important' }}>
            Page Not Found ⚠️
          </Typography>
          <Typography variant='body2'>We couldn&prime;t find the page you are looking for.</Typography>
        </BoxWrapper>
        {/* //!! Descomentar una vez que se carguen los PNG en public */}
        {/* <Img alt='error-illustration' src='/images/pages/404.png' /> */}
        {/* //!! El canvas se utiliza si vas a usar el Cruxis como modelo 3D, si se usa como PNG no hace falta. Hablarlo con Anita */}
        {/* <Canvas shadows>
          <PerspectiveCamera makeDefault position={[18, 15, 40]} fov={29}></PerspectiveCamera>
          <ambientLight />
          <pointLight position={[10, 10, 20]} />

          <CruxisCanvas />
        </Canvas> */}
        <Button href='/' component={Link} variant='contained' sx={{ px: 5.5, mt: 6 }}>
          Back to Home
        </Button>
      </Box>
    </Box>
  )
}

Error404.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default Error404
