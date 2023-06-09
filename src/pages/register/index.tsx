import { Fragment, useState, ReactNode } from 'react'


// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Step from '@mui/material/Step'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'

// import Select from '@mui/material/Select'

import Divider from '@mui/material/Divider'
import Stepper from '@mui/material/Stepper'

// import MenuItem from '@mui/material/MenuItem'

import StepLabel from '@mui/material/StepLabel'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

// import InputLabel from '@mui/material/InputLabel'

// import IconButton from '@mui/material/IconButton'

import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'

// import OutlinedInput from '@mui/material/OutlinedInput'

import FormHelperText from '@mui/material/FormHelperText'

// import InputAdornment from '@mui/material/InputAdornment'

// ** Third Party Imports
import * as yup from 'yup'
import toast from 'react-hot-toast'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Icon Imports
// import Icon from 'src/@core/components/icon'

// ** Custom Components Imports
import StepperCustomDot from './StepperCustomDot'
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Styled Components
import StepperWrapper from 'src/@core/styles/mui/stepper'

// interface State {
//   password: string
//   password2: string
//   showPassword: boolean
//   showPassword2: boolean
// }

const steps = [
  {
    title: 'Información personal',

    // subtitle: 'Ingresá tus datos'
  },

  // {

  //  title: 'Información educativa',
  //  // subtitle: 'Setup Information'

  //  ** },
  {
    title: 'Información de contacto',

    // subtitle: 'Add Social Links'
  },
  {
    title: 'Ubicación greográfica',

    //  subtitle: 'Add Social Links'
  },

  //  {

  //  title: 'Información de entretenimiento',

    // subtitle: 'Add Social Links'
  // },
  // {
  //   title: 'Historial de compras',
  //   // subtitle: 'Add Social Links'
  // },
  // {
  //   title: 'Información médica',
  //   // subtitle: 'Add Social Links'
  // },
  // {
  //   title: 'Preferencias de comunicación',
  //   // subtitle: 'Add Social Links'
  // }

]

const defaultPersonalValues = {
  'first-name': '',
  'last-name': '',
  gender: '',
  'date-of-birth': '',
  'marital-status': ''

  // phone: '',

  // language: [],
}

//  const defaultEducationValues = {

//   history: '',
//   schools: '',
//   grades: '',
//   dates: ''
// }

const defaultContactValues = {
  mail: '',
  'alternative-mail': '',
  phone: '',
  'post-code': ''
}
const defaultLocationValues = {
  country: '',
  province: '',
  city: '',
  address: '',
  'post-code': ''
}

// const defaultEntertainmentValues = {
//   'games-matches': '',
//   'live-events': '',
//   theathers: '',
//   museums: ''
// }

// const defaultShoppingValues = {
//   apps: '',
//   'orders-history': '',
//   'billing-history': '',
//   'delivery-preference': ''
// }

// const defaultMedicValues = {
//   'relevant-info': '',
//   allergies: '',
//   'chronic-conditions': '',
//   medicines: ''
// }

// const defaultComunicationValues = {
//   languages: '',
//   'comunication-frecuency': '',
//   'fav-type-of-content': ''
// }

const personalSchema = yup.object().shape({
  'last-name': yup.string().required(),
  'first-name': yup.string().required(),
  gender: yup.string().required(),
  'date-of-birth': yup.string().required(),
  'marital-status': yup.string().required(),

  // language: yup.array().min(1).required()
})

// const educationSchema = yup.object().shape({
//   history: yup.string().required(),
//   schools: yup.string().required(),
//   grades: yup.string().required(),
//   // yup.string().email().required(),
//   dates: yup.string().required(),
//   // yup.string().min(6).required(),
//   // 'confirm-password': yup
//   //   .string()
//   //   .required()
//   //   .oneOf([yup.ref('password'), ''], 'Passwords must match')
// })
const contactSchema = yup.object().shape({
  mail: yup.string().email().required(),
  'alternative-mail': yup.string().email().required(),
  phone: yup.string().required(),
  'post-code': yup.string().required()
})
const locationSchema = yup.object().shape({
  country: yup.string().required(),
  province: yup.string().required(),
  city: yup.string().required(),
  address: yup.string().required(),
  'post-code': yup.string().required()
})

// const entertainmentSchema = yup.object().shape({

//   'game-matches': yup.string().required(),
//   'live-events': yup.string().required(),
//   theathers: yup.string().required(),
//   museums: yup.string().required()
// })
// const shoppingSchema = yup.object().shape({
//   apps: yup.string().required(),
//   'order-history': yup.string().required(),
//   'billing-history': yup.string().required(),
//   'delivery-preference': yup.string().required()
// })
// const medicSchema = yup.object().shape({
//   'relevant-info': yup.string().required(),
//   allergies: yup.string().required(),
//   'chronic-conditions': yup.string().required(),
//   medicines: yup.string().required()
// })
// const comunicationSchema = yup.object().shape({
//   languages: yup.string().required(),
//   'comunication-frecuency': yup.string().required(),
//   'fav-type-of-content': yup.string().required(),
// })

