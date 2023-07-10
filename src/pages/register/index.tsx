import { Fragment, useState, ReactNode } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Step from '@mui/material/Step'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Select from '@mui/material/Select'
import Divider from '@mui/material/Divider'
import Stepper from '@mui/material/Stepper'
import MenuItem from '@mui/material/MenuItem'
import StepLabel from '@mui/material/StepLabel'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'

// import IconButton from '@mui/material/IconButton'

import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'

// import OutlinedInput from '@mui/material/OutlinedInput'

import FormHelperText from '@mui/material/FormHelperText'
import Autocomplete from '@mui/material/Autocomplete'

// import InputAdornment from '@mui/material/InputAdornment'

import { stepManager, CountryType } from '../../@core/utils/helpersForm'

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
    title: 'Información de contacto'
  },
  {
    title: 'Información personal'
  }
]

const defaultPersonalValues = {
  name: '',
  lastName: '',
  gender: '',
  birthdate: '',
  civilStatus: ''
}

const defaultContactValues = {
  altEmail: '',
  phone: '',
  zipCode: ''
}

const personalSchema = yup.object().shape({
  lastName: yup.string().required(),
  name: yup.string().required(),
  gender: yup.string().required(),
  birthdate: yup.string().required(),
  civilStatus: yup.string().required()
})

const contactSchema = yup.object().shape({
  altEmail: yup.string().email(),
  phone: yup.string().required(),
  zipCode: yup.string().required()
})

