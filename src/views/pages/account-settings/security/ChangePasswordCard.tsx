// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import InputLabel from '@mui/material/InputLabel'

import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'


// ** Third Party Imports

import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Checkbox, FormControlLabel } from '@mui/material'



const ChangePasswordCard = () => {
  // ** States
  const [values, setValues] = useState<State>({
    showNewPassword: false,
    showCurrentPassword: false,
    showConfirmNewPassword: false
  })

  // ** Hooks
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({  })



  const onPasswordFormSubmit = () => {
    
    // toast.success('Password Changed Successfully')
    // reset(defaultValues)
  }

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
          label="Correo Electrónico (Predeterminado)"
        />
        <div>

          <FormControlLabel
          control={
          <Checkbox />
        }
          label="Enviar SMS"
        />
        </div>

        <div>
          <FormControlLabel
          control={
          <Checkbox />
        }
          label="Correo Electrónico Alternativo"
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