const Register = () => {
  // ** States
  const [activeStep, setActiveStep] = useState<number>(0)

  // const [state, setState] = useState<State>({
  //   password: '',
  //   password2: '',
  //   showPassword: false,
  //   showPassword2: false
  // })

  // ** Hooks
  const {
    reset: personalReset,
    control: personalControl,
    handleSubmit: handlePersonalSubmit,
    formState: { errors: personalErrors }
  } = useForm({
    defaultValues: defaultPersonalValues,
    resolver: yupResolver(personalSchema)
  })

//   const {
//     reset: educationReset,
//     control: educationControl,
//     handleSubmit: handleEducationSubmit,
//     formState: { errors: educationErrors }
//   } = useForm({
//     defaultValues: defaultEducationValues,
//     resolver: yupResolver(educationSchema)
// })
  const {
    reset: contactReset,
    control: contactControl,
    handleSubmit: handleContactSubmit,
    formState: { errors: contactErrors }
  } = useForm({
    defaultValues: defaultContactValues,
    resolver: yupResolver(contactSchema)
  })
  const {
    reset: locationReset,
    control: locationControl,
    handleSubmit: handleLocationSubmit,
    formState: { errors: locationErrors }
  } = useForm({
    defaultValues: defaultLocationValues,
    resolver: yupResolver(locationSchema)
  })

  // const {
  //   reset: entertainmentReset,
  //   control: entertainmentControl,
  //   handleSubmit: handleEntertainmentSubmit,
  //   formState: { errors: entertainmentErrors }
  // } = useForm({
  //   defaultValues: defaultEntertainmentValues,
  //   resolver: yupResolver(entertainmentSchema)
  // })
  // const {
  //   reset: shoppingReset,
  //   control: shoppingControl,
  //   handleSubmit: handleShoppingSubmit,
  //   formState: { errors: shoppingErrors }
  // } = useForm({
  //   defaultValues: defaultShoppingValues,
  //   resolver: yupResolver(shoppingSchema)
  // })
  // const {
  //   reset: medicReset,
  //   control: medicControl,
  //   handleSubmit: handleMedicSubmit,
  //   formState: { errors: medicErrors }
  // } = useForm({
  //   defaultValues: defaultMedicValues,
  //   resolver: yupResolver(medicSchema)
  // })
  // const {
  //   reset: comunicationReset,
  //   control: comunicationControl,
  //   handleSubmit: handleComunicationSubmit,
  //   formState: { errors: comunicationErrors }
  // } = useForm({
  //   defaultValues: defaultComunicationValues,
  //   resolver: yupResolver(comunicationSchema)
  // })

  // Handle Stepper
  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1)
  }
  const handleReset = () => {
    setActiveStep(0)
    personalReset({ 'last-name': '', 'first-name': '', gender: '', 'date-of-birth': '', 'marital-status': '' })
    contactReset({ mail: '', 'alternative-mail': '', phone: '', 'post-code': '' })
    locationReset({ country: '', province: '', city: '', address: '', 'post-code': '' })

    // educationReset({ history: '', schools: '', grades: '', dates: '' })
    // entertainmentReset({ 'games-matches': '', 'live-events': '', theathers: '', museums: '' })
    // shoppingReset({ apps: '', 'orders-history': '', 'billing-history': '', 'delivery-preference': '' })
    // medicReset({ 'relevant-info': '', allergies: '', 'chronic-conditions': '', medicines: '' })
    // comunicationReset({ languages: '', 'comunication-frecuency': '', 'fav-type-of-content': '' })
  }
  const onSubmit = () => {
    setActiveStep(activeStep + 1)
    if (activeStep === steps.length - 1) {
      toast.success('Form Submitted')
    }
    
    // console.log(data)
  }

  // // Handle Password
  // const handleClickShowPassword = () => {
  //   setState({ ...state, showPassword: !state.showPassword })
  // }

  // // Handle Confirm Password
  // const handleClickShowConfirmPassword = () => {
  //   setState({ ...state, showPassword2: !state.showPassword2 })
  // }

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <form key={0} onSubmit={handlePersonalSubmit(onSubmit)}>
            <Grid container spacing={5} >
              <Grid item xs={12} marginTop={10}>
                <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary' }}>
                  {steps[0].title}
                </Typography>
                {/* <Typography variant='caption' component='p'>
                  {steps[0].subtitle}
                </Typography> */}
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Controller
                    name='first-name'
                    control={personalControl}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value}
                        label='Nombre'
                        onChange={onChange}
                        placeholder='Nombre'
                        error={Boolean(personalErrors['first-name'])}
                        aria-describedby='stepper-linear-account-username'
                      />
                    )}
                  />
                  {personalErrors['first-name'] && (
                    <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-personal-first-name'>
                      This field is required
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Controller
                    name='last-name'
                    control={personalControl}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField

                        // type='email'

                        value={value}
                        label='Apellido'
                        onChange={onChange}
                        error={Boolean(personalErrors['last-name'])}
                        placeholder='Apellido'
                        aria-describedby='stepper-linear-personal-last-name'
                      />
                    )}
                  />
                  {personalErrors['last-name'] && (
                    <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-personal-last-name'>
                      {/* {personErrors.email.message} */}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Controller
                    name='gender'
                    control={personalControl}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField

                        // type='email'
                        value={value}
                        label='Género'
                        onChange={onChange}
                        error={Boolean(personalErrors.gender)}
                        placeholder='No binarie'
                        aria-describedby='stepper-linear-personal-gender'
                      />
                    )}
                  />
                  {personalErrors.gender && (
                    <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-personal-gender'>
                      {/* {personErrors.email.message} */}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Controller
                    name='date-of-birth'
                    control={personalControl}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField

                        // type='email'
                        value={value}
                        label='Fecha de Nacimiento'
                        onChange={onChange}
                        error={Boolean(personalErrors['date-of-birth'])}
                        placeholder='31/08/93'
                        aria-describedby='stepper-linear-personal-date-of-birth'
                      />
                    )}
                  />
                  {personalErrors['date-of-birth'] && (
                    <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-personal-date-of-birth'>
                      {/* {personErrors.email.message} */}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Controller
                    name='marital-status'
                    control={personalControl}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField

                        // type='email'
                        value={value}
                        label='Estado Civil'
                        onChange={onChange}
                        error={Boolean(personalErrors['marital-status'])}
                        placeholder='Soltere'
                        aria-describedby='stepper-linear-personal-marital-status'
                      />
                    )}
                  />
                  {personalErrors['date-of-birth'] && (
                    <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-personal-marital-status'>
                      {/* {personErrors.email.message} */}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              {/* <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel htmlFor='stepper-linear-account-password' error={Boolean(accountErrors.password)}>
                    Password
                  </InputLabel>
                  <Controller
                    name='password'
                    control={accountControl}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <OutlinedInput
                        value={value}
                        label='Password'
                        onChange={onChange}
                        id='stepper-linear-account-password'
                        error={Boolean(accountErrors.password)}
                        type={state.showPassword ? 'text' : 'password'}
                        endAdornment={
                          <InputAdornment position='end'>
                            <IconButton
                              edge='end'
                              onClick={handleClickShowPassword}
                              onMouseDown={e => e.preventDefault()}
                              aria-label='toggle password visibility'
                            >
                              <Icon icon={state.showPassword ? 'mdi:eye-outline' : 'mdi:eye-off-outline'} />
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                    )}
                  />
                  {accountErrors.password && (
                    <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-account-password-helper'>
                      {accountErrors.password.message}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel
                    htmlFor='stepper-linear-account-confirm-password'
                    error={Boolean(accountErrors['confirm-password'])}
                  >
                    Confirm Password
                  </InputLabel>
                  <Controller
                    name='confirm-password'
                    control={accountControl}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <OutlinedInput
                        value={value}
                        onChange={onChange}
                        label='Confirm Password'
                        id='stepper-linear-account-confirm-password'
                        type={state.showPassword2 ? 'text' : 'password'}
                        error={Boolean(accountErrors['confirm-password'])}
                        endAdornment={
                          <InputAdornment position='end'>
                            <IconButton
                              edge='end'
                              onMouseDown={e => e.preventDefault()}
                              aria-label='toggle password visibility'
                              onClick={handleClickShowConfirmPassword}
                            >
                              <Icon icon={state.showPassword2 ? 'mdi:eye-outline' : 'mdi:eye-off-outline'} />
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                    )}
                  />
                  {accountErrors['confirm-password'] && (
                    <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-account-confirm-password-helper'>
                      {accountErrors['confirm-password'].message}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid> */}
              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button size='large' variant='outlined' color='secondary' disabled>
                  Back
                </Button>
                <Button size='large' type='submit' variant='contained'>
                  Next
                </Button>
              </Grid>
            </Grid>
          </form>
        )
      case 1:
        return (
          <form key={1} onSubmit={handleContactSubmit(onSubmit)}>
            <Grid container spacing={5}>
              <Grid item xs={12} marginTop={10}>
                <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary' }}>
                  {steps[1].title}
                </Typography>
                {/* <Typography variant='caption' component='p'>
                  {steps[2].subtitle}
                </Typography> */}
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Controller
                    name='mail'
                    control={contactControl}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value}
                        label='Mail'
                        onChange={onChange}
                        error={Boolean(contactErrors.mail)}
                        placeholder='holis@gmail.com'
                        aria-describedby='stepper-linear-contact-mail'
                      />
                    )}
                  />
                  {contactErrors.mail && (
                    <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-contact-mail'>
                      This field is required
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Controller
                    name='alternative-mail'
                    control={contactControl}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value}
                        label='Mail alternativo'
                        onChange={onChange}
                        error={Boolean(contactErrors['alternative-mail'])}
                        placeholder='chausis@gmail.com'
                        aria-describedby='stepper-linear-contact-alternative-mail'
                      />
                    )}
                  />
                  {contactErrors['alternative-mail'] && (
                    <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-contact-alternative-mail'>
                      This field is required
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Controller
                    name='phone'
                    control={contactControl}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value}
                        label='Teléfono'
                        onChange={onChange}
                        error={Boolean(contactErrors.phone)}
                        aria-describedby='stepper-linear-contact-phone'
                        placeholder='12345678'
                      />
                    )}
                  />
                  {contactErrors.phone && (
                    <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-contact-phone'>
                      This field is required
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Controller
                    name='post-code'
                    control={contactControl}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value}
                        label='Código postal'
                        onChange={onChange}
                        error={Boolean(contactErrors['post-code'])}
                        placeholder='3000'
                        aria-describedby='stepper-linear-contact-post-code'
                      />
                    )}
                  />
                  {contactErrors['post-code'] && (
                    <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-contact-post-code'>
                      This field is required
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button size='large' variant='outlined' color='secondary' onClick={handleBack}>
                  Back
                </Button>
                <Button size='large' type='submit' variant='contained'>
                  Next
                </Button>
              </Grid>
            </Grid>
          </form>
        )
      case 2:
        return (
          <form key={2} onSubmit={handleLocationSubmit(onSubmit)}>
          <Grid container spacing={5}>
            <Grid item xs={12} >
              <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary' }}>
                {steps[2].title}
              </Typography>
              {/* <Typography variant='caption' component='p'>
                {steps[2].subtitle}
              </Typography> */}
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <Controller
                  name='country'
                  control={locationControl}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      value={value}
                      label='País'
                      onChange={onChange}
                      error={Boolean(locationErrors.country)}
                      placeholder='Argentina'
                      aria-describedby='stepper-linear-location-country'
                    />
                  )}
                />
                {locationErrors.country && (
                  <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-location-country'>
                    This field is required
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <Controller
                  name='province'
                  control={locationControl}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      value={value}
                      label='Provincia'
                      onChange={onChange}
                      error={Boolean(locationErrors.province)}
                      placeholder='Santa Fe'
                      aria-describedby='stepper-linear-location-province'
                    />
                  )}
                />
                {locationErrors.province && (
                  <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-location-province'>
                    This field is required
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <Controller
                  name='city'
                  control={locationControl}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      value={value}
                      label='Ciudad'
                      onChange={onChange}
                      error={Boolean(locationErrors.city)}
                      aria-describedby='stepper-linear-location-city'
                      placeholder='Santa Clara de Buena Vista'
                    />
                  )}
                />
                {locationErrors.city && (
                  <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-location-city'>
                    This field is required
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <Controller
                  name='address'
                  control={locationControl}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      value={value}
                      label='Dirección'
                      onChange={onChange}
                      error={Boolean(locationErrors.address)}
                      placeholder='Calle falsa 123'
                      aria-describedby='stepper-linear-location-address'
                    />
                  )}
                />
                {locationErrors.address && (
                  <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-location-address'>
                    This field is required
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            {/* <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <Controller
                  name='post-code'
                  control={locationControl}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      value={value}
                      label='Código postal'
                      onChange={onChange}
                      error={Boolean(locationErrors['post-code'])}
                      placeholder='2000'
                      aria-describedby='stepper-linear-location-post-code'
                    />
                  )}
                />
                {locationErrors['post-code'] && (
                  <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-location-post-code'>
                    This field is required
                  </FormHelperText>
                )}
              </FormControl>
            </Grid> */}
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button size='large' variant='outlined' color='secondary' onClick={handleBack}>
                Back
              </Button>
              <Button size='large' type='submit' variant='contained'>
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
        )

        // case 3:
        // return (
        //   <form key={3} onSubmit={handleEducationSubmit(onSubmit)}>
        //     <Grid container spacing={5}>
        //       <Grid item xs={12}>
        //         <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary' }}>
        //           {steps[3].title}
        //         </Typography>
        //         {/* <Typography variant='caption' component='p'>
        //           {steps[1].subtitle}
        //         </Typography> */}
        //       </Grid>
        //       <Grid item xs={12} sm={6}>
        //         <FormControl fullWidth>
        //           <Controller
        //             name='history'
        //             control={educationControl}
        //             rules={{ required: true }}
        //             render={({ field: { value, onChange } }) => (
        //               <TextField
        //                 value={value}
        //                 label='Educación'
        //                 onChange={onChange}
        //                 placeholder='Historia académica'
        //                 error={Boolean(educationErrors.history)}
        //                 aria-describedby='stepper-linear-education-history'
        //               />
        //             )}
        //           />
        //           {educationErrors.history && (
        //             <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-personal-first-name'>
        //               This field is required
        //             </FormHelperText>
        //           )}
        //         </FormControl>
        //       </Grid>
        //       <Grid item xs={12} sm={6}>
        //         <FormControl fullWidth>
        //           <Controller
        //             name='schools'
        //             control={educationControl}
        //             rules={{ required: true }}
        //             render={({ field: { value, onChange } }) => (
        //               <TextField
        //                 value={value}
        //                 label='Escuelas'
        //                 onChange={onChange}
        //                 placeholder='Brigadier Lopez'
        //                 error={Boolean(educationErrors.schools)}
        //                 aria-describedby='stepper-linear-education-schools'
        //               />
        //             )}
        //           />
        //           {educationErrors.schools && (
        //             <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-education-schools'>
        //               This field is required
        //             </FormHelperText>
        //           )}
        //         </FormControl>
        //       </Grid>
        //       <Grid item xs={12} sm={6}>
        //         <FormControl fullWidth>
        //           <Controller
        //             name='grades'
        //             control={educationControl}
        //             rules={{ required: true }}
        //             render={({ field: { value, onChange } }) => (
        //               <TextField
        //                 value={value}
        //                 label='Grados'
        //                 onChange={onChange}
        //                 placeholder='5to Ciencias Naturales'
        //                 error={Boolean(educationErrors.grades)}
        //                 aria-describedby='stepper-linear-education-grades'
        //               />
        //             )}
        //           />
        //           {educationErrors.grades && (
        //             <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-education-grades'>
        //               This field is required
        //             </FormHelperText>
        //           )}
        //         </FormControl>
        //       </Grid>
        //       <Grid item xs={12} sm={6}>
        //         <FormControl fullWidth>
        //           <Controller
        //             name='dates'
        //             control={educationControl}
        //             rules={{ required: true }}
        //             render={({ field: { value, onChange } }) => (
        //               <TextField
        //                 value={value}
        //                 label='Fechas'
        //                 onChange={onChange}
        //                 placeholder='2/06/2020'
        //                 error={Boolean(educationErrors.dates)}
        //                 aria-describedby='stepper-linear-education-dates'
        //               />
        //             )}
        //           />
        //           {educationErrors.dates && (
        //             <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-education-dates'>
        //               This field is required
        //             </FormHelperText>
        //           )}
        //         </FormControl>
        //       </Grid>
        //       <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
        //         <Button size='large' variant='outlined' color='secondary' onClick={handleBack}>
        //           Back
        //         </Button>
        //         <Button size='large' type='submit' variant='contained'>
        //           Next
        //         </Button>
        //       </Grid>
        //     </Grid>
        //   </form>
        // )
        // case 4:
        // return (
        //   <form key={4} onSubmit={handleEntertainmentSubmit(onSubmit)}>
        //     <Grid container spacing={5}>
        //       <Grid item xs={12}>
        //         <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary' }}>
        //           {steps[4].title}
        //         </Typography>
        //         {/* <Typography variant='caption' component='p'>
        //           {steps[2].subtitle}
        //         </Typography> */}
        //       </Grid>
        //       <Grid item xs={12} sm={6}>
        //         <FormControl fullWidth>
        //           <Controller
        //             name='games-matches'
        //             control={entertainmentControl}
        //             rules={{ required: true }}
        //             render={({ field: { value, onChange } }) => (
        //               <TextField
        //                 value={value}
        //                 label='Juegos/Partidos'
        //                 onChange={onChange}
        //                 error={Boolean(entertainmentErrors['games-matches'])}
        //                 placeholder='https://twitter.com/carterLeonard'
        //                 aria-describedby='stepper-linear-contact-mail'
        //               />
        //             )}
        //           />
        //           {entertainmentErrors['games-matches'] && (
        //             <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-entertainment-games-matches'>
        //               This field is required
        //             </FormHelperText>
        //           )}
        //         </FormControl>
        //       </Grid>
        //       <Grid item xs={12} sm={6}>
        //         <FormControl fullWidth>
        //           <Controller
        //             name='live-events'
        //             control={entertainmentControl}
        //             rules={{ required: true }}
        //             render={({ field: { value, onChange } }) => (
        //               <TextField
        //                 value={value}
        //                 label='Eventos en vivo'
        //                 onChange={onChange}
        //                 error={Boolean(entertainmentErrors['live-events'])}
        //                 placeholder='The eras tour Taylor Swift'
        //                 aria-describedby='stepper-linear-entertainment-live-events'
        //               />
        //             )}
        //           />
        //           {entertainmentErrors['live-events'] && (
        //             <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-entertainment-live-events'>
        //               This field is required
        //             </FormHelperText>
        //           )}
        //         </FormControl>
        //       </Grid>
        //       <Grid item xs={12} sm={6}>
        //         <FormControl fullWidth>
        //           <Controller
        //             name='theathers'
        //             control={entertainmentControl}
        //             rules={{ required: true }}
        //             render={({ field: { value, onChange } }) => (
        //               <TextField
        //                 value={value}
        //                 label='Teatros'
        //                 onChange={onChange}
        //                 error={Boolean(entertainmentErrors.theathers)}
        //                 aria-describedby='stepper-linear-entertainment-teathers'
        //                 placeholder='Teatro Colón'
        //               />
        //             )}
        //           />
        //           {entertainmentErrors.theathers && (
        //             <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-entertainment-teathers'>
        //               This field is required
        //             </FormHelperText>
        //           )}
        //         </FormControl>
        //       </Grid>
        //       <Grid item xs={12} sm={6}>
        //         <FormControl fullWidth>
        //           <Controller
        //             name='museums'
        //             control={entertainmentControl}
        //             rules={{ required: true }}
        //             render={({ field: { value, onChange } }) => (
        //               <TextField
        //                 value={value}
        //                 label='Museos'
        //                 onChange={onChange}
        //                 error={Boolean(entertainmentErrors.museums)}
        //                 placeholder='Met'
        //                 aria-describedby='stepper-linear-entertainment-museums'
        //               />
        //             )}
        //           />
        //           {entertainmentErrors.museums && (
        //             <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-entertainment-museums'>
        //               This field is required
        //             </FormHelperText>
        //           )}
        //         </FormControl>
        //       </Grid>
        //       <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
        //         <Button size='large' variant='outlined' color='secondary' onClick={handleBack}>
        //           Back
        //         </Button>
        //         <Button size='large' type='submit' variant='contained'>
        //           Submit
        //         </Button>
        //       </Grid>
        //     </Grid>
        //   </form>
        // )
        // case 5:
        // return (
        //   <form key={5} onSubmit={handleShoppingSubmit(onSubmit)}>
        //     <Grid container spacing={5}>
        //       <Grid item xs={12}>
        //         <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary' }}>
        //           {steps[5].title}
        //         </Typography>
        //         {/* <Typography variant='caption' component='p'>
        //           {steps[2].subtitle}
        //         </Typography> */}
        //       </Grid>
        //       <Grid item xs={12} sm={6}>
        //         <FormControl fullWidth>
        //           <Controller
        //             name='apps'
        //             control={shoppingControl}
        //             rules={{ required: true }}
        //             render={({ field: { value, onChange } }) => (
        //               <TextField
        //                 value={value}
        //                 label='Aplicaciones'
        //                 onChange={onChange}
        //                 error={Boolean(shoppingErrors.apps)}
        //                 placeholder='Pedidos ya'
        //                 aria-describedby='stepper-linear-shopping-apps'
        //               />
        //             )}
        //           />
        //           {shoppingErrors.apps && (
        //             <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-shopping-apps'>
        //               This field is required
        //             </FormHelperText>
        //           )}
        //         </FormControl>
        //       </Grid>
        //       <Grid item xs={12} sm={6}>
        //         <FormControl fullWidth>
        //           <Controller
        //             name='orders-history'
        //             control={shoppingControl}
        //             rules={{ required: true }}
        //             render={({ field: { value, onChange } }) => (
        //               <TextField
        //                 value={value}
        //                 label='Historial de pedidos'
        //                 onChange={onChange}
        //                 error={Boolean(shoppingErrors['orders-history'])}
        //                 placeholder='Remera blanca lisa - Yagmour'
        //                 aria-describedby='stepper-linear-shopping-orders-history'
        //               />
        //             )}
        //           />
        //           {shoppingErrors['orders-history'] && (
        //             <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-shopping-orders-history'>
        //               This field is required
        //             </FormHelperText>
        //           )}
        //         </FormControl>
        //       </Grid>
        //       <Grid item xs={12} sm={6}>
        //         <FormControl fullWidth>
        //           <Controller
        //             name='billing-history'
        //             control={shoppingControl}
        //             rules={{ required: true }}
        //             render={({ field: { value, onChange } }) => (
        //               <TextField
        //                 value={value}
        //                 label='Historial de Facturación'
        //                 onChange={onChange}
        //                 error={Boolean(shoppingErrors['billing-history'])}
        //                 aria-describedby='stepper-linear-shopping-billing-history'
        //                 placeholder='Personal Flow'
        //               />
        //             )}
        //           />
        //           {shoppingErrors['billing-history'] && (
        //             <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-shopping-billing-history'>
        //               This field is required
        //             </FormHelperText>
        //           )}
        //         </FormControl>
        //       </Grid>
        //       <Grid item xs={12} sm={6}>
        //         <FormControl fullWidth>
        //           <Controller
        //             name='delivery-preference'
        //             control={shoppingControl}
        //             rules={{ required: true }}
        //             render={({ field: { value, onChange } }) => (
        //               <TextField
        //                 value={value}
        //                 label='LinkedIn'
        //                 onChange={onChange}
        //                 error={Boolean(shoppingErrors['delivery-preference'])}
        //                 placeholder='Delivery a mi casa'
        //                 aria-describedby='stepper-linear-shopping-delivery-preference'
        //               />
        //             )}
        //           />
        //           {shoppingErrors['delivery-preference'] && (
        //             <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-shopping-delivery-preference'>
        //               This field is required
        //             </FormHelperText>
        //           )}
        //         </FormControl>
        //       </Grid>
        //       <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
        //         <Button size='large' variant='outlined' color='secondary' onClick={handleBack}>
        //           Back
        //         </Button>
        //         <Button size='large' type='submit' variant='contained'>
        //           Submit
        //         </Button>
        //       </Grid>
        //     </Grid>
        //   </form>
        // )
        // case 6:
        // return (
        //   <form key={6} onSubmit={handleMedicSubmit(onSubmit)}>
        //     <Grid container spacing={5}>
        //       <Grid item xs={12}>
        //         <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary' }}>
        //           {steps[6].title}
        //         </Typography>
        //         {/* <Typography variant='caption' component='p'>
        //           {steps[2].subtitle}
        //         </Typography> */}
        //       </Grid>
        //       <Grid item xs={12} sm={6}>
        //         <FormControl fullWidth>
        //           <Controller
        //             name='relevant-info'
        //             control={medicControl}
        //             rules={{ required: true }}
        //             render={({ field: { value, onChange } }) => (
        //               <TextField
        //                 value={value}
        //                 label='Información relevante'
        //                 onChange={onChange}
        //                 error={Boolean(medicErrors['relevant-info'])}
        //                 placeholder='Diabetes'
        //                 aria-describedby='stepper-linear-medic-relevant-info'
        //               />
        //             )}
        //           />
        //           {medicErrors['relevant-info'] && (
        //             <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-medic-relevant-info'>
        //               This field is required
        //             </FormHelperText>
        //           )}
        //         </FormControl>
        //       </Grid>
        //       <Grid item xs={12} sm={6}>
        //         <FormControl fullWidth>
        //           <Controller
        //             name='allergies'
        //             control={medicControl}
        //             rules={{ required: true }}
        //             render={({ field: { value, onChange } }) => (
        //               <TextField
        //                 value={value}
        //                 label='Alergias'
        //                 onChange={onChange}
        //                 error={Boolean(medicErrors.allergies)}
        //                 placeholder='Polen'
        //                 aria-describedby='stepper-linear-medic-allergies'
        //               />
        //             )}
        //           />
        //           {medicErrors.allergies && (
        //             <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-medic-allergies'>
        //               This field is required
        //             </FormHelperText>
        //           )}
        //         </FormControl>
        //       </Grid>
        //       <Grid item xs={12} sm={6}>
        //         <FormControl fullWidth>
        //           <Controller
        //             name='chronic-conditions'
        //             control={medicControl}
        //             rules={{ required: true }}
        //             render={({ field: { value, onChange } }) => (
        //               <TextField
        //                 value={value}
        //                 label='Afecciones crónicas'
        //                 onChange={onChange}
        //                 error={Boolean(medicErrors['chronic-conditions'])}
        //                 aria-describedby='stepper-linear-medic-chronic-conditions'
        //                 placeholder='Artritis'
        //               />
        //             )}
        //           />
        //           {medicErrors['chronic-conditions'] && (
        //             <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-medic-chronic-conditions'>
        //               This field is required
        //             </FormHelperText>
        //           )}
        //         </FormControl>
        //       </Grid>
        //       <Grid item xs={12} sm={6}>
        //         <FormControl fullWidth>
        //           <Controller
        //             name='medicines'
        //             control={medicControl}
        //             rules={{ required: true }}
        //             render={({ field: { value, onChange } }) => (
        //               <TextField
        //                 value={value}
        //                 label='Medicamentos'
        //                 onChange={onChange}
        //                 error={Boolean(medicErrors.medicines)}
        //                 placeholder='Clonachu'
        //                 aria-describedby='stepper-linear-medic-medicines'
        //               />
        //             )}
        //           />
        //           {medicErrors.medicines && (
        //             <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-medic-medicines'>
        //               This field is required
        //             </FormHelperText>
        //           )}
        //         </FormControl>
        //       </Grid>
        //       <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
        //         <Button size='large' variant='outlined' color='secondary' onClick={handleBack}>
        //           Back
        //         </Button>
        //         <Button size='large' type='submit' variant='contained'>
        //           Submit
        //         </Button>
        //       </Grid>
        //     </Grid>
        //   </form>
        // )
        // case 7:
        // return (
        //   <form key={7} onSubmit={handleComunicationSubmit(onSubmit)}>
        //     <Grid container spacing={5}>
        //       <Grid item xs={12}>
        //         <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary' }}>
        //           {steps[7].title}
        //         </Typography>
        //         {/* <Typography variant='caption' component='p'>
        //           {steps[2].subtitle}
        //         </Typography> */}
        //       </Grid>
        //       <Grid item xs={12} sm={6}>
        //         <FormControl fullWidth>
        //           <Controller
        //             name='languages'
        //             control={comunicationControl}
        //             rules={{ required: true }}
        //             render={({ field: { value, onChange } }) => (
        //               <TextField
        //                 value={value}
        //                 label='Idiomas'
        //                 onChange={onChange}
        //                 error={Boolean(comunicationErrors.languages)}
        //                 placeholder='Portugues'
        //                 aria-describedby='stepper-linear-comunication-languages'
        //               />
        //             )}
        //           />
        //           {comunicationErrors.languages && (
        //             <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-comunication-languages'>
        //               This field is required
        //             </FormHelperText>
        //           )}
        //         </FormControl>
        //       </Grid>
        //       <Grid item xs={12} sm={6}>
        //         <FormControl fullWidth>
        //           <Controller
        //             name='comunication-frecuency'
        //             control={comunicationControl}
        //             rules={{ required: true }}
        //             render={({ field: { value, onChange } }) => (
        //               <TextField
        //                 value={value}
        //                 label='Frecuencia de Comunicación'
        //                 onChange={onChange}
        //                 error={Boolean(comunicationErrors['comunication-frecuency'])}
        //                 placeholder='Día por medio'
        //                 aria-describedby='stepper-linear-comunication-comunication-frecuency'
        //               />
        //             )}
        //           />
        //           {comunicationErrors['comunication-frecuency'] && (
        //             <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-comunication-comunication-frecuency'>
        //               This field is required
        //             </FormHelperText>
        //           )}
        //         </FormControl>
        //       </Grid>
        //       <Grid item xs={12} sm={6}>
        //         <FormControl fullWidth>
        //           <Controller
        //             name='fav-type-of-content'
        //             control={comunicationControl}
        //             rules={{ required: true }}
        //             render={({ field: { value, onChange } }) => (
        //               <TextField
        //                 value={value}
        //                 label='Google+'
        //                 onChange={onChange}
        //                 error={Boolean(comunicationErrors['fav-type-of-content'])}
        //                 aria-describedby='stepper-linear-comunication-fav-type-of-content'
        //                 placeholder='Youtubers'
        //               />
        //             )}
        //           />
        //           {comunicationErrors['fav-type-of-content'] && (
        //             <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-comunication-fav-type-of-content'>
        //               This field is required
        //             </FormHelperText>
        //           )}
        //         </FormControl>
        //       </Grid>
        //     </Grid>
        //   </form>
        // )
      default:
        return null
    }
  }

  const renderContent = () => {
    if (activeStep === steps.length) {
      return (
        <Fragment>
          <Typography>All steps are completed!</Typography>
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
            <Button size='large' variant='contained' onClick={handleReset}>
              Reset
            </Button>
          </Box>
        </Fragment>
      )
    } else {
      return getStepContent(activeStep)
    }
  }

  return (
    <Card>
      <CardContent>
        <StepperWrapper>
          <Stepper activeStep={activeStep}>
            {steps.map((step, index) => {
              const labelProps: {
                error?: boolean
              } = {}
              if (index === activeStep) {
                labelProps.error = false
                if (
                  (personalErrors['last-name'] ||
                  personalErrors.gender ||
                  personalErrors['date-of-birth'] ||
                  personalErrors['marital-status'] ||
                  personalErrors['first-name']) &&
                  activeStep === 0
                ) {
                  labelProps.error = true
                }
                 else if (
                  (contactErrors.mail ||
                     contactErrors['alternative-mail'] ||
                     contactErrors.phone ||
                     contactErrors['post-code']) &&
                    activeStep === 1
                ) {
                  labelProps.error = true
                } else if (
                  (locationErrors.country ||
                     locationErrors.province ||
                     locationErrors.address ||
                     locationErrors['post-code'] ||
                     locationErrors.city) &&
                    activeStep === 2
                ) {
                  labelProps.error = true
                }

                // else if (
                //   (educationErrors.history ||
                //     educationErrors.grades ||
                //     educationErrors.schools ||
                //     educationErrors.dates) &&
                //   activeStep === 3
                // ) {
                //   labelProps.error = true
                // }
                // else if (
                //   (entertainmentErrors['games-matches'] ||
                //   entertainmentErrors['live-events'] || entertainmentErrors.theathers ||
                //   entertainmentErrors.museums) &&
                //   activeStep === 4
                //   ) {
                //     labelProps.error = true
                //   }
                //   else if (
                //     (shoppingErrors.apps ||
                //        shoppingErrors['orders-history'] ||
                //        shoppingErrors['billing-history'] ||
                //        shoppingErrors['delivery-preference']) &&
                //       activeStep === 5
                //   ) {
                //     labelProps.error = true
                //   } else if (
                //     (medicErrors['relevant-info'] ||
                //        medicErrors.allergies ||
                //        medicErrors['chronic-conditions'] ||
                //        medicErrors.medicines) &&
                //       activeStep === 6
                //   ) {
                //     labelProps.error = true
                //   } else if (
                //     (comunicationErrors.languages ||
                //        comunicationErrors['comunication-frecuency'] ||
                //        comunicationErrors['fav-type-of-content']) &&
                //       activeStep === 7
                //   ) {
                //     labelProps.error = true
                //   }
                else {
                  labelProps.error = false
                }
              }

              return (
                <Step key={index}>
                  <StepLabel {...labelProps} StepIconComponent={StepperCustomDot}>
                    <div className='step-label' >
                      <Typography className='step-number'>{`0${index + 1}`}</Typography>
                      <div >
                        <Typography className='step-title'>{step.title}</Typography>
                        {/* <Typography className='step-subtitle'>{step.subtitle}</Typography> */}
                      </div>
                    </div>
                  </StepLabel>
                </Step>
              )
            })}
          </Stepper>
        </StepperWrapper>
      </CardContent>

      <Divider sx={{ m: '0 !important' }} />

      <CardContent>{renderContent()}</CardContent>



    </Card>
  )
}

Register.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

Register.guestGuard = true

export default Register