const Register = () => {
  // ** States
  const [activeStep, setActiveStep] = useState<number>(0)

  const countries: CountryType[] = [
    { code: 'AD', label: 'Andorra', phone: '376' },
    {
      code: 'AE',
      label: 'United Arab Emirates',
      phone: '971'
    },
    { code: 'AF', label: 'Afghanistan', phone: '93' },
    {
      code: 'AG',
      label: 'Antigua and Barbuda',
      phone: '1-268'
    },
    { code: 'AI', label: 'Anguilla', phone: '1-264' },
    { code: 'AL', label: 'Albania', phone: '355' },
    { code: 'AM', label: 'Armenia', phone: '374' },
    { code: 'AO', label: 'Angola', phone: '244' },
    { code: 'AQ', label: 'Antarctica', phone: '672' },
    { code: 'AR', label: 'Argentina', phone: '54' },
    { code: 'AS', label: 'American Samoa', phone: '1-684' },
    { code: 'AT', label: 'Austria', phone: '43' },
    {
      code: 'AU',
      label: 'Australia',
      phone: '61',
      suggested: true
    },
    { code: 'AW', label: 'Aruba', phone: '297' },
    { code: 'AX', label: 'Alland Islands', phone: '358' },
    { code: 'AZ', label: 'Azerbaijan', phone: '994' },
    {
      code: 'BA',
      label: 'Bosnia and Herzegovina',
      phone: '387'
    },
    { code: 'BB', label: 'Barbados', phone: '1-246' },
    { code: 'BD', label: 'Bangladesh', phone: '880' },
    { code: 'BE', label: 'Belgium', phone: '32' },
    { code: 'BF', label: 'Burkina Faso', phone: '226' },
    { code: 'BG', label: 'Bulgaria', phone: '359' },
    { code: 'BH', label: 'Bahrain', phone: '973' },
    { code: 'BI', label: 'Burundi', phone: '257' },
    { code: 'BJ', label: 'Benin', phone: '229' },
    { code: 'BL', label: 'Saint Barthelemy', phone: '590' },
    { code: 'BM', label: 'Bermuda', phone: '1-441' },
    { code: 'BN', label: 'Brunei Darussalam', phone: '673' },
    { code: 'BO', label: 'Bolivia', phone: '591' },
    { code: 'BR', label: 'Brazil', phone: '55' },
    { code: 'BS', label: 'Bahamas', phone: '1-242' },
    { code: 'BT', label: 'Bhutan', phone: '975' },
    { code: 'BV', label: 'Bouvet Island', phone: '47' },
    { code: 'BW', label: 'Botswana', phone: '267' },
    { code: 'BY', label: 'Belarus', phone: '375' },
    { code: 'BZ', label: 'Belize', phone: '501' },
    {
      code: 'CA',
      label: 'Canada',
      phone: '1',
      suggested: true
    },
    {
      code: 'CC',
      label: 'Cocos (Keeling) Islands',
      phone: '61'
    },
    {
      code: 'CD',
      label: 'Congo, Democratic Republic of the',
      phone: '243'
    },
    {
      code: 'CF',
      label: 'Central African Republic',
      phone: '236'
    },
    {
      code: 'CG',
      label: 'Congo, Republic of the',
      phone: '242'
    },
    { code: 'CH', label: 'Switzerland', phone: '41' },
    { code: 'CI', label: "Cote d'Ivoire", phone: '225' },
    { code: 'CK', label: 'Cook Islands', phone: '682' },
    { code: 'CL', label: 'Chile', phone: '56' },
    { code: 'CM', label: 'Cameroon', phone: '237' },
    { code: 'CN', label: 'China', phone: '86' },
    { code: 'CO', label: 'Colombia', phone: '57' },
    { code: 'CR', label: 'Costa Rica', phone: '506' },
    { code: 'CU', label: 'Cuba', phone: '53' },
    { code: 'CV', label: 'Cape Verde', phone: '238' },
    { code: 'CW', label: 'Curacao', phone: '599' },
    { code: 'CX', label: 'Christmas Island', phone: '61' },
    { code: 'CY', label: 'Cyprus', phone: '357' },
    { code: 'CZ', label: 'Czech Republic', phone: '420' },
    {
      code: 'DE',
      label: 'Germany',
      phone: '49',
      suggested: true
    },
    { code: 'DJ', label: 'Djibouti', phone: '253' },
    { code: 'DK', label: 'Denmark', phone: '45' },
    { code: 'DM', label: 'Dominica', phone: '1-767' },
    {
      code: 'DO',
      label: 'Dominican Republic',
      phone: '1-809'
    },
    { code: 'DZ', label: 'Algeria', phone: '213' },
    { code: 'EC', label: 'Ecuador', phone: '593' },
    { code: 'EE', label: 'Estonia', phone: '372' },
    { code: 'EG', label: 'Egypt', phone: '20' },
    { code: 'EH', label: 'Western Sahara', phone: '212' },
    { code: 'ER', label: 'Eritrea', phone: '291' },
    { code: 'ES', label: 'Spain', phone: '34' },
    { code: 'ET', label: 'Ethiopia', phone: '251' },
    { code: 'FI', label: 'Finland', phone: '358' },
    { code: 'FJ', label: 'Fiji', phone: '679' },
    {
      code: 'FK',
      label: 'Falkland Islands (Malvinas)',
      phone: '500'
    },
    {
      code: 'FM',
      label: 'Micronesia, Federated States of',
      phone: '691'
    },
    { code: 'FO', label: 'Faroe Islands', phone: '298' },
    {
      code: 'FR',
      label: 'France',
      phone: '33',
      suggested: true
    },
    { code: 'GA', label: 'Gabon', phone: '241' },
    { code: 'GB', label: 'United Kingdom', phone: '44' },
    { code: 'GD', label: 'Grenada', phone: '1-473' },
    { code: 'GE', label: 'Georgia', phone: '995' },
    { code: 'GF', label: 'French Guiana', phone: '594' },
    { code: 'GG', label: 'Guernsey', phone: '44' },
    { code: 'GH', label: 'Ghana', phone: '233' },
    { code: 'GI', label: 'Gibraltar', phone: '350' },
    { code: 'GL', label: 'Greenland', phone: '299' },
    { code: 'GM', label: 'Gambia', phone: '220' },
    { code: 'GN', label: 'Guinea', phone: '224' },
    { code: 'GP', label: 'Guadeloupe', phone: '590' },
    { code: 'GQ', label: 'Equatorial Guinea', phone: '240' },
    { code: 'GR', label: 'Greece', phone: '30' },
    {
      code: 'GS',
      label: 'South Georgia and the South Sandwich Islands',
      phone: '500'
    },
    { code: 'GT', label: 'Guatemala', phone: '502' },
    { code: 'GU', label: 'Guam', phone: '1-671' },
    { code: 'GW', label: 'Guinea-Bissau', phone: '245' },
    { code: 'GY', label: 'Guyana', phone: '592' },
    { code: 'HK', label: 'Hong Kong', phone: '852' },
    {
      code: 'HM',
      label: 'Heard Island and McDonald Islands',
      phone: '672'
    },
    { code: 'HN', label: 'Honduras', phone: '504' },
    { code: 'HR', label: 'Croatia', phone: '385' },
    { code: 'HT', label: 'Haiti', phone: '509' },
    { code: 'HU', label: 'Hungary', phone: '36' },
    { code: 'ID', label: 'Indonesia', phone: '62' },
    { code: 'IE', label: 'Ireland', phone: '353' },
    { code: 'IL', label: 'Israel', phone: '972' },
    { code: 'IM', label: 'Isle of Man', phone: '44' },
    { code: 'IN', label: 'India', phone: '91' },
    {
      code: 'IO',
      label: 'British Indian Ocean Territory',
      phone: '246'
    },
    { code: 'IQ', label: 'Iraq', phone: '964' },
    {
      code: 'IR',
      label: 'Iran, Islamic Republic of',
      phone: '98'
    },
    { code: 'IS', label: 'Iceland', phone: '354' },
    { code: 'IT', label: 'Italy', phone: '39' },
    { code: 'JE', label: 'Jersey', phone: '44' },
    { code: 'JM', label: 'Jamaica', phone: '1-876' },
    { code: 'JO', label: 'Jordan', phone: '962' },
    {
      code: 'JP',
      label: 'Japan',
      phone: '81',
      suggested: true
    },
    { code: 'KE', label: 'Kenya', phone: '254' },
    { code: 'KG', label: 'Kyrgyzstan', phone: '996' },
    { code: 'KH', label: 'Cambodia', phone: '855' },
    { code: 'KI', label: 'Kiribati', phone: '686' },
    { code: 'KM', label: 'Comoros', phone: '269' },
    {
      code: 'KN',
      label: 'Saint Kitts and Nevis',
      phone: '1-869'
    }
  ]

  const [caract, setCaract] = useState()

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

  const {
    reset: contactReset,
    control: contactControl,
    handleSubmit: handleContactSubmit,
    formState: { errors: contactErrors }
  } = useForm({
    defaultValues: defaultContactValues,
    resolver: yupResolver(contactSchema)
  })

  // Handle Stepper
  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1)
  }

  const handleReset = () => {
    setActiveStep(0)
    contactReset({ altEmail: '', phone: '', zipCode: '' })
    personalReset({ lastName: '', name: '', gender: '', birthdate: '', civilStatus: '' })
  }

  const onSubmit = (data: any) => {
    const manager = stepManager(activeStep, data, caract)
    console.log(manager)

    // fetch(`http://ec2-54-234-25-190.compute-1.amazonaws.com/auth/step/${activeStep + 1}`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(manager)
    // })
    //   .then(response => response.json())
    //   .then(result => {
    //     // Manipular el resultado de la respuesta
    //     console.log(result);
    //   })
    //   .catch(error => {
    //     // Manejar errores de la solicitud
    //     console.error('Error:', error);
    //   });

    setActiveStep(activeStep + 1)
    if (activeStep === steps.length - 1) {
      toast.success('Form Submitted')
    }
  }

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <form key={0} onSubmit={handleContactSubmit(onSubmit)}>
            <Grid container spacing={5}>
              <Grid item xs={12} marginTop={10}>
                <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary' }}>
                  {steps[0].title}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Controller
                    name='altEmail'
                    control={contactControl}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        type='email'
                        value={value}
                        label='Mail alternativo'
                        onChange={onChange}
                        error={Boolean(contactErrors.altEmail)}
                        placeholder='carlosperez@gmail.com'
                        aria-describedby='stepper-linear-contact-alternative-mail'
                      />
                    )}
                  />
                  {contactErrors.altEmail && (
                    <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-contact-alternative-mail'>
                      This field is required
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid container item xs={12} sm={6} spacing={10}>
                <Grid item>
                  <Autocomplete
                    id='country-select-demo'
                    sx={{ width: 320 }}
                    options={countries.length > 0 ? countries : []}
                    autoHighlight
                    getOptionLabel={option => option.label}
                    value={caract}
                    onChange={(newCar: any) => {
                      setCaract(newCar)
                    }}
                    renderOption={(props, option) => (
                      <Box component='div' component='li' sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                        <img
                          loading='lazy'
                          width='20'
                          src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                          srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                          alt=''
                        />
                        {option.label} ({option.code}) +{option.phone}
                      </Box>
                    )}
                    renderInput={params => (
                      <TextField
                        {...params}
                        label='Elige país'
                        error={Boolean(contactErrors.phone)}
                        inputProps={{
                          ...params.inputProps,
                          autoComplete: 'new-password' // disable autocomplete and autofill
                        }}
                      />
                    )}
                  />
                  {contactErrors.phone && (
                    <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-contact-phone'>
                      This field is required
                    </FormHelperText>
                  )}
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
              </Grid>
              <Grid item xs={12} sm={11.8}>
                <FormControl fullWidth>
                  <Controller
                    name='zipCode'
                    control={contactControl}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value}
                        label='Código postal'
                        onChange={onChange}
                        error={Boolean(contactErrors.zipCode)}
                        placeholder='3000'
                        aria-describedby='stepper-linear-contact-post-code'
                      />
                    )}
                  />
                  {contactErrors.zipCode && (
                    <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-contact-post-code'>
                      This field is required
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
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
          <form key={1} onSubmit={handlePersonalSubmit(onSubmit)}>
            <Grid container spacing={5}>
              <Grid item xs={12} marginTop={10}>
                <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary' }}>
                  {steps[1].title}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Controller
                    name='name'
                    control={personalControl}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value}
                        label='Nombre'
                        onChange={onChange}
                        placeholder='Nombre'
                        error={Boolean(personalErrors.name)}
                        aria-describedby='stepper-linear-personal-first-name'
                      />
                    )}
                  />
                  {personalErrors.name && (
                    <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-personal-first-name'>
                      This field is required
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Controller
                    name='lastName'
                    control={personalControl}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value}
                        label='Apellido'
                        onChange={onChange}
                        error={Boolean(personalErrors.lastName)}
                        placeholder='Apellido'
                        aria-describedby='stepper-linear-personal-last-name'
                      />
                    )}
                  />
                  {personalErrors.lastName && (
                    <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-personal-last-name'>
                      This field is required
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel
                    id='stepper-linear-personal-gender'
                    error={Boolean(personalErrors.gender)}
                    htmlFor='stepper-linear-personal-gender'
                  >
                    Género
                  </InputLabel>
                  <Controller
                    name='gender'
                    control={personalControl}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <Select
                        value={value}
                        label='Género'
                        onChange={onChange}
                        error={Boolean(personalErrors.gender)}
                        labelId='stepper-linear-personal-gender'
                        aria-describedby='stepper-linear-personal-gender-helper'
                      >
                        <MenuItem value='MALE'>Hombre</MenuItem>
                        <MenuItem value='FEMALE'>Mujer</MenuItem>
                        <MenuItem value='NON-BINARY'>No binario</MenuItem>
                        <MenuItem value='OTHER'>Otro</MenuItem>
                        <MenuItem value='PREFER-NOT-TO-SAY'>Prefiero no decir</MenuItem>
                      </Select>
                    )}
                  />
                  {personalErrors.gender && (
                    <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-personal-gender-helper'>
                      This field is required
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Controller
                    name='birthdate'
                    control={personalControl}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value}
                        label='Fecha de Nacimiento'
                        onChange={onChange}
                        error={Boolean(personalErrors.birthdate)}
                        placeholder='31/08/93'
                        aria-describedby='stepper-linear-personal-date-of-birth'
                      />
                    )}
                  />
                  {personalErrors.birthdate && (
                    <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-personal-date-of-birth'>
                      This field is required
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12}>
                <FormControl fullWidth>
                  <InputLabel
                    id='stepper-linear-personal-civilStatus'
                    error={Boolean(personalErrors.civilStatus)}
                    htmlFor='stepper-linear-personal-civilStatus'
                  >
                    Estado civil
                  </InputLabel>
                  <Controller
                    name='civilStatus'
                    control={personalControl}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <Select
                        value={value}
                        label='Estado civil'
                        onChange={onChange}
                        error={Boolean(personalErrors.civilStatus)}
                        labelId='stepper-linear-personal-civilStatus'
                        aria-describedby='stepper-linear-personal-civilStatus-helper'
                      >
                        <MenuItem value='SINGLE'>Soltero</MenuItem>
                        <MenuItem value='MARRIED'>Casado</MenuItem>
                        <MenuItem value='WIDOWED'>Viudo</MenuItem>
                        <MenuItem value='DIVORCED'>Divorciado</MenuItem>
                        <MenuItem value='PREFER-NOT-TO-SAY'>Prefiero no decir</MenuItem>
                      </Select>
                    )}
                  />
                  {personalErrors.civilStatus && (
                    <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-personal-gender-helper'>
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
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        )
      default:
        return null
    }
  }

  const renderContent = () => {
    if (activeStep === steps.length) {
      return (
        <Fragment>
          <Typography>All steps are completed!</Typography>
          <Box component='div' sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
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
                if ((contactErrors.phone || contactErrors.altEmail || contactErrors.zipCode) && activeStep === 0) {
                  labelProps.error = true
                } else if (
                  (personalErrors.lastName ||
                    personalErrors.gender ||
                    personalErrors.birthdate ||
                    personalErrors.civilStatus ||
                    personalErrors.name) &&
                  activeStep === 1
                ) {
                  labelProps.error = true
                } else {
                  labelProps.error = false
                }
              }

              return (
                <Step key={index}>
                  <StepLabel {...labelProps} StepIconComponent={StepperCustomDot}>
                    <div className='step-label'>
                      <Typography className='step-number'>{`0${index + 1}`}</Typography>
                      <div>
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
