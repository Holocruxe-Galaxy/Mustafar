// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import DialogContent from '@mui/material/DialogContent'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import FormHelperText from '@mui/material/FormHelperText'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Third Party Imports
import { useForm, Controller } from 'react-hook-form'
import GreenChecked from 'src/@core/icons/GreenChecked'
import PinkAirplane from 'src/@core/icons/PinkAirplane'

const TwoFactorAuthenticationCard = () => {
  // ** States
  const [open, setOpen] = useState<boolean>(false)

  // ** Hooks
  const {
    control,
    setValue,
    clearErrors,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues: { phoneNumber: '' } })

  const toggle2FADialog = () => setOpen(!open)

  const on2FAFormSubmit = () => {
    toggle2FADialog()
    setValue('phoneNumber', '')
  }

  const close2FADialog = () => {
    toggle2FADialog()
    clearErrors('phoneNumber')
    setValue('phoneNumber', '')
  }

  return (
    <>
      <Card>
        <CardHeader title='VERIFICACION DE DOS PASOS' />
        <CardContent>
          <Typography sx={{ mb: 4, color: 'text.secondary' }}>
            La autenticación de dos factores aún no está activada
          </Typography>
          <Typography sx={{ mb: 6, width: '75%', color: 'text.secondary' }}>
            La autenticación de dos factores añade una capa adicional de seguridad a tu cuenta al requerir algo más que
            una contraseña para iniciar sesión.
          </Typography>
          <Button variant='contained' onClick={toggle2FADialog} startIcon={<GreenChecked />}>
            ACTIVAR LA AUTENTICACION DE DOS FACTORES
          </Button>
        </CardContent>
      </Card>

      <Dialog fullWidth open={open} onClose={toggle2FADialog}>
        <DialogContent
          sx={{
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            py: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <Box component='div' sx={{ mb: 12, display: 'flex', justifyContent: 'center' }}>
            <Typography variant='h5' sx={{ fontSize: '1.625rem' }}>
              VERIFICACION PRIMER PASO
            </Typography>
          </Box>

          <IconButton size='small' onClick={close2FADialog} sx={{ position: 'absolute', right: '1rem', top: '1rem' }}>
            <Icon icon='mdi:close' />
          </IconButton>

          <Typography sx={{ color: 'text.secondary', fontWeight: 500 }}>
            Verifique su número de móvil para SMS
          </Typography>
          <Typography sx={{ mt: 4, mb: 6 }}>
            Introduzca su número de teléfono móvil con el código de país y le enviaremos un código de verificación.
          </Typography>

          <form onSubmit={handleSubmit(on2FAFormSubmit)}>
            <FormControl fullWidth sx={{ mb: 4 }}>
              <InputLabel htmlFor='opt-phone-number' error={Boolean(errors.phoneNumber)}>
                Phone Number
              </InputLabel>
              <Controller
                name='phoneNumber'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <OutlinedInput
                    type='number'
                    value={value}
                    onChange={onChange}
                    label='Phone Number'
                    id='opt-phone-number'
                    placeholder='+54 245731135'
                    error={Boolean(errors.phoneNumber)}
                    endAdornment={<InputAdornment position='start'><PinkAirplane/></InputAdornment>}
                  />
                )}
              />
              {errors.phoneNumber && (
                <FormHelperText sx={{ color: 'error.main' }}>Please enter a valid phone number</FormHelperText>
              )}
            </FormControl>
            <div>
              <Button variant='contained' type='submit' sx={{ mr: 3.5 }}>
                Submit
              </Button>
              <Button type='reset' variant='outlined' color='secondary' onClick={close2FADialog}>
                Cancel
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default TwoFactorAuthenticationCard