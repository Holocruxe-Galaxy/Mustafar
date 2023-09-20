// ** React Imports
import { useState } from 'react'

// ** MUI Imports
// import Box from '@mui/material/Box'

import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'

// import Button from '@mui/material/Button'
import InputLabel from '@mui/material/InputLabel'

import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'


// ** Third Party Imports

import { useForm, Controller } from 'react-hook-form'

// import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Button, Checkbox, Dialog, DialogContent, DialogContentText, DialogTitle, FormControlLabel, IconButton } from '@mui/material'
import Icon from 'src/@core/components/icon'

const ChangePasswordCard = () => {
  // ** States
  // const [values, setValues] = useState<State>({
  //   showNewPassword: false,
  //   showCurrentPassword: false,
  //   showConfirmNewPassword: false
  // })
  const [open, setOpen] = useState(false);

  // ** Hooks
  const {

    // reset,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({  })



  const onPasswordFormSubmit = () => {

    // toast.success('Password Changed Successfully')
    // reset(defaultValues)
  }

  const handleCheckboxChange = (e) => {
    if (e.target.checked) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  return (
    <Card>
      <CardHeader title='FORMAS DE RECUPERAR TU CUENTA' />
      <CardContent>
      <Typography sx={{ whiteSpace: 'nowrap', color: 'text.secondary', ml:'1em' }}>Recupera el acceso de tu cuenta en caso de que hayas perdido u olvidado tus datos de inicio de sesión.</Typography>
        <form onSubmit={handleSubmit(onPasswordFormSubmit)}>
          <Grid container spacing={6}>
            <Grid item>
          <FormControlLabel
          control={
          <Checkbox />
        }
        label={
          <span style={{ color: '#F836F4' }}>Correo Electrónico <span style={{ color: '#09FF13' }}>(Predeterminado)</span></span>
        }

        />
        <div>

          <FormControlLabel
          control={
          <Checkbox
          onChange={handleCheckboxChange}
          />
        }
        label={
          <span style={{ color: '#F836F4' }}>Enviar SMS</span>
        }
        />
        <Dialog open={open} onClose={handleCloseDialog}>
        <DialogContent
          sx={{
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            py: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <Box component='div' sx={{ mb: 12, display: 'flex', justifyContent: 'center', width: 250 }}>
          <Typography sx={{ color: 'text.secondary', fontWeight: 500, mt: 10, fontSize: 20 }}>
          Revisa tu teléfono. Te enviamos un codigo de recuperación
          </Typography>
          </Box>

          <IconButton size='small' onClick={handleCloseDialog} sx={{ position: 'absolute', right: '1rem', top: '1rem' }}>
            <Icon icon='mdi:close' />
          </IconButton>
        </DialogContent>
      </Dialog>
        </div>

        <div>
          <FormControlLabel
          control={
          <Checkbox />
        }
        label={
          <span style={{ color: '#F836F4' }}>Correo Electrónico alternativo</span>
        }
        />
        </div>
        <FormControl fullWidth>
                <InputLabel htmlFor='input-current-password' error={Boolean(errors.currentPassword)}>
                E-mail Alternativo
                </InputLabel>
                <Controller
                  name='currentPassword'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <OutlinedInput
                      value={value}
                      label='E-mail Alternativo'
                      onChange={onChange}
                      id='input-current-password'
                    />
                  )}
                />

              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>

            </Grid>
          </Grid>

        </form>
      </CardContent>
    </Card>
  )
}

export default ChangePasswordCard
