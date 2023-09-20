// ** React Imports
import { ChangeEvent, ReactNode, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'

import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

import TwoFactorAuthentication from 'src/views/pages/account-settings/security/TwoFactorAuthentication'
import ComputerIcon from 'src/@core/icons/ComputerIcon'
import PhoneIcon from 'src/@core/icons/PhoneIcon'
import TabletIcon from 'src/@core/icons/TabletIcon'
import { Button, Checkbox,

  // FormControl,
  FormControlLabel } from '@mui/material'

// import { Controller } from 'react-hook-form'
import Negativo from 'src/@core/icons/Negativo'
import LoginAlert from '../../../views/pages/account-settings/security/LoginAlert'
import CardButtons from 'src/views/components/horizontalBar/CardButtons'

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

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setIsChecked(e.target.checked)
  }
  const settingsCards = [
    {
      name: 'CUENTA',
      icon: '',
      href: '/apps/account'
    },
    {
      name: 'SEGURIDAD',
      icon: '',
      href: '/apps/security'
    },
    {
      name: 'NOTIFICACIONES',
      icon: '',
      href: '/apps/notifications'
    },
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
          <CardHeader title='DISPOSITIVOS CONECTADOS' sx={{mt: 5}}/>
          <Typography sx={{ whiteSpace: 'nowrap', color: 'text.secondary', alignItems: 'center', ml: '2em'}}>
            Has iniciado sesión en:
          </Typography>
          {recentDeviceData.map((row, index) => (
            <CardContent key={index}>
              <Box component='div' sx={{ display: 'flex', alignItems: 'center' }}>
                {row.browserIcon}
                <Box component='div' sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Typography sx={{ whiteSpace: 'nowrap', color: 'text.secondary' }}>
                    Dispositivo: {row.device}
                  </Typography>

                  <Typography sx={{ whiteSpace: 'nowrap', color: 'text.secondary' }}>Lugar: {row.location}</Typography>
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
          <CardHeader title='ALERTA DE INICIO DE SESION' />
          <CardContent>
            <Typography sx={{ whiteSpace: 'nowrap', color: 'text.secondary' }}>
              Administra cómo quieres que se te notifique sobre los inicios de sesión no reconocidos en tu cuenta.
            </Typography>
            <FormControlLabel
        control={<Checkbox checked={isChecked} onChange={handleChange} />}
        label="Notificación en la Web/app"
        labelPlacement="start"
      />
      {isChecked && (
        <div>
          <p style={{ paddingLeft: '1em' }}>Intentaron iniciar sesión desde:</p>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div>
              <ComputerIcon />
            </div>
            <div style={{ paddingLeft: '2em' }}>
              <p>Dispositivo: ejemplo</p>
              <p>Lugar: ejemplo</p>
              <p>IP: XXX.XXXX.XXX</p>
              <p>Hora: 17:28 pm</p>
            </div>
          </div>
          <Button variant="contained" startIcon={<Negativo />}>
            No fui yo
          </Button>
        </div>
      )}
      <div>
        <FormControlLabel
          control={<Checkbox />}
          label="Correo Electrónico"
          labelPlacement="start"
        />
              <Typography sx={{ whiteSpace: 'nowrap', color: 'text.secondary', ml:'1em' }}>mailusuario@ejemplo.com</Typography>
              <Typography sx={{ whiteSpace: 'nowrap', color: '#6DFC73', ml:'1em' }}>Siempre activado</Typography>
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
  );
}



export default Secutiry;
