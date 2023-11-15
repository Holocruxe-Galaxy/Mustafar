// ** React Imports
import { ChangeEvent, ReactNode, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'

import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

import ComputerIcon from 'src/@core/icons/configuracion/ComputerIcon'
import PhoneIcon from 'src/@core/icons/configuracion/PhoneIcon'
import TabletIcon from 'src/@core/icons/configuracion/TabletIcon'
import TwoFactorAuthentication from 'src/views/pages/account-settings/security/TwoFactorAuthentication'
import {
  Button,
  Checkbox,
  Dialog,
  DialogContent,

  // FormControl,
  FormControlLabel,
  IconButton
} from '@mui/material'
import Icon from 'src/@core/components/icon'

// import { Controller } from 'react-hook-form'
import Negativo from 'src/@core/icons/Negativo'
import LoginAlert from '../../../views/pages/account-settings/security/LoginAlert'
import CardButtons from 'src/views/components/horizontalBar/CardButtons'
import AccountIconActive from 'src/@core/icons/configuracion/AccoutIconActive'
import AccountIconInactive from 'src/@core/icons/configuracion/AccountIconInactive'
import PadlockActive from 'src/@core/icons/configuracion/PadlockActive'
import PadlockInactive from 'src/@core/icons/configuracion/PadlockInactive'
import BellActive from 'src/@core/icons/configuracion/BellActive'
import BellInactive from 'src/@core/icons/configuracion/BellInactive'

interface RecentDeviceDataType {
  date?: string
  device: string
  location: string
  browserName: string
  browserIcon: ReactNode
  login: string
  thisDevice?: string
}

const recentDeviceData: RecentDeviceDataType[] = [
  {
    location: 'Pamplona - España',
    device: 'McAir X0000',

    // date: '10, July 2021 20:07',

    browserName: 'Chrome on Windows',
    thisDevice: 'Este dispositivo',
    login: 'Cerrar sesión',
    browserIcon: (
      <Box component='span' sx={{ mr: 4, '& svg': { color: 'info.main' } }}>
        <ComputerIcon />
      </Box>
    )
  },
  {
    location: 'Pamplona - España',
    device: 'Teléfono',
    date: '19/8/23 - 7:39 am',
    browserName: 'Chrome on iPhone',
    login: 'Cerrar sesión',
    browserIcon: (
      <Box component='span' sx={{ mr: 4, '& svg': { color: 'error.main' } }}>
        <PhoneIcon />
      </Box>
    )
  },
  {
    location: 'Pamplona - España',
    device: 'Tablet',
    date: '19/8/23 - 7:39 am',
    browserName: 'Chrome on Android',
    login: 'Cerrar sesión',
    browserIcon: (
      <Box component='span' sx={{ mr: 4, '& svg': { color: 'success.main' } }}>
        <TabletIcon />
      </Box>
    )
  },
  {
    location: 'Pamplona - España',
    device: 'Teléfono',
    date: '19/8/23 - 7:39 am',
    browserName: 'Chrome on iPhone',
    login: 'Cerrar sesión',
    browserIcon: (
      <Box component='span' sx={{ mr: 4, '& svg': { color: 'error.main' } }}>
        <PhoneIcon />
      </Box>
    )
  }
]
const Secutiry = () => {
  const [isChecked, setIsChecked] = useState<boolean>(false)
  const [open, setOpen] = useState<boolean>(false)

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setIsChecked(e.target.checked)
    if (e.target.checked) {
      setOpen(!open)
    }
  }

  const handleCloseDialog = () => {
    setOpen(false)
  }

  const settingsCards = [
    {
      name: 'CUENTA',
      activeIcon: <AccountIconActive />,
      inactiveIcon: <AccountIconInactive />,
      href: 'apps/account'
    },
    {
      name: 'SEGURIDAD',
      activeIcon: <PadlockActive />,
      inactiveIcon: <PadlockInactive />,
      href: 'apps/security'
    },
    {
      name: 'NOTIFICACIONES',
      activeIcon: <BellActive />,
      inactiveIcon: <BellInactive />,
      href: 'apps/notifications'
    }
  ]

  return (
    <>
      <Box component='div' sx={{ mb: 4 }}>
        <CardButtons data={settingsCards} />
      </Box>
      <Grid container spacing={6}>
        {/* Recent Devices Card*/}
        <Grid item xs={5}>
          <Card>
            <CardHeader title='DISPOSITIVOS CONECTADOS' sx={{ mt: 5 }} />
            <Typography sx={{ whiteSpace: 'nowrap', color: 'text.secondary', ml: '2em' }}>
              Has iniciado sesión en:
            </Typography>
            {recentDeviceData.map((row, index) => (
              <CardContent key={index}>
                <Box component='div' sx={{ display: 'flex', alignItems: 'flex-start', ml: '3rem' }}>
                  {row.browserIcon}
                  <Box component='div' sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography sx={{ whiteSpace: 'nowrap', color: 'text.secondary' }}>
                      Dispositivo: {row.device}
                    </Typography>

                    <Typography sx={{ whiteSpace: 'nowrap', color: 'text.secondary' }}>
                      Lugar: {row.location}
                    </Typography>
                    <Typography sx={{ whiteSpace: 'nowrap', color: 'text.secondary' }}>
                      Fecha y Hora: {row.date}
                    </Typography>
                    <Typography sx={{ whiteSpace: 'nowrap', color: '#F836F4' }}>{row.thisDevice}</Typography>

                    <Typography sx={{ whiteSpace: 'nowrap', color: '#6DFC73' }}>{row.login}</Typography>
                  </Box>
                </Box>
              </CardContent>
            ))}
          </Card>
        </Grid>
        <Grid item xs={7}>
          <Card style={{ height: '100%' }}>
            <CardHeader title='ALERTA DE INICIO DE SESION' sx={{ mt: 5 }} />
            <CardContent>
              <Typography sx={{ whiteSpace: 'nowrap', color: 'text.secondary' }}>
                Administra cómo quieres que se te notifique sobre los inicios de sesión no reconocidos en tu cuenta.
              </Typography>
              <FormControlLabel
                control={<Checkbox checked={isChecked} onChange={handleChange} />}
                label='Notificación en la Web/app'
                labelPlacement='start'
              />
              <Dialog open={open} onClose={handleCloseDialog}>
                <DialogContent
                  sx={{
                    px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
                    py: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
                  }}
                >
                  <Box component='div' sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Typography sx={{ color: 'text.secondary', fontWeight: 500, mt: 10, fontSize: 20 }}>
                      Intentaron iniciar sesión desde:
                    </Typography>
                  </Box>
                  <Box component='div' sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box component='div'>
                      <ComputerIcon />
                    </Box>
                    <Box component='div' sx={{ paddingLeft: '2em' }}>
                      <p>Dispositivo: ejemplo</p>
                      <p>Lugar: ejemplo</p>
                      <p>IP: XXX.XXXX.XXX</p>
                      <p>Hora: 17:28 pm</p>
                    </Box>
                  </Box>
                  <Button
                    variant='contained'
                    startIcon={<Negativo />}
                    sx={{
                      ml: 15,
                      mt: 2,
                      '&:hover': {
                        color: '#00FFED',
                        background: 'linear-gradient(180deg, #00FFED 0%, rgba(248, 54, 244, 0.20) 100%)',
                        boxShadow:
                          '4px 4px 25px 0px rgba(0, 0, 0, 0.70), 4px 4px 4px 0px rgba(255, 255, 255, 0.25) inset'
                      }
                    }}
                  >
                    No fui yo
                  </Button>

                  <IconButton
                    size='small'
                    onClick={handleCloseDialog}
                    sx={{ position: 'absolute', right: '1rem', top: '1rem' }}
                  >
                    <Icon icon='mdi:close' />
                  </IconButton>
                </DialogContent>
              </Dialog>
              <div>
                <FormControlLabel control={<Checkbox />} label='Correo Electrónico' labelPlacement='start' />
                <Typography sx={{ whiteSpace: 'nowrap', color: 'text.secondary', ml: '1em' }}>
                  mailusuario@ejemplo.com
                </Typography>
                <Typography sx={{ whiteSpace: 'nowrap', color: '#6DFC73', ml: '1em' }}>Siempre activado</Typography>
              </div>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <LoginAlert />
        </Grid>

        <Grid item xs={12}>
          <TwoFactorAuthentication />
        </Grid>
      </Grid>
    </>
  )
}

export default Secutiry
