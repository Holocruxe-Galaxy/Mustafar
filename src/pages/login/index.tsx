// ** React Imports
import { useEffect, useState, ReactNode, MouseEvent, useRef } from 'react'

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
      backgroundColor: 'transparent' // Set the background color to transparent on hover
    },
    '&:active': {
      backgroundColor: 'transparent' // Set the background color to transparent when active (clicked)
    },
    '& .MuiIconButton-label': {
      transition: 'none' // Remove any transitions on the label (icon) to prevent animations
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
            left: 40,
            display: 'flex',
            position: 'absolute',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          component='div'
        >
          <svg xmlns='http://www.w3.org/2000/svg' width='280' x='744.13' y='-640.34' viewBox='0 0 1617.68 257.73'>
            <path
              fill='#CCC7CE'
              d='M235.07,144.74a16.45,16.45,0,0,0-16.46,16.45v5.48H158.29V115.49a16.45,16.45,0,1,0-32.9,0v124.3a16.45,16.45,0,1,0,32.9,0V192.26h60.32v47.53a16.46,16.46,0,0,0,32.91,0v-78.6A16.45,16.45,0,0,0,235.07,144.74Z'
              transform='translate(-64.16 -39.63)'
            />
            <path
              fill='#CCC7CE'
              d='M552.21,227.91H537.58V116.41a16.45,16.45,0,1,0-32.9,0V240.7c0,.31,0,.61.05.92s-.05.6-.05.91a14.62,14.62,0,0,0,14.62,14.62h32.91a14.62,14.62,0,1,0,0-29.24Z'
              transform='translate(-64.16 -39.63)'
            />
            <path
              fill='#CCC7CE'
              d='M1467.46,234,1432,178.74l11.63-18A14.63,14.63,0,1,0,1419,144.86l-4.42,6.86-30.48-47.45a14.63,14.63,0,0,0-24.61,15.81l37.67,58.63-34.67,53.74a14.62,14.62,0,0,0,24.57,15.86l27.47-42.57,28.29,44A14.63,14.63,0,1,0,1467.46,234Z'
              transform='translate(-64.16 -39.63)'
            />
            <circle fill='#349AEF' cx='170.91' cy='72.2' r='13.71' />
            <circle fill='#349AEF' cx='641.36' cy='72.2' r='13.71' />
            <circle fill='#349AEF' cx='1231.08' cy='72.2' r='13.71' />
            <circle fill='#349AEF' cx='1042.81' cy='201.98' r='13.71' />
            <circle fill='#349AEF' cx='883.79' cy='191.01' r='13.71' />
            <circle fill='#349AEF' cx='529.17' cy='203.81' r='13.71' />
            <circle fill='#349AEF' cx='1388.28' cy='72.2' r='13.71' />
            <circle fill='#349AEF' cx='1543.65' cy='72.2' r='13.71' />
            <circle fill='#349AEF' cx='312.34' cy='72.2' r='13.71' />
            <path
              fill='#CCC7CE'
              d='M429.05,116.45v.07c-1.89-1.84-3.68-3.58-4.72-4.56-4-3.71-12.05-1.87-16.28,3-4,4.63-5.63,14.14-2.32,18.5,1.93,2.53,9,7.77,10.78,9.11a54.77,54.77,0,0,1,12.54,35c0,29.78-23.32,53.92-52.09,53.92s-52.1-24.14-52.1-53.92a54.87,54.87,0,0,1,10.85-32.9h0s8.1-9.13,11.09-11.88c4-3.7,2.74-11.89-1.83-16.45-4.33-4.33-13.7-6.65-18.28-3.66-3.07,2-10.23,10.51-10.23,10.51h0a78.94,78.94,0,0,0-22.68,55.29c0,44.42,37,80.43,82.71,80.43s82.71-36,82.71-80.43A79.4,79.4,0,0,0,429.05,116.45ZM421.9,138l1.24-1.22C422.74,137.22,422.33,137.63,421.9,138Z'
              transform='translate(-64.16 -39.63)'
            />
            <path
              fill='#CCC7CE'
              d='M758.07,116.45v.07c-1.89-1.84-3.68-3.58-4.72-4.56-4-3.71-12.05-1.87-16.27,3-4,4.63-5.64,14.14-2.33,18.5,1.93,2.53,9,7.77,10.78,9.11a54.77,54.77,0,0,1,12.54,35c0,29.78-23.32,53.92-52.09,53.92s-52.1-24.14-52.1-53.92a54.87,54.87,0,0,1,10.85-32.9h0s8.1-9.13,11.09-11.88c4-3.7,2.74-11.89-1.83-16.45-4.33-4.33-13.7-6.65-18.28-3.66-3.07,2-10.23,10.51-10.23,10.51h0a78.94,78.94,0,0,0-22.68,55.29c0,44.42,37,80.43,82.71,80.43s82.71-36,82.71-80.43A79.4,79.4,0,0,0,758.07,116.45ZM750.92,138l1.24-1.22C751.76,137.22,751.35,137.63,750.92,138Z'
              transform='translate(-64.16 -39.63)'
            />
            <path
              fill='#CCC7CE'
              d='M957.08,113.66c-4.08-5.59-23.68-10.8-23.68-10.8v0a84.57,84.57,0,0,0-27.94-4.75c-45.69,0-82.72,36-82.72,80.42,0,33.11,20.59,61.54,50,73.87a16.82,16.82,0,0,0,3.94,2c20.1,7.31,34.73,5.48,34.73,5.48,14.62-1.82,12.79-16.45,12.79-16.45,0-9.14-11-11-11-11-19.05,0-31.52-6.56-32.77-7.25.12-.11.23-.23.36-.34a54.21,54.21,0,0,1-27-47.25c0-29.78,23.32-53.92,52.09-53.92a50.48,50.48,0,0,1,21.52,4.82c5.08,3,12.65,8,16.87,8.89s11,1.82,14.62-3.66C964.65,125.17,960.06,117.74,957.08,113.66Z'
              transform='translate(-64.16 -39.63)'
            />
            <path
              fill='#CCC7CE'
              d='M1085.33,100h-54.22s0,.11.07.16a13.16,13.16,0,0,0-1.9-.16h-5.48a12.79,12.79,0,0,0-12.79,12.8V244.36a12.79,12.79,0,0,0,12.79,12.79h5.48a12.8,12.8,0,0,0,12.8-12.79V200.49h33.08a14.94,14.94,0,0,0,.94,3.69l3.81,9.57a15,15,0,1,0,27.91-11.11l-3-7.63a38.58,38.58,0,0,0,18.64-33v-23.6C1123.42,117.26,1106.28,100,1085.33,100Zm-43.25,78.64V126.83h28.11a23.85,23.85,0,0,1,23.66,23.89v4a23.85,23.85,0,0,1-23.66,23.89Z'
              transform='translate(-64.16 -39.63)'
            />
            <path
              fill='#CCC7CE'
              d='M1309.87,163.37v-1.51l-.13.07c-.65-5.8-3.23-14.19-12.67-15.36-14.62-1.83-16.45,14.62-16.45,14.62l.81,1.08c-.27-.14-.55-.26-.81-.41v32.75a34.3,34.3,0,0,1-34.21,34.21h-8.35a34.3,34.3,0,0,1-34.21-34.21v-71s1.83-19.13-12.8-21-16.45,14.62-16.45,14.62l.11.14c-.06,1.17-.11,2.34-.11,3.51v74a66,66,0,0,0,65.81,65.81h3.65A66,66,0,0,0,1309.87,195V167.52A29,29,0,0,0,1309.87,163.37Z'
              transform='translate(-64.16 -39.63)'
            />
            <path
              fill='#CCC7CE'
              d='M1614.21,226.08h-60.32V191.35h51.18a14.63,14.63,0,0,0,0-29.25h-51.18V127.37h14.62a14.62,14.62,0,1,0,0-29.24h-32.9A14.61,14.61,0,0,0,1521,112.75c0,.31,0,.61,0,.91s0,.61,0,.92V238.87a16.44,16.44,0,0,0,14,16.26,6.15,6.15,0,0,0,1.49.19h12.8a6.26,6.26,0,0,0,1.07-.1,15.28,15.28,0,0,0,1.67.1h62.15a14.62,14.62,0,0,0,0-29.24Z'
              transform='translate(-64.16 -39.63)'
            />
          </svg>
        </Box>
        <Box
          sx={{
            p: 9,
            marginTop: 50,
            height: '50%',
            width: '28rem',
            borderRadius: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'background.paper',
            position: 'absolute',
            opacity: 0.7,
            top: 0,
            right: 40
          }}
          component='div'
        >
          <BoxWrapper>
            <Box component='div' sx={{ my: 6, textAlign: 'center' }}>
              <TypographyStyled variant='h5'>{`Bienvenido a Holocruxe! 🚀`}</TypographyStyled>
              <Typography variant='body2'>Ingresa a tu cuenta y dale vida a tus momentos</Typography>
            </Box>

            <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
              <Button
                fullWidth
                size='large'
                href={'/api/auth/login'}
                variant='contained'
                sx={{ mt: 9, mb: 3, backgroundColor: '#349AEF' }}
              >
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
                  sx={{ color: '#349AEF', textDecoration: 'none' }}
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
                <IconButton
                  href='/'
                  component={Link}
                  onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}
                  className={classes.iconButton}
                >
                  <svg width='42' height='42' viewBox='0 0 42 42' fill='none' xmlns='http://www.w3.org/2000/svg'>
                    <path
                      d='M35.7 0H6.3C2.82061 0 0 2.82061 0 6.3V35.7C0 39.1794 2.82061 42 6.3 42H35.7C39.1794 42 42 39.1794 42 35.7V6.3C42 2.82061 39.1794 0 35.7 0Z'
                      fill='#1877F2'
                    />
                    <path
                      d='M29.1703 27.0703L30.1055 21H24.2812V17.0625C24.2812 15.4055 25.0934 13.7812 27.702 13.7812H30.3516V8.61328C30.3516 8.61328 27.948 8.20312 25.6512 8.20312C20.8523 8.20312 17.7187 11.107 17.7187 16.3734V21H12.3867V27.0703H17.7187V42H24.2812V27.0703H29.1703Z'
                      fill='white'
                    />
                  </svg>
                </IconButton>
                <IconButton
                  href='/'
                  component={Link}
                  onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}
                  className={classes.iconButton}
                >
                  <svg width='42' height='42' viewBox='0 0 42 42' fill='none' xmlns='http://www.w3.org/2000/svg'>
                    <path
                      d='M33 0H9C4.02944 0 0 4.02944 0 9V33C0 37.9706 4.02944 42 9 42H33C37.9706 42 42 37.9706 42 33V9C42 4.02944 37.9706 0 33 0Z'
                      fill='url(#paint0_radial_847_38682)'
                    />
                    <path
                      d='M33 0H9C4.02944 0 0 4.02944 0 9V33C0 37.9706 4.02944 42 9 42H33C37.9706 42 42 37.9706 42 33V9C42 4.02944 37.9706 0 33 0Z'
                      fill='url(#paint1_radial_847_38682)'
                    />
                    <path
                      d='M33 0H9C4.02944 0 0 4.02944 0 9V33C0 37.9706 4.02944 42 9 42H33C37.9706 42 42 37.9706 42 33V9C42 4.02944 37.9706 0 33 0Z'
                      fill='url(#paint2_radial_847_38682)'
                    />
                    <path
                      d='M31.5 12.75C31.5 13.9926 30.4926 15 29.25 15C28.0074 15 27 13.9926 27 12.75C27 11.5074 28.0074 10.5 29.25 10.5C30.4926 10.5 31.5 11.5074 31.5 12.75Z'
                      fill='white'
                    />
                    <path
                      fill-rule='evenodd'
                      clip-rule='evenodd'
                      d='M21 28.5C25.1421 28.5 28.5 25.1421 28.5 21C28.5 16.8579 25.1421 13.5 21 13.5C16.8579 13.5 13.5 16.8579 13.5 21C13.5 25.1421 16.8579 28.5 21 28.5ZM21 25.5C23.4853 25.5 25.5 23.4853 25.5 21C25.5 18.5146 23.4853 16.5 21 16.5C18.5146 16.5 16.5 18.5146 16.5 21C16.5 23.4853 18.5146 25.5 21 25.5Z'
                      fill='white'
                    />
                    <path
                      fill-rule='evenodd'
                      clip-rule='evenodd'
                      d='M6 20.4C6 15.3595 6 12.8392 6.98094 10.9141C7.8438 9.22062 9.22062 7.8438 10.9141 6.98094C12.8392 6 15.3595 6 20.4 6H21.6C26.6404 6 29.1607 6 31.0858 6.98094C32.7793 7.8438 34.1562 9.22062 35.019 10.9141C36 12.8392 36 15.3595 36 20.4V21.6C36 26.6404 36 29.1607 35.019 31.0858C34.1562 32.7793 32.7793 34.1562 31.0858 35.019C29.1607 36 26.6404 36 21.6 36H20.4C15.3595 36 12.8392 36 10.9141 35.019C9.22062 34.1562 7.8438 32.7793 6.98094 31.0858C6 29.1607 6 26.6404 6 21.6V20.4ZM20.4 9H21.6C24.1698 9 25.9165 9.00234 27.2668 9.11265C28.5822 9.22011 29.2548 9.41489 29.724 9.65396C30.8529 10.2292 31.7707 11.1471 32.346 12.276C32.5851 12.7452 32.7799 13.4178 32.8873 14.7331C32.9976 16.0834 33 17.8302 33 20.4V21.6C33 24.1698 32.9976 25.9165 32.8873 27.2668C32.7799 28.5822 32.5851 29.2548 32.346 29.724C31.7707 30.8529 30.8529 31.7707 29.724 32.346C29.2548 32.5851 28.5822 32.7799 27.2668 32.8873C25.9165 32.9976 24.1698 33 21.6 33H20.4C17.8302 33 16.0834 32.9976 14.7331 32.8873C13.4178 32.7799 12.7452 32.5851 12.276 32.346C11.1471 31.7707 10.2292 30.8529 9.65396 29.724C9.41489 29.2548 9.22011 28.5822 9.11265 27.2668C9.00234 25.9165 9 24.1698 9 21.6V20.4C9 17.8302 9.00234 16.0834 9.11265 14.7331C9.22011 13.4178 9.41489 12.7452 9.65396 12.276C10.2292 11.1471 11.1471 10.2292 12.276 9.65396C12.7452 9.41489 13.4178 9.22011 14.7331 9.11265C16.0834 9.00234 17.8302 9 20.4 9Z'
                      fill='white'
                    />
                    <defs>
                      <radialGradient
                        id='paint0_radial_847_38682'
                        cx='0'
                        cy='0'
                        r='1'
                        gradientUnits='userSpaceOnUse'
                        gradientTransform='translate(15 31.5) rotate(-55.3758) scale(38.2794)'
                      >
                        <stop stop-color='#B13589' />
                        <stop offset='0.79309' stop-color='#C62F94' />
                        <stop offset='1' stop-color='#8A3AC8' />
                      </radialGradient>
                      <radialGradient
                        id='paint1_radial_847_38682'
                        cx='0'
                        cy='0'
                        r='1'
                        gradientUnits='userSpaceOnUse'
                        gradientTransform='translate(13.5 43.5) rotate(-65.1363) scale(33.8913)'
                      >
                        <stop stop-color='#E0E8B7' />
                        <stop offset='0.444662' stop-color='#FB8A2E' />
                        <stop offset='0.71474' stop-color='#E2425C' />
                        <stop offset='1' stop-color='#E2425C' stop-opacity='0' />
                      </radialGradient>
                      <radialGradient
                        id='paint2_radial_847_38682'
                        cx='0'
                        cy='0'
                        r='1'
                        gradientUnits='userSpaceOnUse'
                        gradientTransform='translate(-2.25 1.5) rotate(-8.1301) scale(58.3364 12.4775)'
                      >
                        <stop offset='0.156701' stop-color='#406ADC' />
                        <stop offset='0.467799' stop-color='#6A45BE' />
                        <stop offset='1' stop-color='#6A45BE' stop-opacity='0' />
                      </radialGradient>
                    </defs>
                  </svg>
                </IconButton>
                <IconButton href='/api/auth/login' component={Link} className={classes.iconButton}>
                  <svg width='42' height='42' viewBox='0 0 42 42' fill='none' xmlns='http://www.w3.org/2000/svg'>
                    <path
                      d='M35.7 0H6.3C2.82061 0 0 2.82061 0 6.3V35.7C0 39.1794 2.82061 42 6.3 42H35.7C39.1794 42 42 39.1794 42 35.7V6.3C42 2.82061 39.1794 0 35.7 0Z'
                      fill='#0077B5'
                    />
                    <path
                      d='M11.6484 14.3555C13.3247 14.3555 14.6836 12.9966 14.6836 11.3203C14.6836 9.64404 13.3247 8.28516 11.6484 8.28516C9.97217 8.28516 8.61328 9.64404 8.61328 11.3203C8.61328 12.9966 9.97217 14.3555 11.6484 14.3555Z'
                      fill='white'
                    />
                    <path d='M20.0156 15.9141V32.1563V15.9141ZM11.6484 15.9141V32.1563V15.9141Z' fill='white' />
                    <path d='M20.0156 15.9141V32.1563M11.6484 15.9141V32.1563' stroke='white' stroke-width='6.21198' />
                    <path
                      d='M22.6406 23.1328C22.6406 21.4922 23.707 19.8516 25.5938 19.8516C27.5625 19.8516 28.3008 21.3281 28.3008 23.543V32.1562H33.7148V22.8867C33.7148 17.8828 31.0898 15.5859 27.4805 15.5859C24.6914 15.5859 23.2969 17.1445 22.6406 18.2109'
                      fill='white'
                    />
                  </svg>
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
