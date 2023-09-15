// ** MUI Imports
import { Box } from '@mui/material'

// import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Stack from '@mui/material/Stack'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Switch from '@mui/material/Switch'
import CardButtons from 'src/views/components/horizontalBar/CardButtons'

const Notifications = () => {

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

  return(
    <>
    <Box component='div' sx={{ mb: 4 }}>
        <CardButtons data={settingsCards} />
      </Box>
    <Card>
      <CardHeader title='ACTIVAR/DESACTIVAR NOTIFICACIONES' />
      <CardContent>
        <Typography sx={{ color: 'text.secondary' }}>
        <strong>PAUSAR TODAS</strong>
        </Typography>
        <Box display="flex" alignItems="center" component='div'>
        <Typography sx={{ color: 'text.secondary' }}>
        Pausar notificaciones temporalmente
        </Typography>
        <Stack direction="row" spacing={1} alignItems="center" sx={{ml: '70%'}}>
        <Typography>Off</Typography>
        <Switch defaultChecked inputProps={{ 'aria-label': 'ant design' }} />
        <Typography>On</Typography>
      </Stack>
        </Box>
      </CardContent>
      <CardContent>
      <Typography sx={{ color: 'text.secondary' }}>
        <strong>MODO SILENCIOSO</strong>
        </Typography>
        <Box display="flex" alignItems="center" component='div'>
        <Typography sx={{ color: 'text.secondary' }}>
        Silenciar notificaciones automáticamente por las noches
        </Typography>
        <Stack direction="row" spacing={1} alignItems="center" sx={{ml: '70%'}}>
        <Typography>Off</Typography>
        <Switch defaultChecked inputProps={{ 'aria-label': 'ant design' }} />
        <Typography>On</Typography>
      </Stack>
        </Box>
      </CardContent>
      <CardContent>
      <Box display="flex" alignItems="center" component='div'>
      <Typography sx={{ color: 'text.secondary' }}>
        <strong>NOTIFICACIONES POR MAIL</strong>
        </Typography>
        <Stack direction="row" spacing={1} alignItems="center" sx={{ml: '75%'}}>
        <Typography>Off</Typography>
        <Switch defaultChecked inputProps={{ 'aria-label': 'ant design' }} />
        <Typography>On</Typography>
      </Stack>
      </Box>
      </CardContent>
    </Card>
    </>
  )
}

export default Notifications
