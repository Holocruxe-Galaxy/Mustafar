// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Dialog from '@mui/material/Dialog'
import Modal from '@mui/material/Modal'

// import { styled } from '@mui/material/styles

// import Checkbox from '@mui/material/Checkbox'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'

// import FormControl from '@mui/material/FormControl'
import CardContent from '@mui/material/CardContent'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'

// import FormHelperText from '@mui/material/FormHelperText'

import Button from '@mui/material/Button'

// import FormControlLabel from '@mui/material/FormControlLabel'

// ** Third Party Imports
// import { useForm, Controller } from 'react-hook-form'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import Eliminar from 'src/@core/icons/Eliminar'
import Checked from 'src/@core/icons/Checked'
import Negativo from 'src/@core/icons/Negativo'

import CardButtons from 'src/views/components/horizontalBar/CardButtons'
import AccountIconActive from 'src/@core/icons/configuracion/AccoutIconActive'
import AccountIconInactive from 'src/@core/icons/configuracion/AccountIconInactive'
import PadlockActive from 'src/@core/icons/configuracion/PadlockActive'
import PadlockInactive from 'src/@core/icons/configuracion/PadlockInactive'
import BellActive from 'src/@core/icons/configuracion/BellActive'
import BellInactive from 'src/@core/icons/configuracion/BellInactive'

// import AccountIcon from 'src/@core/icons/AccoutIcon'

const Account = () => {
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
  const [open, setOpen] = useState<boolean>(false)

  // const [inputValue, setInputValue] = useState<string>('')
  const [userInput, setUserInput] = useState<string>('yes')

  // const [formData, setFormData] = useState('')

  const [secondDialogOpen, setSecondDialogOpen] = useState<boolean>(false)

  // ** Hooks
  // const {
  //   control,
  //   handleSubmit,
  //   formState: { errors }
  // } = useForm({ defaultValues: { checkbox: false } })

  const handleClose = () => setOpen(false)

  const handleSecondDialogClose = () => setSecondDialogOpen(false)

  // const onSubmit = () => setOpen(true)

  const handleConfirmation = (value: string) => {
    handleClose()
    setUserInput(value)
    setSecondDialogOpen(true)
  }

  const handleClick = () => {
    setOpen(true)
  }

  const style = {
    position: 'absolute' as const,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    bgcolor: 'background.paper',
    borderRadius: 1,
    boxShadow: 24,
    p: 4
  }

  return (
    <>
      <Box component='div' sx={{ mb: 4 }}>
        <CardButtons data={settingsCards} />
      </Box>
      <Grid container spacing={6}>
        {/* Delete Account Card */}
        <Grid item xs={12}>
          <Card>
            <CardHeader title='ELIMINAR CUENTA' />
            <CardContent>
              <Typography>
                Se borran todos los datos y la información asociada a esa cuenta de forma permanente.
              </Typography>
              <Button
                variant='contained'
                style={{ marginTop: '3em' }}
                startIcon={<Eliminar />}
                onClick={handleClick}
                sx={{
                  '&:hover': {
                    color: '#00FFED',
                    background: 'linear-gradient(180deg, #00FFED 0%, rgba(248, 54, 244, 0.20) 100%)',
                    boxShadow: '4px 4px 25px 0px rgba(0, 0, 0, 0.70), 4px 4px 4px 0px rgba(255, 255, 255, 0.25) inset'
                  }
                }}
              >
                ELIMINAR CUENTA
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Deactivate Account Dialogs */}
        <Modal open={open} onClose={handleClose}>
          <Box component='div' sx={style}>
            <Typography variant='h6' component='h2'>
              Seguro que deseas eliminar?
            </Typography>
            <Button
              variant='contained'
              onClick={() => handleConfirmation('yes')}
              sx={{
                marginTop: 3,
                width: '50%',
                height: '3rem',
                fontSize: 'large',
                '&:hover': {
                  color: '#00FFED',
                  background: 'linear-gradient(180deg, #00FFED 0%, rgba(248, 54, 244, 0.20) 100%)',
                  boxShadow: '4px 4px 25px 0px rgba(0, 0, 0, 0.70), 4px 4px 4px 0px rgba(255, 255, 255, 0.25) inset'
                }
              }}
            >
              <div style={{ position: 'absolute', left: 28, top: 1, marginRight: 6 }}>
                <Checked />
              </div>
              Si
            </Button>
            <Button
              variant='contained'
              onClick={() => handleConfirmation('cancel')}
              sx={{
                marginTop: 3,
                width: '50%',
                height: '3rem',
                fontSize: 'large',
                '&:hover': {
                  color: '#00FFED',
                  background: 'linear-gradient(180deg, #00FFED 0%, rgba(248, 54, 244, 0.20) 100%)',
                  boxShadow: '4px 4px 25px 0px rgba(0, 0, 0, 0.70), 4px 4px 4px 0px rgba(255, 255, 255, 0.25) inset'
                }
              }}
            >
              <div style={{ position: 'absolute', left: 28, top: 1, marginRight: 6 }}>
                <Negativo />
              </div>
              No
            </Button>
          </Box>
        </Modal>

        <Dialog fullWidth maxWidth='xs' open={secondDialogOpen} onClose={handleSecondDialogClose}>
          <DialogContent
            sx={{
              pb: theme => `${theme.spacing(6)} !important`,
              px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
              pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
            }}
          >
            <Box
              component='div'
              sx={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
                '& svg': {
                  mb: 8,
                  color: userInput === 'yes' ? 'success.main' : 'error.main'
                }
              }}
            >
              <Icon
                fontSize='5.5rem'
                icon={userInput === 'yes' ? 'mdi:check-circle-outline' : 'mdi:close-circle-outline'}
              />
              <Typography variant='h4' sx={{ mb: 5 }}>
                {userInput === 'yes' ? 'Eliminado!' : 'Cancelado'}
              </Typography>
              <Typography>{userInput === 'yes' ? 'Tu cuenta fue eliminada.' : 'Eliminación cancelada!'}</Typography>
            </Box>
          </DialogContent>
          <DialogActions
            sx={{
              justifyContent: 'center',
              px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
              pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
            }}
          >
            <Button variant='contained' color='success' onClick={handleSecondDialogClose}>
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </>
  )
}

export default Account
