// ** React Imports
import { useEffect, useState, ReactNode, useRef } from 'react'

// ** Next Imports
import Link from 'next/link'

// ** MUI Components
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import Box, { BoxProps } from '@mui/material/Box'
import useMediaQuery from '@mui/material/useMediaQuery'
import { styled, useTheme } from '@mui/material/styles'
import Typography, { TypographyProps } from '@mui/material/Typography'
import MuiFormControlLabel, { FormControlLabelProps } from '@mui/material/FormControlLabel'

// ** ThreeJS Imports
import { Canvas } from '@react-three/fiber'
import { Environment, Stars, PerspectiveCamera } from '@react-three/drei'
import HoloplanetCanvas from '../../@core/components/login/models/Holoplanet'
import BotCanvas from '../../@core/components/login/models/Officialbot'
import Particles from '../../@core/components/login/adds/Particles'

import { makeStyles } from '@mui/styles'

// ** Third Party Imports
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Hooks
import { useAuth } from 'src/hooks/useAuth'
import { useSettings } from 'src/@core/hooks/useSettings'

// ** Auth0 Imports
import { useUser } from '@auth0/nextjs-auth0/client'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'
import { Icon } from '@mui/material'
import Rocket from 'src/@core/icons/login/Rocket'
import HolocruxeLogo from '../../@core/icons/login/HolocruxeLogo'
import FacebookIcon from '../../@core/icons/login/FacebookIcon'
import GoogleIcon from 'src/@core/icons/login/GoogleIcon'
import LinkedinIcon from 'src/@core/icons/login/LinkedInIcon'

const RightWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.up('md')]: {
    maxWidth: 400
  },
  [theme.breakpoints.up('lg')]: {
    maxWidth: 450
  }
}))

const BoxWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.down('md')]: {
    maxWidth: 400
  }
}))

const TypographyStyled = styled(Typography)<TypographyProps>(({ theme }) => ({
  fontWeight: 600,
  letterSpacing: '0.18px',
  marginBottom: theme.spacing(1.5),
  [theme.breakpoints.down('md')]: { marginTop: theme.spacing(8) }
}))

const FormControlLabel = styled(MuiFormControlLabel)<FormControlLabelProps>(({ theme }) => ({
  '& .MuiFormControlLabel-label': {
    fontSize: '0.875rem',
    color: theme.palette.text.secondary
  }
}))

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(5).required()
})

const defaultValues = {
  password: 'admin',
  email: 'admin@materialize.com'
}

interface FormData {
  email: string
  password: string
}

const useStyles = makeStyles(() => ({
  picker: {
    position: 'absolute',
    top: 90,
    zIndex: 9999
  },
  iconButton: {
    '&:hover': {
      backgroundColor: 'transparent'
    },
    '&:active': {
      backgroundColor: 'transparent'
    },
    '& .MuiIconButton-label': {
      transition: 'none'
    }
  }
}))

const LoginPage = () => {
  const [rememberMe, setRememberMe] = useState<boolean>(true)
  const { user, isLoading } = useUser()

  // ** Hooks
  const auth = useAuth()
  const theme = useTheme()
  const { settings } = useSettings()
  const hidden = useMediaQuery(theme.breakpoints.down('md'))

  // ** Vars
  const { skin } = settings

  const { setError, handleSubmit } = useForm({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  const onSubmit = (data: FormData) => {
    const { email, password } = data
    auth.login({ email, password, rememberMe }, () => {
      setError('email', {
        type: 'manual',
        message: 'Email or Password is invalid'
      })
    })
  }

  const classes = useStyles()

  const mouse = useRef([0, 0])

  useEffect(() => {
    if (window.localStorage.getItem('createAccount') === 'true' && user) {
      window.localStorage.removeItem('createAccount')
      auth.handleRegister()

      return
    }

    if (user) {
      auth.login({ rememberMe }, () => {
        setError('email', {
          type: 'manual',
          message: 'Email or Password is invalid'
        })
      })
    }
  }, [user, isLoading, auth, rememberMe, setError])

  return (
    <Box component='div' sx={{ width: '100vw', height: '100vh' }}>
      {!hidden ? (
        <Canvas shadows>
          <group rotation={[0, 0, Math.PI / 5]}>
            <Stars count={2500} speed={1} />
          </group>
          <PerspectiveCamera makeDefault position={[0, 5.5, 11]} fov={73}></PerspectiveCamera>
          <Particles count={600} mouse={mouse} />
          <Environment files='/images/login-bg/bg.hdr' background blur={0.5} />
          <HoloplanetCanvas />
          <BotCanvas />
        </Canvas>
      ) : null}

      <RightWrapper
        sx={
          skin === 'bordered' && !hidden
            ? {
                borderLeft: `1px solid ${theme.palette.divider}`,
                opacity: 0.7
              }
            : {}
        }
      >
        <Box
          sx={{
            top: 30,
            left: 34,
            display: 'flex',
            position: 'absolute',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          component='div'
        >
          <HolocruxeLogo />
        </Box>

        <Box
          sx={{
            p: 9,
            marginTop: 50,
            height: '60%',
            width: '28rem',
            borderRadius: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgb(32, 67, 94, 0.5)',
            position: 'absolute',
            backdropFilter: 'blur(2px)',
            top: 0,
            right: 40
          }}
          component='div'
        >
          <BoxWrapper>
            <Box component='div' sx={{ my: 6, textAlign: 'center' }}>
              <TypographyStyled variant='h5'>Bienvenido a Holocruxe</TypographyStyled>
              <Icon sx={{ position: 'absolute', right: 54, top: 100 }}>
                <Rocket />
              </Icon>
              <Typography variant='body2' sx={{ marginTop: 4, color: 'text.secondary' }}>
                Ingresa a tu cuenta y dale vida a tus momentos
              </Typography>
            </Box>

            <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
              <Button fullWidth size='large' href={'/api/auth/login'} variant='contained' sx={{ mt: 9, mb: 3 }}>
                Iniciar Sesión
              </Button>

              <Box
                sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}
                component='div'
              >
                <Typography sx={{ mr: 2, color: 'text.secondary' }}>Eres nuevo en la plataforma?</Typography>
                <Typography
                  onClick={() => {
                    window.localStorage.setItem('createAccount', 'true')
                    window.location.href = '/api/auth/login'
                  }}
                  href='/api/auth/login'
                  component={Link}
                  sx={{ textDecoration: 'none' }}
                >
                  Regístrate
                </Typography>
              </Box>

              <Box component='div' sx={{ my: 3 }}>
                <FormControlLabel
                  label='Recordarme'
                  control={<Checkbox checked={rememberMe} onChange={e => setRememberMe(e.target.checked)} />}
                />
              </Box>

              <Divider
                sx={{
                  '& .MuiDivider-wrapper': { px: 4 },
                  mt: theme => `${theme.spacing(5)} !important`,
                  mb: theme => `${theme.spacing(7.5)} !important`
                }}
              >
                or
              </Divider>

              <Box component='div' sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <IconButton href='/api/auth/login' component={Link} className={classes.iconButton}>
                  <FacebookIcon />
                </IconButton>
                <IconButton href='/api/auth/login' component={Link} className={classes.iconButton}>
                  <GoogleIcon />
                </IconButton>
                <IconButton href='/api/auth/login' component={Link} className={classes.iconButton}>
                  <LinkedinIcon />
                </IconButton>
              </Box>
            </form>
          </BoxWrapper>
        </Box>
      </RightWrapper>
    </Box>
  )
}

LoginPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

LoginPage.guestGuard = true

export default LoginPage
