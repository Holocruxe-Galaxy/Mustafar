// ** React Imports
import { useState, ReactNode, MouseEvent, useEffect } from 'react'

// ** Next Imports
import Link from 'next/link'

// ** MUI Components
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import Box, { BoxProps } from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import useMediaQuery from '@mui/material/useMediaQuery'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled, useTheme } from '@mui/material/styles'
import FormHelperText from '@mui/material/FormHelperText'
import InputAdornment from '@mui/material/InputAdornment'
import Typography, { TypographyProps } from '@mui/material/Typography'
import MuiFormControlLabel, { FormControlLabelProps } from '@mui/material/FormControlLabel'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Third Party Imports
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Hooks
import { useAuth } from 'src/hooks/useAuth'
import useBgColor from 'src/@core/hooks/useBgColor'
import { useSettings } from 'src/@core/hooks/useSettings'

// ** Configs
// ** import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
import FooterIllustrationsV2 from 'src/views/pages/auth/FooterIllustrationsV2'

// ** Auth0 Imports
import { useAuth0 } from '@auth0/auth0-react'

// ** Styled Components
const LoginIllustrationWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  padding: theme.spacing(20),
  paddingRight: '0 !important',
  [theme.breakpoints.down('lg')]: {
    padding: theme.spacing(10)
  }
}))

const LoginIllustration = styled('img')(({ theme }) => ({
  maxWidth: '48rem',
  [theme.breakpoints.down('xl')]: {
    maxWidth: '38rem'
  },
  [theme.breakpoints.down('lg')]: {
    maxWidth: '30rem'
  }
}))

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

