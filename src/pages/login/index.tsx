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
          <Environment files='/images/login-bg/bg.hdr' background blur={#59C1BD
          <HoloplanetCa#59C1BD
          <BotCa#59C1BD
        </#59C1BD
      ) #59C1BD
      <Right#59C1BD
  #59C1BD
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
            <circle fill='#59C1BD' cx='170.91' cy='72.2' r='13.71' />
            <circle fill='#59C1BD' cx='641.36' cy='72.2' r='13.71' />
            <circle fill='#59C1BD' cx='1231.08' cy='72.2' r='13.71' />
            <circle fill='#59C1BD' cx='1042.81' cy='201.98' r='13.71' />
            <circle fill='#59C1BD' cx='883.79' cy='191.01' r='13.71' />
            <circle fill='#59C1BD' cx='529.17' cy='203.81' r='13.71' />
            <circle fill='#59C1BD' cx='1388.28' cy='72.2' r='13.71' />
            <circle fill='#59C1BD' cx='1543.65' cy='72.2' r='13.71' />
            <circle fill='#59C1BD' cx='312.34' cy='72.2' r='13.71' />
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
              <TypographyStyled variant='h5'>{`Bienvenido a Holocruxe`}</TypographyStyled>
              <Icon sx={{ position: 'absolute', right: 53, top: 55 }}>
                <svg width='50' height='44' viewBox='0 0 85 85' fill='none' xmlns='http://www.w3.org/2000/svg'>
                  <path
                    d='M1.2666 24.7425L6.75582 19.3339L16.1016 17.6777L15.1778 22.569L2.54316 26.4524L1.72684 26.0997L1.2666 24.7425Z'
                    fill='#010032'
                  />
                  <path
                    d='M7.7066 20.7208L1.74707 26.1361L6.13105 28.2727L12.786 24.8763V23.2739L14.1465 19.6055L7.7066 20.7208ZM21.8093 30.258L18.9303 31.5077L16.2125 37.2691C16.2125 37.2691 18.6044 42.5668 18.7119 42.5668C18.8194 42.5668 20.18 42.6743 20.18 42.6743L25.0175 37.2657L26.2403 28.0274L21.8093 30.258Z'
                    fill='#010032'
                  />
                  <path
                    d='M18.9804 34.5212C18.9804 34.5212 20.5829 34.1954 21.725 33.6511C22.8672 33.1069 24.2782 32.2939 24.2782 32.2939L23.7608 36.8056L18.705 42.5602C18.705 42.5602 18.5068 42.315 17.6669 40.4875C16.9984 39.0295 16.7666 38.5088 16.7666 38.5088L18.9804 34.5212Z'
                    fill='#010032'
                  />
                  <path
                    d='M10.6085 27.7421C10.6085 27.7421 8.68019 27.5809 6.56714 30.2516C4.63886 32.6905 3.73519 36.6612 3.38581 37.6825C3.03644 38.7037 2.19995 38.912 2.47878 39.379C2.75761 39.8459 3.96362 39.8191 5.45183 39.6343C6.94003 39.4495 8.21659 38.9826 8.21659 38.9826C8.21659 38.9826 8.15276 39.1438 7.93776 39.4932C7.8605 39.6175 7.59175 39.7955 7.6119 39.9803C7.65894 40.4204 11.4282 40.4305 14.4382 37.3331C17.69 33.9905 16.1111 31.2493 16.1111 31.2493L10.6085 27.7421Z'
                    fill='#F836F4'
                  />
                  <path
                    d='M11.1901 29.2979C11.1901 29.2979 9.11068 29.4087 7.39068 32.0794C5.67068 34.7501 4.87114 37.8441 5.03575 38.0524C5.197 38.2607 8.40185 37.1017 9.17114 37.3335C9.69857 37.4947 9.42646 38.0289 9.56755 38.17C9.68513 38.2875 11.0759 38.4857 13.3267 36.0468C15.5808 33.6079 15.0467 30.1814 15.0467 30.1814L11.1901 29.2979Z'
                    fill='#FBF0B4'
                  />
                  <path
                    d='M12.2111 25.6523C12.2111 25.6523 11.1663 26.5829 10.7934 27.117C10.4205 27.6512 10.4205 27.6982 10.444 27.8595C10.4676 28.0207 10.8539 29.7911 12.463 31.3431C14.4383 33.2479 16.202 33.5032 16.4573 33.5032C16.7126 33.5032 18.4091 31.5984 18.4091 31.5984L12.2111 25.6523Z'
                    fill='#858585'
                  />
                  <path
                    d='M16.8301 31.2962C16.8301 31.2962 18.5232 32.4082 21.3619 31.4541C25.242 30.1507 28.0873 27.2348 31.6113 23.5529C35.011 19.9987 37.8631 15.5878 37.8631 15.5878L35.8643 8.89258L16.8301 31.2962Z'
                    fill='#437687'
                  />
                  <path
                    d='M22.8408 27.6309L23.3078 26.1797L24.4768 26.3443C24.4768 26.3443 25.3671 26.7642 26.0221 27.0699C26.6772 27.3756 27.5204 27.6074 27.5204 27.6074L25.8575 29.0116C25.8575 29.0116 24.9505 28.669 24.2887 28.3801C23.5429 28.0542 22.8408 27.6309 22.8408 27.6309Z'
                    fill='#3F545F'
                  />
                  <path
                    d='M28.3262 6.06738C28.3262 6.06738 25.0944 7.94191 20.4619 12.3259C16.2862 16.2765 13.1922 19.8509 12.443 22.8911C11.8182 25.4375 12.1508 26.9829 13.5718 28.6525C15.0734 30.4195 16.8337 31.2963 16.8337 31.2963C16.8337 31.2963 18.1573 31.3164 23.6801 27.0668C30.5702 21.7624 36.0897 12.8802 36.0897 12.8802L28.3262 6.06738Z'
                    fill='#8DAFBF'
                  />
                  <path
                    d='M34.9983 14.7008C34.9983 14.7008 32.1865 13.5015 30.1809 10.7032C28.1888 7.92499 28.3467 6.0471 28.3467 6.0471C28.3467 6.0471 30.013 4.7403 33.7587 3.24538C36.2782 2.24092 39.7081 1.72694 40.8369 2.56342C41.9656 3.39991 40.0642 7.59577 40.0642 7.59577L36.6007 14.3011L34.9983 14.7008Z'
                    fill='#00FFED'
                  />
                  <path
                    d='M22.9009 27.6551C22.9009 27.6551 20.4721 26.4155 18.9268 24.6518C16.0041 21.3227 15.3994 17.6677 15.3994 17.6677L16.8675 15.9443C16.8675 15.9443 17.2336 19.8278 20.3679 23.1838C22.4104 25.3707 24.5436 26.3718 24.5436 26.3718C24.5436 26.3718 24.117 26.7313 23.6601 27.0807C23.3679 27.3057 22.9009 27.6551 22.9009 27.6551Z'
                    fill='#6896A5'
                  />
                  <path
                    d='M37.8636 15.5882C37.8636 15.5882 39.3216 13.8313 40.7023 9.87059C42.6305 4.34777 40.9509 2.6748 40.9509 2.6748C40.9509 2.6748 40.3831 5.30184 38.4112 8.95348C36.8289 11.8795 34.9141 14.6644 34.9141 14.6644C34.9141 14.6644 35.9689 15.1381 36.54 15.3027C37.2589 15.511 37.8636 15.5882 37.8636 15.5882Z'
                    fill='#010032'
                  />
                  <path
                    d='M13.3738 24.0472C13.8105 24.4638 14.4723 24.027 14.9056 23.0058C15.3423 21.9845 15.3356 21.4134 14.9997 21.1716C14.5831 20.8692 13.8844 21.531 13.5787 22.1189C13.2427 22.7706 13.0445 23.7314 13.3738 24.0472ZM28.538 7.4082C28.538 7.4082 25.9815 9.24578 23.2537 11.7452C20.7509 14.0396 19.0914 15.8335 18.863 16.2501C18.6211 16.6969 18.6177 17.3284 18.8059 17.6509C18.994 17.9734 19.4106 18.1414 19.7902 17.8592C20.1698 17.5737 22.8741 14.5838 25.3163 12.4473C27.5503 10.4921 29.2737 9.2525 29.2737 9.2525C29.2737 9.2525 29.9724 8.01625 29.8582 7.73406C29.744 7.44852 28.538 7.4082 28.538 7.4082Z'
                    fill='#B3E1EE'
                  />
                  <path
                    d='M28.5381 7.40775C28.5381 7.40775 30.4261 5.95985 32.482 4.94196C34.3935 3.99462 36.2949 3.20517 36.6375 3.89048C36.9634 4.5422 34.8336 5.42907 32.959 6.62501C31.0845 7.82095 29.2805 9.24868 29.2805 9.24868C29.2805 9.24868 29.005 8.74478 28.827 8.27782C28.7141 7.99359 28.6176 7.70308 28.5381 7.40775Z'
                    fill='#010032'
                  />
                  <path
                    d='M30.0971 13.8315C28.2259 12.1081 25.6224 12.5717 24.3391 14.1036C23.0222 15.6825 23.1196 18.0945 24.675 19.5458C26.0893 20.8627 28.7197 21.1617 30.3053 19.314C31.7163 17.6746 31.6289 15.2391 30.0971 13.8315Z'
                    fill='#E1E1E1'
                  />
                  <path
                    d='M25.306 14.7109C24.194 15.8027 24.2545 17.9661 25.5781 18.9538C26.7337 19.8171 28.3731 19.7735 29.401 18.722C30.429 17.6705 30.429 15.759 29.4649 14.7713C28.3563 13.6392 26.5792 13.4612 25.306 14.7109Z'
                    fill='#3F545F'
                  />
                  <path
                    d='M16.797 26.4757C16.797 26.4757 18.8764 24.366 19.1049 24.5944C19.3333 24.8229 19.3031 26.1028 18.3087 27.5272C17.311 28.9516 15.1173 31.4879 13.3805 33.1978C11.6672 34.8809 9.25182 36.8058 9.02338 36.7722C8.84533 36.7453 8.12307 36.3859 7.83416 36.0365C7.55197 35.6905 8.39518 34.0544 8.73447 33.5136C9.07713 32.9727 16.797 26.4757 16.797 26.4757Z'
                    fill='#00FFED'
                  />
                  <path
                    d='M7.13157 34.8603C7.1047 35.344 7.84376 36.0495 7.84376 36.0495L19.1044 24.5974C19.1044 24.5974 18.577 24.0028 17.0249 24.9669C15.4595 25.9411 14.0888 27.1102 12.0665 29.0687C9.24798 31.8032 7.15845 34.3765 7.13157 34.8603Z'
                    fill='#010032'
                  />
                  <path
                    d='M6.40274 13.0585C6.02985 13.4314 6.01305 14.0294 6.42961 14.372C6.79914 14.6777 7.40047 14.4795 7.62555 14.2041C7.85063 13.9286 7.82375 13.3306 7.52477 13.035C7.22578 12.736 6.63117 12.8334 6.40274 13.0585Z'
                    fill='white'
                  />
                  <path
                    opacity='0.5'
                    d='M13.7806 12.622C13.4984 12.9344 13.5891 13.398 13.8512 13.5693C14.1132 13.7406 14.5063 13.7238 14.6977 13.4887C14.8691 13.277 14.8892 12.8538 14.6272 12.5917C14.3988 12.3666 13.962 12.4204 13.7806 12.622Z'
                    fill='white'
                  />
                  <path
                    d='M18.6612 4.63965C18.6612 4.63965 19.071 3.47058 19.3129 3.45714C19.5581 3.44371 19.9109 4.62621 19.9109 4.62621C19.9109 4.62621 21.1236 4.63965 21.2042 4.81769C21.3084 5.04613 20.4282 5.81207 20.4282 5.81207C20.4282 5.81207 20.7138 6.95425 20.5794 7.09199C20.4282 7.24316 19.3834 6.64183 19.3834 6.64183C19.3834 6.64183 18.3084 7.39097 18.0766 7.18605C17.8751 7.008 18.295 5.79863 18.295 5.79863C18.295 5.79863 17.2872 5.06293 17.3409 4.858C17.4182 4.5691 18.6612 4.63965 18.6612 4.63965ZM32.5891 32.6703C32.9956 32.8953 33.5063 32.7677 33.6944 32.3343C33.8657 31.948 33.5499 31.4878 33.2644 31.3635C32.9788 31.2392 32.4783 31.4038 32.2969 31.7296C32.1188 32.0521 32.3439 32.5359 32.5891 32.6703ZM38.3606 22.7635C38.1288 22.404 37.6282 22.2864 37.3024 22.5753C36.9866 22.8575 37.0638 23.301 37.2419 23.5261C37.4199 23.7511 37.897 23.8351 38.1859 23.6503C38.4748 23.4656 38.5016 22.9785 38.3606 22.7635Z'
                    fill='white'
                  />
                </svg>
              </Icon>
              <Typography variant='body2' sx={{ marginTop: 4 }}>
                Ingresa a tu cuenta y dale vida a tus momentos
              </Typography>
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
