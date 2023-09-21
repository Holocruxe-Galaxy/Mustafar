import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from 'src/store'

import { fetchData, editNotifications } from 'src/store/apps/notifications'

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

const StyledSwitch = styled(Switch)(() => ({
  width: '50px',
  height: '24px',
  padding: '0px',
  '& .MuiSwitch-switchBase': {
    padding: '1px',
    '&.Mui-checked + .MuiSwitch-track': {
      backgroundImage: 'linear-gradient(180deg, #00FFED 0%, #F836F433 50%)'
    }
  },
  '& .MuiSwitch-thumb': {
    backgroundRepeat: 'no-repeat',
    backgroundImage: 'linear-gradient(180deg, #00FFED 0%, #F836F433 50%)',
    backgroundColor: 'transparent',
    width: '18px',
    height: '18px',
    margin: '1.7px',
    boxShadow: '4px 4px 30px 0px #FFFFFF59' // Agrega el primer box-shadow para la opción ON
  },
  '& .Mui-checked .MuiSwitch-thumb': {
    backgroundImage: 'none',
    backgroundColor: '#010032',
    width: '22px',
    height: '22px',
    margin: '0.3px',
    boxShadow: '3px 3px 4px 0px #FFFFFF59 inset' // Agrega el segundo box-shadow para la opción ON (como un inset shadow)
  },
  '& .MuiSwitch-track': {
    borderRadius: '20px',
    backgroundColor: '#010032',
    opacity: '1 !important',
    '&:after': {
      content: '"ON"',
      left: '6px',
      color: '#010032',
      fontSize: '9px',
      position: 'absolute',
      top: '6px'
    },
    '&:before': {
      content: '"OFF"',
      right: '7px',
      color: 'white',
      fontSize: '8.5px',
      position: 'absolute',
      top: '6px'

    }
  },
  '& .Mui-checked': {
    color: 'white !important',
    transform: 'translateX(26px) !important'
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    boxShadow: '4px 4px 4px 0px rgba(0, 0, 0, 0.35)'
  },
  '& .MuiSwitch-switchBase.Mui-checked .MuiSwitch-thumb': {
    boxShadow: '3px 3px 4px 0px rgba(66, 65, 136, 0.35) inset'
  }
}))



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

  const [switchState, setSwitchState] = useState<boolean>(false)


  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(fetchData())

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleChange = ():void => {
    const newSwitchState = !switchState;
    setSwitchState(newSwitchState);
    dispatch(editNotifications(newSwitchState));
  }

  return(
    <>
    <Box component='div' sx={{ mb: 4 }}>
        <CardButtons data={settingsCards} />
      </Box>
    <Card>
      <CardHeader title='ACTIVAR/DESACTIVAR NOTIFICACIONES' />
      {/* <CardContent>
        <Typography sx={{ color: 'text.secondary' }}>
        <strong>PAUSAR TODAS</strong>
        </Typography>
        <Box display="flex" alignItems="center" component='div'>
        <Typography sx={{ color: 'text.secondary' }}>
        Pausar notificaciones temporalmente
        </Typography>
        <Stack direction="row" spacing={1} alignItems="center" sx={{ml: '71%'}}>
        <FormControlLabel
        control={<StyledSwitch defaultChecked />}
        label=""
      />
      </Stack>
        </Box>
      </CardContent> */}
      {/* <CardContent>
      <Typography sx={{ color: 'text.secondary' }}>
        <strong>MODO SILENCIOSO</strong>
        </Typography>
        <Box display="flex" alignItems="center" component='div'>
        <Typography sx={{ color: 'text.secondary' }}>
        Silenciar notificaciones automáticamente por las noches
        </Typography>
        <Stack direction="row" spacing={1} alignItems="center" sx={{ml: '60%'}}>
        <FormControlLabel
        control={<StyledSwitch defaultChecked />}
        label=""
      />
      </Stack>
        </Box>
      </CardContent> */}
      <CardContent>
      <Box display="flex" alignItems="center" component='div'>
      <Typography sx={{ color: 'text.secondary' }}>
        <strong>NOTIFICACIONES POR MAIL</strong>
        </Typography>
        <Stack direction="row" spacing={1} alignItems="center" sx={{ml: '76%'}}>
        <FormControlLabel
        control={<StyledSwitch
          defaultChecked
          checked={switchState}
          onChange={handleChange}
          />}
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