const LoginPage = () => {
  const [rememberMe, setRememberMe] = useState<boolean>(true)
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const { loginWithRedirect, isAuthenticated, user, isLoading } = useAuth0()

  // ** Hooks
  const auth = useAuth()
  const theme = useTheme()
  const bgColors = useBgColor()
  const { settings } = useSettings()
  const hidden = useMediaQuery(theme.breakpoints.down('md'))

  // ** Vars
  const { skin } = settings

  const {
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({
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
  const datafetch = async () => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: 'alexandercanete035@gmail.com'
      })
    }
    const response = await fetch('http://localhost:3001/users/login', options)
    const res = await response.json()
    console.log(res)
  }
  const imageSource = skin === 'bordered' ? 'auth-v2-login-illustration-bordered' : 'auth-v2-login-illustration'
  useEffect(() => {
    if (window.localStorage.getItem('createAccount') === 'true' && isAuthenticated) {
      window.localStorage.removeItem('createAccount')
      auth.handleRegister()
    } else if (isAuthenticated) {
      auth.login({ rememberMe }, () => {
        setError('email', {
          type: 'manual',
          message: 'Email or Password is invalid'
        })
      })
    }
  }, [isAuthenticated, user, isLoading, auth, rememberMe, setError])

  return (
    <Box className='content-right'>
      {!hidden ? (
        <Box sx={{ flex: 1, display: 'flex', position: 'relative', alignItems: 'center', justifyContent: 'center' }}>
          <LoginIllustrationWrapper>
            <LoginIllustration
              alt='login-illustration'
              src={`/images/pages/${imageSource}-${theme.palette.mode}.png`}
            />
          </LoginIllustrationWrapper>
          <FooterIllustrationsV2 />
        </Box>
      ) : null}
      <RightWrapper sx={skin === 'bordered' && !hidden ? { borderLeft: `1px solid ${theme.palette.divider}` } : {}}>
        <Box
          sx={{
            p: 7,
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'background.paper'
          }}
        >
          <BoxWrapper>
            <Box
              sx={{
                top: 30,
                left: 40,
                display: 'flex',
                position: 'absolute',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <svg xmlns='http://www.w3.org/2000/svg' width='180' x='744.13' y='-640.34' viewBox='0 0 1617.68 257.73'>
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
                <circle fill='#59c1bd' cx='312.34' cy='72.2' r='13.71' />
                <circle fill='#59c1bd' cx='170.91' cy='72.2' r='13.71' />
                <circle fill='#59c1bd' cx='641.36' cy='72.2' r='13.71' />
                <circle fill='#59c1bd' cx='1231.08' cy='72.2' r='13.71' />
                <circle fill='#59c1bd' cx='1042.81' cy='201.98' r='13.71' />
                <circle fill='#59c1bd' cx='883.79' cy='191.01' r='13.71' />
                <circle fill='#59c1bd' cx='529.17' cy='203.81' r='13.71' />
                <circle fill='#59c1bd' cx='1388.28' cy='72.2' r='13.71' />
                <circle fill='#59c1bd' cx='1543.65' cy='72.2' r='13.71' />
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
            <Box sx={{ mb: 6 }}>
              <TypographyStyled variant='h5'>{`Welcome to Holocruxe! 👋🏻`}</TypographyStyled>
              <Typography variant='body2'>Please sign-in to your account and start the adventure</Typography>
            </Box>
            <Alert icon={false} sx={{ py: 3, mb: 6, ...bgColors.primaryLight, '& .MuiAlert-message': { p: 0 } }}>
              <Typography variant='caption' sx={{ mb: 2, display: 'block', color: 'primary.main' }}>
                Admin: <strong>admin@materialize.com</strong> / Pass: <strong>admin</strong>
              </Typography>
              <Typography variant='caption' sx={{ display: 'block', color: 'primary.main' }}>
                Client: <strong>client@materialize.com</strong> / Pass: <strong>client</strong>
              </Typography>
            </Alert>
            <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
              <FormControl fullWidth sx={{ mb: 4 }}>
                <Controller
                  name='email'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <TextField
                      autoFocus
                      label='Email'
                      value={value}
                      onBlur={onBlur}
                      onChange={onChange}
                      error={Boolean(errors.email)}
                      placeholder='admin@materialize.com'
                    />
                  )}
                />
                {errors.email && <FormHelperText sx={{ color: 'error.main' }}>{errors.email.message}</FormHelperText>}
              </FormControl>
              <FormControl fullWidth>
                <InputLabel htmlFor='auth-login-v2-password' error={Boolean(errors.password)}>
                  Password
                </InputLabel>
                <Controller
                  name='password'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <OutlinedInput
                      value={value}
                      onBlur={onBlur}
                      label='Password'
                      onChange={onChange}
                      id='auth-login-v2-password'
                      error={Boolean(errors.password)}
                      type={showPassword ? 'text' : 'password'}
                      endAdornment={
                        <InputAdornment position='end'>
                          <IconButton
                            edge='end'
                            onMouseDown={e => e.preventDefault()}
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            <Icon icon={showPassword ? 'mdi:eye-outline' : 'mdi:eye-off-outline'} fontSize={20} />
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  )}
                />
                {errors.password && (
                  <FormHelperText sx={{ color: 'error.main' }} id=''>
                    {errors.password.message}
                  </FormHelperText>
                )}
              </FormControl>
              <Box
                sx={{ mb: 4, display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-between' }}
              >
                <FormControlLabel
                  label='Remember Me'
                  control={<Checkbox checked={rememberMe} onChange={e => setRememberMe(e.target.checked)} />}
                />
                <Typography
                  variant='body2'
                  component={Link}
                  href='/forgot-password'
                  sx={{ color: 'primary.main', textDecoration: 'none' }}
                >
                  Forgot Password?
                </Typography>
              </Box>
              <Button onClick={() => datafetch()} fullWidth size='large' variant='contained' sx={{ mb: 7 }}>
                Login
              </Button>
              <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
                <Typography sx={{ mr: 2, color: 'text.secondary' }}>New on our platform?</Typography>
                <Typography
                  onClick={() => {
                    window.localStorage.setItem('createAccount', 'true')
                    loginWithRedirect()
                  }}
                  sx={{ color: 'primary.main', textDecoration: 'none' }}
                >
                  Create an account
                </Typography>
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
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <IconButton
                  href='/'
                  component={Link}
                  sx={{ color: '#497ce2' }}
                  onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}
                >
                  <Icon icon='mdi:facebook' />
                </IconButton>
                <IconButton
                  href='/'
                  component={Link}
                  sx={{ color: '#1da1f2' }}
                  onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}
                >
                  <Icon icon='mdi:twitter' />
                </IconButton>
                {/* <IconButton
                  href='/'
                  component={Link}
                  onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}
                  sx={{ color: theme => (theme.palette.mode === 'light' ? '#272727' : 'grey.300') }}
                >
                  <Icon icon='mdi:github' />
                </IconButton> */}
                <IconButton
                  href='/'
                  component={Link}
                  sx={{ color: '#db4437' }}
                  onClick={(e: MouseEvent<HTMLElement>) => {
                    e.preventDefault()
                    loginWithRedirect()
                  }}
                >
                  <Icon icon='mdi:google' />
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
