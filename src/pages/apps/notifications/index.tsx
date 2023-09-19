// ** MUI Imports
import { Box, FormControlLabel } from '@mui/material'

// import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Stack from '@mui/material/Stack'
import { styled } from '@mui/material/styles';
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Switch from '@mui/material/Switch'
import CardButtons from 'src/views/components/horizontalBar/CardButtons'

const Android12Switch = styled(Switch)(() => ({
  width: '52px',
  height: '24px',
  padding: '0px',
  '& .MuiSwitch-switchBase': {
    color: '#010032',
    padding: '1px',
    '&.Mui-checked + .MuiSwitch-track': {
      backgroundImage: 'linear-gradient(180deg, #00FFED 0%, rgba(248, 54, 244, 0.2) 50%)',
      backgroundSize: '200% 100%',
      backgroundPosition: 'right center',


    },
  },
  '& .MuiSwitch-thumb': {
    color: 'white',
    width: '22px',
    height: '22px',
    margin: '1px',
  },
  '& .MuiSwitch-track': {
    borderRadius: '20px',
    backgroundColor: '#010032',
    opacity: '1 !important',
    '&:after, &:before': {
      color: 'white',
      fontSize: '9px',
      position: 'absolute',
      top: '6px',
    },
    '&:after': {
      content: '"ON"',
      left: '8px',
    },
    '&:before': {
      content: '"OFF"',
      right: '7px',
    },
  },
  '& .Mui-checked': {
    color: '#00FFED !important', // Cambia el color de la parte verde
    transform: 'translateX(26px) !important',
    '&:after': {
      color: '#010032'
    },
    '&:before': {

    },
  },
}));


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
        <Stack direction="row" spacing={1} alignItems="center" sx={{ml: '71%'}}>
        <FormControlLabel
        control={<Android12Switch defaultChecked />}
        label=""
      />
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
        <Stack direction="row" spacing={1} alignItems="center" sx={{ml: '60%'}}>
        <FormControlLabel
        control={<Android12Switch defaultChecked />}
        label=""
      />
      </Stack>
        </Box>
      </CardContent>
      <CardContent>
      <Box display="flex" alignItems="center" component='div'>
      <Typography sx={{ color: 'text.secondary' }}>
        <strong>NOTIFICACIONES POR MAIL</strong>
        </Typography>
        <Stack direction="row" spacing={1} alignItems="center" sx={{ml: '76%'}}>
        <FormControlLabel
        control={<Android12Switch defaultChecked />}
        label=""
      />
      </Stack>
      </Box>
      </CardContent>
    </Card>
    </>
  )
}

export default Notifications
