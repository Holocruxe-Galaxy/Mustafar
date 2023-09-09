// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Dialog from '@mui/material/Dialog'

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

const TabAccount = () => {
  // ** State
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

  return (
    <Grid container spacing={6}>
      {/* Delete Account Card */}
      <Grid item xs={12}>
        <Card>
          <CardHeader title='ELIMINAR CUENTA' />
          <CardContent>
            <Typography>
              Se borran todos los datos y la información asociada a esa cuenta de forma permanente.
            </Typography>
            <Button variant='contained' style={{marginTop: '3em'}} startIcon={<Eliminar />} onClick={handleClick}>
              ELIMINAR CUENTA
            </Button>
          </CardContent>
        </Card>
      </Grid>

      {/* Deactivate Account Dialogs */}
      <Dialog fullWidth maxWidth='xs' open={open} onClose={handleClose}>
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
              textAlign: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              justifyContent: 'center',
              '& svg': { mb: 6, color: 'warning.main' }
            }}
          >
            {/* <Icon icon='mdi:alert-circle-outline' fontSize='5.5rem' /> */}
            <Typography>Seguro que Deseas eliminar?</Typography>
          </Box>
        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <Button variant='contained' sx={{ mb: 4 }} onClick={() => handleConfirmation('yes')} startIcon={<Checked />}>
            Si
          </Button>
          <Button
            variant='contained'
            color='secondary'
            onClick={() => handleConfirmation('cancel')}
            startIcon={<Negativo />}
          >
            No
          </Button>
        </DialogActions>
      </Dialog>

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
            <Typography>{userInput === 'yes' ? 'Tu cuenta fue eliminada.' : 'Eliminación cancelada!!'}</Typography>
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
  )
}

export default TabAccount
