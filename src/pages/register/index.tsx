import { Fragment, useState, ReactNode, forwardRef, ChangeEvent, useEffect } from 'react'

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
import Checkbox from '@mui/material/Checkbox'
import StepLabel from '@mui/material/StepLabel'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import Autocomplete from '@mui/material/Autocomplete'
import FormHelperText from '@mui/material/FormHelperText'
import FormControlLabel from '@mui/material/FormControlLabel'

// ** Third Party Imports
import * as yup from 'yup'
import toast from 'react-hot-toast'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import DatePicker from 'react-datepicker'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Types
import { DateType } from 'src/types/forms/reactDatepickerTypes'

// ** Custom Components Imports
import StepperCustomDot from './StepperCustomDot'
import BlankLayout from 'src/@core/layouts/BlankLayoutOnBoarding'

// ** Styled Components
import StepperWrapper from 'src/@core/styles/mui/stepper'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

import Link from 'next/link'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProvincias, fetchMunicipios, setSelectedProvinciaId, CountriesReducer } from 'src/store/apps/countries'
import { useAuth } from 'src/hooks/useAuth'
import { stepManager, CountryType, isNumber } from '../../@core/utils/helpersForm'
import { Canvas } from '@react-three/fiber'
import AstSit from '../../@core/components/holocruxe-model/AstronautSit'
import AstWave from '../../@core/components/holocruxe-model/AstronautWave'
import AstBeyond from '../../@core/components/holocruxe-model/AstronautBeyond'
import AstVolt from '../../@core/components/holocruxe-model/AstronautVoltereta'
import Deportes from '../../@core/icons/OnBoardingStep/Deportes'
import Musica from '../../@core/icons/OnBoardingStep/Musica'
import Arte from '../../@core/icons/OnBoardingStep/Arte'
import Juegos from '../../@core/icons/OnBoardingStep/Juegos'
import Salado from '../../@core/icons/OnBoardingStep/Salado'
import Dulce from '../../@core/icons/OnBoardingStep/Dulce'
import Viajes from '../../@core/icons/OnBoardingStep/Viajes'
import Fotografia from '../../@core/icons/OnBoardingStep/Fotografia'
import Fitness from '../../@core/icons/OnBoardingStep/Fitness'
import Moda from '../../@core/icons/OnBoardingStep/Moda'
import Series from '../../@core/icons/OnBoardingStep/Series'
import Ciencia from '../../@core/icons/OnBoardingStep/Ciencia'
import Astronomia from '../../@core/icons/OnBoardingStep/Astronomia'
import Ecologia from '../../@core/icons/OnBoardingStep/Ecologia'
import Crianza from '../../@core/icons/OnBoardingStep/Crianza'
import Psic from '../../@core/icons/OnBoardingStep/Psic'
import { AppDispatch, RootState } from 'src/store'
import RightBlueAirplane from 'src/@core/icons/OnBoardingStep/RightBlueAirplane'
import LeftBlueAirplane from 'src/@core/icons/OnBoardingStep/LeftBlueAirplane'

const steps = [
  {
    title: 'Información de contacto'
  },
  {
    title: 'Información personal'
  },
  {
    title: 'Formación y trayectoria laboral'
  },
  {
    title: 'Intereses generales'
  }
]

interface CustomInputProps {
  value: DateType
  label: string
  error: boolean
  onChange: (event: ChangeEvent) => void
}

const CustomInput = forwardRef(({ ...props }: CustomInputProps, ref) => {
  return <TextField inputRef={ref} {...props} sx={{ width: '100%' }} />
})

const defaultPersonalValues = {
  personal: {
    name: '',
    gender: '',
    birthdate: null,
    civilStatus: ''
  }
}

const defaultContactValues = {
  contactInfo: {
    altEmail: '',
    phone: '',
    zipCode: ''
  },
  location: {
    country: '',
    provinceOrState: '',
    city: '',
    language: ''
  }
}

const defaultProfessionalValues = {
  professional: {
    educationLevel: '',
    graduationYear: 0,
    academicField: '',
    occupation: '',
    job: ''
  }
}

const defaultGeneralInsterestsValues = {
  generalInterests: {
    likes: []
  }
}

const personalSchema = yup.object().shape({
  personal: yup.object({
    name: yup.string().required(),
    gender: yup.string().required(),
    birthdate: yup.string().required(),
    civilStatus: yup.string().required()
  })
})

const contactSchema = yup.object().shape({
  contactInfo: yup.object({
    altEmail: yup.string().email(),
    phone: yup.string().required(),
    zipCode: yup.string().required()
  }),
  location: yup.object({
    language: yup.string().required(),
    country: yup.string().required(),
    provinceOrState: yup.string().required(),
    city: yup.string().required()
  })
})

const professionalSchema = yup.object().shape({
  professional: yup.object({
    educationLevel: yup.string().required(),
    graduationYear: yup.number().required(),
    academicField: yup.string().required(),
    occupation: yup.string().required(),
    job: yup.string().required()
  })
})

const generalInterestsSchema = yup.object().shape({
  generalInterests: yup.object({
    likes: yup.array()
  })
})

const Register = () => {
  const router = useRouter()

  const currentStep = localStorage.getItem('step')
  const step = isNumber(currentStep) ?? steps.length
  const { logout } = useAuth()

  const [, setAnchorEl] = useState<Element | null>(null)

  const handleDropdownClose = (url?: string) => {
    if (url) {
      router.push(url)
    }
    setAnchorEl(null)
  }

  const handleLogout = () => {
    logout()
    handleDropdownClose()
  }

  // ** States
  const [activeStep, setActiveStep] = useState<number>(step)

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

  const interests = [
    { id: 1, name: 'Deportes', value: 'SPORTS', icon: <Deportes /> },
    { id: 2, name: 'Música', value: 'MUSIC', icon: <Musica /> },
    { id: 3, name: 'Arte', value: 'ART', icon: <Arte /> },
    { id: 4, name: 'Juegos', value: 'GAMES', icon: <Juegos /> },
    { id: 5, name: 'Salado', value: 'SALTY', icon: <Salado /> },
    { id: 6, name: 'Dulce', value: 'SWEET', icon: <Dulce /> },
    { id: 7, name: 'Viajes', value: 'TRAVEL', icon: <Viajes /> },
    { id: 8, name: 'Fotografía', value: 'PHOTOGRAPHY', icon: <Fotografia /> },
    { id: 9, name: 'Fitness', value: 'FITNESS', icon: <Fitness /> },
    { id: 10, name: 'Moda y belleza', value: 'TRENDING & BEAUTY', icon: <Moda /> },
    { id: 11, name: 'Películas y series', value: 'MOVIES & SERIES', icon: <Series /> },
    { id: 12, name: 'Ciencia', value: 'SCIENCE', icon: <Ciencia /> },
    { id: 13, name: 'Mindfulness y meditación', value: 'MINDFULNESS & MEDITATION', icon: <Musica /> },
    { id: 14, name: 'Astronomía', value: 'ASTRONOMY', icon: <Astronomia /> },
    { id: 15, name: 'Ecología', value: 'ECOLOGY', icon: <Ecologia /> },
    { id: 16, name: 'Crianza y maternidad', value: 'UPBRINGING', icon: <Crianza /> },
    { id: 16, name: 'Psicología', value: 'PSYCHOLOGY', icon: <Psic /> }
  ]

  const year = [
    { year: '1960' },
    { year: '1961' },
    { year: '1962' },
    { year: '1963' },
    { year: '1964' },
    { year: '1965' },
    { year: '1966' },
    { year: '1967' },
    { year: '1968' },
    { year: '1969' },
    { year: '1970' },
    { year: '1971' },
    { year: '1972' },
    { year: '1973' },
    { year: '1974' },
    { year: '1975' },
    { year: '1976' },
    { year: '1977' },
    { year: '1978' },
    { year: '1979' },
    { year: '1980' },
    { year: '1981' },
    { year: '1982' },
    { year: '1983' },
    { year: '1984' },
    { year: '1985' },
    { year: '1986' },
    { year: '1987' },
    { year: '1988' },
    { year: '1989' },
    { year: '1990' },
    { year: '1991' },
    { year: '1992' },
    { year: '1993' },
    { year: '1994' },
    { year: '1990' },
    { year: '1991' },
    { year: '1992' },
    { year: '1993' },
    { year: '1994' },
    { year: '1995' },
    { year: '1996' },
    { year: '1997' },
    { year: '1998' },
    { year: '1999' },
    { year: '2000' },
    { year: '2001' },
    { year: '2002' },
    { year: '2003' },
    { year: '2004' },
    { year: '2005' },
    { year: '2006' },
    { year: '2007' },
    { year: '2008' },
    { year: '2009' },
    { year: '2010' },
    { year: '2011' },
    { year: '2012' },
    { year: '2013' },
    { year: '2014' },
    { year: '2015' },
    { year: '2016' },
    { year: '2017' },
    { year: '2018' },
    { year: '2019' },
    { year: '2020' },
    { year: '2021' },
    { year: '2022' },
    { year: '2023' }
  ]
  const [checkedValues, setCheckedValues] = useState([] as string[])

  const handleSelect = (checkedName: string) => {
    const newNames = checkedValues?.includes(checkedName)
      ? checkedValues?.filter(name => name !== checkedName)
      : [...(checkedValues ?? []), checkedName]
    setCheckedValues(newNames)

    return newNames
  }

  const dispatch = useDispatch<AppDispatch>()
  const store: CountriesReducer = useSelector((state: RootState) => state.countries)
  const municipios = useSelector((state: RootState) => state.countries.municipios)

  const handleProvinciaChange = (event: any) => {
    const selectedId = event.target.value
    dispatch(setSelectedProvinciaId(selectedId))
    dispatch(fetchMunicipios(selectedId))
  }

  useEffect(() => {
    dispatch(fetchProvincias())
  }, [dispatch])

  // ** Hooks
  const {
    control: personalControl,
    handleSubmit: handlePersonalSubmit,
    formState: { errors: personalErrors }
  } = useForm({
    defaultValues: defaultPersonalValues,
    resolver: yupResolver(personalSchema)
  })

  const {
    control: contactControl,
    handleSubmit: handleContactSubmit,
    formState: { errors: contactErrors }
  } = useForm({
    defaultValues: defaultContactValues,
    resolver: yupResolver(contactSchema)
  })

  const {
    control: professionalControl,
    handleSubmit: handleProfessionalSubmit,
    formState: { errors: professionalErrors }
  } = useForm({
    defaultValues: defaultProfessionalValues,
    resolver: yupResolver(professionalSchema)
  })

  const {
    control: generalInsterestsControl,
    handleSubmit: handleGeneralInsterestsSubmit,
    formState: { errors: generalInsterestsErrors }
  } = useForm({
    defaultValues: defaultGeneralInsterestsValues,
    resolver: yupResolver(generalInterestsSchema)
  })

  // Handle Stepper
  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1)
  }

  const onSubmit = async (data: any) => {
    const manager = stepManager(activeStep, data, caract)
    console.log('🚀 ~ file: index.tsx:506 ~ onSubmit ~ manager:', manager)
    try {
      const token = localStorage.getItem('AuthorizationToken')

      const response = await fetch(`${process.env.NEXT_PUBLIC_MANDALORE}/user/form/step`, {
        method: 'POST',

        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(manager)
      })
      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message)
      }

      localStorage.setItem('step', (step + 1).toString())
      setActiveStep(activeStep + 1)
      if (activeStep === steps.length - 1) {
        toast.success('Formulario completado!')
        localStorage.setItem('status', 'COMPLETE')

        router.replace('/home')
      }
    } catch (error: any) {
      toast.error(error.message)

      console.log(error.message)
    }
  }

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <form key={0} onSubmit={handleContactSubmit(onSubmit)}>
            <Grid container spacing={5}>
              <Grid item xs={12} marginTop={10}>
                <Typography variant='body2' sx={{ fontWeight: 600, color: '#00FFED' }}>
                  {steps[0].title}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Controller
                    name='contactInfo.altEmail'
                    control={contactControl}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        type='email'
                        value={value}
                        label='E-mail alternativo'
                        onChange={onChange}
                        error={Boolean(contactErrors.contactInfo?.altEmail)}
                        placeholder='carlosperez@gmail.com'
                        aria-describedby='stepper-linear-contact-alternative-mail'
                        InputProps={{ style: { color: '#00FFED' } }}
                        InputLabelProps={{ style: { color: '#00FFED' } }}
                      />
                    )}
                  />
                  {contactErrors.contactInfo?.altEmail && (
                    <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-contact-alternative-mail'>
                      Campo requerido
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
                    onChange={(event: any, newCar: any) => {
                      setCaract(newCar)
                    }}
                    renderOption={(props, option) => (
                      <Box component='li' sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
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
                      <TextField {...params} label='Elige país' error={Boolean(contactErrors.contactInfo?.phone)} />
                    )}
                  />
                  {contactErrors.contactInfo?.phone && (
                    <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-contact-phone'>
                      Campo requerido
                    </FormHelperText>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <Controller
                      name='contactInfo.phone'
                      control={contactControl}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          value={value}
                          label='Teléfono'
                          onChange={onChange}
                          error={Boolean(contactErrors.contactInfo?.phone)}
                          aria-describedby='stepper-linear-contact-phone'
                          placeholder='12345678'
                        />
                      )}
                    />
                    {contactErrors.contactInfo?.phone && (
                      <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-contact-phone'>
                        Campo requerido
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel
                    id='stepper-linear-personal-gender'
                    error={Boolean(contactErrors.location?.language)}
                    htmlFor='stepper-linear-personal-gender'
                  >
                    Idioma
                  </InputLabel>
                  <Controller
                    name='location.language'
                    control={contactControl}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <Select
                        value={value}
                        label='Idioma'
                        onChange={onChange}
                        error={Boolean(contactErrors.location?.language)}
                        labelId='stepper-linear-personal-gender'
                        aria-describedby='stepper-linear-personal-gender-helper'
                      >
                        <MenuItem value='SPANISH'>Español</MenuItem>
                        <MenuItem value='ENGLISH'>Inglés</MenuItem>
                      </Select>
                    )}
                  />
                  {contactErrors.location?.language && (
                    <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-personal-gender-helper'>
                      Campo requerido
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel
                    id='stepper-linear-personal-gender'
                    error={Boolean(contactErrors.location?.country)}
                    htmlFor='stepper-linear-personal-gender'
                  >
                    País
                  </InputLabel>
                  <Controller
                    name='location.country'
                    control={contactControl}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <Select
                        value={value}
                        label='País'
                        onChange={onChange}
                        error={Boolean(contactErrors.location?.country)}
                        labelId='stepper-linear-personal-gender'
                        aria-describedby='stepper-linear-personal-gender-helper'
                      >
                        <MenuItem value='ARG'>Argentina</MenuItem>
                        <MenuItem value='BR' disabled>
                          Brasil
                        </MenuItem>
                        <MenuItem value='BOL' disabled>
                          Bolivia
                        </MenuItem>
                        <MenuItem value='CH' disabled>
                          Chile
                        </MenuItem>
                      </Select>
                    )}
                  />
                  {contactErrors.location?.country && (
                    <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-personal-gender-helper'>
                      Campo requerido
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel
                    id='stepper-linear-personal-gender'
                    error={Boolean(contactErrors.location?.provinceOrState)}
                    htmlFor='stepper-linear-personal-gender'
                  >
                    Provincia
                  </InputLabel>
                  <Controller
                    name='location.provinceOrState'
                    control={contactControl}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <Select
                        value={value}
                        label='Provincia'
                        onChange={e => {
                          onChange(e) // Actualizar el valor en el controlador
                          handleProvinciaChange(e) // Llamar a tu función de manejo
                        }}
                        error={Boolean(contactErrors.location?.provinceOrState)}
                        labelId='stepper-linear-personal-gender'
                        aria-describedby='stepper-linear-personal-gender-helper'
                      >
                        {store?.provincias?.length &&
                          store.provincias.map(p => (
                            <MenuItem key={p.id} value={p.nombre}>
                              {p.nombre}
                            </MenuItem>
                          ))}
                      </Select>
                    )}
                  />
                  {contactErrors.location?.provinceOrState && (
                    <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-personal-gender-helper'>
                      Campo requerido
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel
                    id='stepper-linear-personal-gender'
                    error={Boolean(contactErrors.location?.city)}
                    htmlFor='stepper-linear-personal-gender'
                  >
                    Municipio
                  </InputLabel>
                  <Controller
                    name='location.city'
                    control={contactControl}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <Select
                        value={value}
                        label='Idioma'
                        onChange={onChange}
                        error={Boolean(contactErrors.location?.city)}
                        labelId='stepper-linear-personal-gender'
                        aria-describedby='stepper-linear-personal-gender-helper'
                      >
                        {municipios.map((municipio, i) => (
                          <MenuItem key={i} value={municipio}>
                            {municipio}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                  {contactErrors.location?.city && (
                    <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-personal-gender-helper'>
                      Campo requerido
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12}>
                <FormControl fullWidth>
                  <Controller
                    name='contactInfo.zipCode'
                    control={contactControl}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value}
                        label='Código postal'
                        onChange={onChange}
                        error={Boolean(contactErrors.contactInfo?.zipCode)}
                        placeholder='3000'
                        aria-describedby='stepper-linear-contact-post-code'
                      />
                    )}
                  />
                  {contactErrors.contactInfo?.zipCode && (
                    <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-contact-post-code'>
                      Campo requerido
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'end', paddingBottom: '5em' }}>
                <Button
                  size='large'
                  type='submit'
                  variant='contained'
                  startIcon={<RightBlueAirplane />}
                  sx={{
                    '&:hover': {
                      color: '#00FFED',
                      background: 'linear-gradient(180deg, #00FFED 0%, rgba(248, 54, 244, 0.20) 100%)',
                      boxShadow: '4px 4px 25px 0px rgba(0, 0, 0, 0.70), 4px 4px 4px 0px rgba(255, 255, 255, 0.25) inset'
                    }
                  }}
                >
                  siguiente
                </Button>
              </Grid>
              <Canvas shadows style={{ height: '13em' }}>
                <ambientLight intensity={0.5} />
                <directionalLight castShadow position={[2, 2, 2]} />
                <AstWave />
              </Canvas>
            </Grid>
          </form>
        )
      case 1:
        return (
          <form key={1} onSubmit={handlePersonalSubmit(onSubmit)}>
            <Grid container spacing={5}>
              <Grid item xs={12} marginTop={10}>
                <Typography variant='body2' sx={{ fontWeight: 600, color: '#00FFED' }}>
                  {steps[1].title}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Controller
                    name='personal.name'
                    control={personalControl}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value}
                        label='Nombre de usuario'
                        onChange={onChange}
                        placeholder='Nombre de usuario'
                        error={Boolean(personalErrors.personal?.name)}
                        aria-describedby='stepper-linear-personal-first-name'
                      />
                    )}
                  />
                  {personalErrors.personal?.name && (
                    <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-personal-first-name'>
                      Campo requerido
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel
                    id='stepper-linear-personal-gender'
                    error={Boolean(personalErrors.personal?.gender)}
                    htmlFor='stepper-linear-personal-gender'
                  >
                    Género
                  </InputLabel>
                  <Controller
                    name='personal.gender'
                    control={personalControl}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <Select
                        value={value}
                        label='Género'
                        onChange={onChange}
                        error={Boolean(personalErrors.personal?.gender)}
                        labelId='stepper-linear-personal-gender'
                        aria-describedby='stepper-linear-personal-gender-helper'
                      >
                        <MenuItem value='MALE'>Hombre</MenuItem>
                        <MenuItem value='FEMALE'>Mujer</MenuItem>
                        {/* <MenuItem value='NON-BINARY'>No binario</MenuItem> */}
                        <MenuItem value='OTHER'>Otro</MenuItem>
                        <MenuItem value='PREFER-NOT-TO-SAY'>Prefiero no decir</MenuItem>
                      </Select>
                    )}
                  />
                  {personalErrors.personal?.gender && (
                    <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-personal-gender-helper'>
                      Campo requerido
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <DatePickerWrapper>
                  <Controller
                    name='personal.birthdate'
                    control={personalControl}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <DatePicker
                        selected={value}
                        showYearDropdown
                        showMonthDropdown
                        onChange={e => onChange(e)}
                        placeholderText='MM/DD/YYYY'
                        customInput={
                          <CustomInput
                            value={value}
                            onChange={onChange}
                            label='Date of Birth'
                            error={Boolean(personalErrors.personal?.birthdate)}
                            aria-describedby='validation-basic-dob'
                          />
                        }
                      />
                    )}
                  />
                  {personalErrors.personal?.birthdate && (
                    <FormHelperText sx={{ mx: 3.5, color: 'error.main' }} id='validation-basic-dob'>
                      Campo requerido
                    </FormHelperText>
                  )}
                </DatePickerWrapper>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel
                    id='stepper-linear-personal-civilStatus'
                    error={Boolean(personalErrors.personal?.civilStatus)}
                    htmlFor='stepper-linear-personal-civilStatus'
                  >
                    Estado civil
                  </InputLabel>
                  <Controller
                    name='personal.civilStatus'
                    control={personalControl}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <Select
                        value={value}
                        label='Estado civil'
                        onChange={onChange}
                        error={Boolean(personalErrors.personal?.civilStatus)}
                        labelId='stepper-linear-personal-civilStatus'
                        aria-describedby='stepper-linear-personal-civilStatus-helper'
                      >
                        <MenuItem value='SINGLE'>Soltero/a</MenuItem>
                        <MenuItem value='MARRIED'>Casado/a</MenuItem>
                        <MenuItem value='WIDOWED'>Viudo/a</MenuItem>
                        <MenuItem value='DIVORCED'>Divorciado/a</MenuItem>
                        <MenuItem value='PREFER-NOT-TO-SAY'>Prefiero no decir</MenuItem>
                      </Select>
                    )}
                  />
                  {personalErrors.personal?.civilStatus && (
                    <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-personal-gender-helper'>
                      Campo requerido
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '5em' }}>
                <Button
                  size='large'
                  variant='contained'
                  startIcon={<LeftBlueAirplane />}
                  onClick={handleBack}
                  sx={{
                    '&:hover': {
                      color: '#00FFED',
                      background: 'linear-gradient(180deg, #00FFED 0%, rgba(248, 54, 244, 0.20) 100%)',
                      boxShadow: '4px 4px 25px 0px rgba(0, 0, 0, 0.70), 4px 4px 4px 0px rgba(255, 255, 255, 0.25) inset'
                    }
                  }}
                >
                  Atrás
                </Button>
                <Button
                  size='large'
                  type='submit'
                  variant='contained'
                  startIcon={<RightBlueAirplane />}
                  sx={{
                    '&:hover': {
                      color: '#00FFED',
                      background: 'linear-gradient(180deg, #00FFED 0%, rgba(248, 54, 244, 0.20) 100%)',
                      boxShadow: '4px 4px 25px 0px rgba(0, 0, 0, 0.70), 4px 4px 4px 0px rgba(255, 255, 255, 0.25) inset'
                    }
                  }}
                >
                  Siguiente
                </Button>
              </Grid>
              <Canvas shadows>
                <ambientLight intensity={0.5} />
                <directionalLight castShadow position={[2, 2, 2]} />
                <AstVolt />
              </Canvas>
            </Grid>
          </form>
        )
      case 2:
        return (
          <form key={2} onSubmit={handleProfessionalSubmit(onSubmit)}>
            <Grid container spacing={5}>
              <Grid item xs={12} marginTop={10}>
                <Typography variant='body2' sx={{ fontWeight: 600, color: '#00FFED' }}>
                  {steps[2].title}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel
                    id='stepper-linear-professional-educationLevel'
                    error={Boolean(professionalErrors.professional?.educationLevel)}
                    htmlFor='stepper-linear-professional-educationLevel'
                  >
                    Nivel de educación
                  </InputLabel>
                  <Controller
                    name='professional.educationLevel'
                    control={professionalControl}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <Select
                        value={value}
                        label='Nivel de educación'
                        onChange={onChange}
                        error={Boolean(professionalErrors.professional?.educationLevel)}
                        labelId='stepper-linear-professional-educationLevel'
                        aria-describedby='stepper-linear-formation-edu-helper'
                      >
                        <MenuItem value='ELEMENTARY_SCHOOL'>Primaria</MenuItem>
                        <MenuItem value='MIDDLE_SCHOOL'>Escuela intermedia</MenuItem>
                        <MenuItem value='HIGH_SCHOOL'>Secundario</MenuItem>
                        <MenuItem value='COLLEGE'>Universidad</MenuItem>
                      </Select>
                    )}
                  />
                  {professionalErrors.professional?.educationLevel && (
                    <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-formation-edu-helper'>
                      Campo requerido
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel
                    id='stepper-linear-professional-graduationYear'
                    error={Boolean(professionalErrors.professional?.graduationYear)}
                    htmlFor='stepper-linear-professional-graduationYear'
                  >
                    Año de graduación
                  </InputLabel>
                  <Controller
                    name='professional.graduationYear'
                    control={professionalControl}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <Select
                        value={value}
                        label='Año de graduación'
                        onChange={onChange}
                        error={Boolean(professionalErrors.professional?.graduationYear)}
                        labelId='stepper-linear-professional-graduationYear'
                        aria-describedby='stepper-linear-professional-graduationYear-helper'
                      >
                        {year.map((y, i) => (
                          <MenuItem key={i} value={y.year}>
                            {y.year}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                  {professionalErrors.professional?.graduationYear && (
                    <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-professional-graduationYear-helper'>
                      Campo requerido
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Controller
                    name='professional.academicField'
                    control={professionalControl}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value}
                        label='Area de estudio'
                        onChange={onChange}
                        placeholder='Area de estudio'
                        error={Boolean(professionalErrors.professional?.academicField)}
                        aria-describedby='stepper-linear-professional-academicField'
                      />
                    )}
                  />
                  {professionalErrors.professional?.academicField && (
                    <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-professional-academicField'>
                      Campo requerido
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Controller
                    name='professional.occupation'
                    control={professionalControl}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value}
                        label='Ocupación'
                        onChange={onChange}
                        placeholder='Veterinario'
                        error={Boolean(professionalErrors.professional?.occupation)}
                        aria-describedby='stepper-linear-professional-occupation'
                      />
                    )}
                  />
                  {professionalErrors.professional?.occupation && (
                    <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-professional-occupation'>
                      Campo requerido
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Controller
                    name='professional.job'
                    control={professionalControl}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value}
                        label='Cargo o Puesto'
                        onChange={onChange}
                        placeholder='Veterinario'
                        error={Boolean(professionalErrors.professional?.job)}
                        aria-describedby='stepper-linear-professional-job'
                      />
                    )}
                  />
                  {professionalErrors.professional?.job && (
                    <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-professional-job'>
                      Campo requerido
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '5em' }}>
                <Button
                  size='large'
                  variant='contained'
                  startIcon={<LeftBlueAirplane />}
                  onClick={handleBack}
                  sx={{
                    '&:hover': {
                      color: '#00FFED',
                      background: 'linear-gradient(180deg, #00FFED 0%, rgba(248, 54, 244, 0.20) 100%)',
                      boxShadow: '4px 4px 25px 0px rgba(0, 0, 0, 0.70), 4px 4px 4px 0px rgba(255, 255, 255, 0.25) inset'
                    }
                  }}
                >
                  Atrás
                </Button>
                <Button
                  size='large'
                  type='submit'
                  variant='contained'
                  startIcon={<RightBlueAirplane />}
                  sx={{
                    '&:hover': {
                      color: '#00FFED',
                      background: 'linear-gradient(180deg, #00FFED 0%, rgba(248, 54, 244, 0.20) 100%)',
                      boxShadow: '4px 4px 25px 0px rgba(0, 0, 0, 0.70), 4px 4px 4px 0px rgba(255, 255, 255, 0.25) inset'
                    }
                  }}
                >
                  Siguiente
                </Button>
              </Grid>
              <Canvas shadows>
                <ambientLight intensity={0.5} />
                <directionalLight castShadow position={[2, 2, 2]} />
                <AstSit />
              </Canvas>
            </Grid>
          </form>
        )
      case 3:
        return (
          <form key={3} onSubmit={handleGeneralInsterestsSubmit(onSubmit)}>
            <Grid container spacing={5}>
              <Grid item xs={12} marginTop={10}>
                <Typography variant='body2' sx={{ fontWeight: 600, color: '#00FFED' }}>
                  {steps[3].title}
                </Typography>
              </Grid>

              <Grid container spacing={3}>
                {interests.map((f, i) => (
                  <Grid
                    item
                    xs={11}
                    sm={6}
                    lg={3}
                    key={i}
                    style={{ paddingLeft: '2em', paddingTop: '2em', alignItems: 'center' }}
                  >
                    {f.icon}
                    <FormControl>
                      <Controller
                        name='generalInterests.likes'
                        control={generalInsterestsControl}
                        rules={{ required: true }}
                        render={({ field: { onChange: onCheckChange } }) => (
                          <FormControlLabel
                            label={f.name}
                            control={
                              <Checkbox
                                name='validation-basic-checkbox'
                                style={{ paddingLeft: '1em' }}
                                value={f}
                                checked={checkedValues.includes(f.value)}
                                onChange={() => onCheckChange(handleSelect(f.value))}
                              />
                            }
                          />
                        )}
                      />
                    </FormControl>
                  </Grid>
                ))}

                <Grid
                  item
                  xs={12}
                  sx={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '5em', mt: 15 }}
                >
                  <Button
                    size='large'
                    variant='contained'
                    startIcon={<LeftBlueAirplane />}
                    onClick={handleBack}
                    sx={{
                      '&:hover': {
                        color: '#00FFED',
                        background: 'linear-gradient(180deg, #00FFED 0%, rgba(248, 54, 244, 0.20) 100%)',
                        boxShadow:
                          '4px 4px 25px 0px rgba(0, 0, 0, 0.70), 4px 4px 4px 0px rgba(255, 255, 255, 0.25) inset'
                      }
                    }}
                  >
                    Atrás
                  </Button>
                  <Button
                    size='large'
                    type='submit'
                    variant='contained'
                    startIcon={<RightBlueAirplane />}
                    sx={{
                      '&:hover': {
                        color: '#00FFED',
                        background: 'linear-gradient(180deg, #00FFED 0%, rgba(248, 54, 244, 0.20) 100%)',
                        boxShadow:
                          '4px 4px 25px 0px rgba(0, 0, 0, 0.70), 4px 4px 4px 0px rgba(255, 255, 255, 0.25) inset'
                      }
                    }}
                  >
                    Enviar
                  </Button>
                </Grid>
              </Grid>
              <Canvas shadows>
                <ambientLight intensity={0.5} />
                <directionalLight castShadow position={[2, 2, 2]} />
                <AstBeyond />
              </Canvas>
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
          <Typography>Se completaron los pasos con éxito!</Typography>
          <Box component='div' sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
            <Link href='/home'>
              <Button size='large' variant='contained'>
                Dashboard
              </Button>
            </Link>
          </Box>
        </Fragment>
      )
    } else {
      return getStepContent(activeStep)
    }
  }

  return (
    <Card>
      <Box component='div' display='flex' justifyContent='space-between'>
        <Box component='div' marginBottom={30}>
          <Link href={'/login'}>
            <Box
              sx={{
                top: 30,
                left: 40,
                display: 'flex',
                position: 'absolute',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              component='div'
            >
              <svg xmlns='http://www.w3.org/2000/svg' width='180' x='744.13' y='-640.34' viewBox='0 0 1617.68 257.73'>
                <path
                  fill='#CCC7CE'
                  d='M235.07,144.74a16.45,16.45,0,0,0-16.46,16.45v5.48H158.29V115.49a16.45,16.45,0,1,0-32.9,0v124.3a16.45,16.45,0,1,0,32.9,0V192.26h60.32v47.53a16.46,16.46,0,0,0,32.91,0v-78.6A16.45,16.45,0,0,0,235.07,144.74Z'
                  transform='translate(-64.16 -39.63)'
                />
                <path
                  fill='#CCC7CE'
                  d='M552.21,227.91H537.58V116.41a16.45,16.45,0,1,0-32.9,0V240.7c0,.31,0,.61.05.92s-.05.6-.05.91a14.62,14.62,0,0,0,14.62,14.62h32.91a14.62,14.62,0,1,0,0-29.24Z'
                  transform='translate(-64.16 -39.63)'
                />
                <path
                  fill='#CCC7CE'
                  d='M1467.46,234,1432,178.74l11.63-18A14.63,14.63,0,1,0,1419,144.86l-4.42,6.86-30.48-47.45a14.63,14.63,0,0,0-24.61,15.81l37.67,58.63-34.67,53.74a14.62,14.62,0,0,0,24.57,15.86l27.47-42.57,28.29,44A14.63,14.63,0,1,0,1467.46,234Z'
                  transform='translate(-64.16 -39.63)'
                />
                <circle fill='#59c1bd' cx='312.34' cy='72.2' r='13.71' />
                <circle fill='#59c1bd' cx='170.91' cy='72.2' r='13.71' />
                <circle fill='#59c1bd' cx='641.36' cy='72.2' r='13.71' />
                <circle fill='#59c1bd' cx='1231.08' cy='72.2' r='13.71' />
                <circle fill='#59c1bd' cx='1042.81' cy='201.98' r='13.71' />
                <circle fill='#59c1bd' cx='883.79' cy='191.01' r='13.71' />
                <circle fill='#59c1bd' cx='529.17' cy='203.81' r='13.71' />
                <circle fill='#59c1bd' cx='1388.28' cy='72.2' r='13.71' />
                <circle fill='#59c1bd' cx='1543.65' cy='72.2' r='13.71' />
                <path
                  fill='#CCC7CE'
                  d='M429.05,116.45v.07c-1.89-1.84-3.68-3.58-4.72-4.56-4-3.71-12.05-1.87-16.28,3-4,4.63-5.63,14.14-2.32,18.5,1.93,2.53,9,7.77,10.78,9.11a54.77,54.77,0,0,1,12.54,35c0,29.78-23.32,53.92-52.09,53.92s-52.1-24.14-52.1-53.92a54.87,54.87,0,0,1,10.85-32.9h0s8.1-9.13,11.09-11.88c4-3.7,2.74-11.89-1.83-16.45-4.33-4.33-13.7-6.65-18.28-3.66-3.07,2-10.23,10.51-10.23,10.51h0a78.94,78.94,0,0,0-22.68,55.29c0,44.42,37,80.43,82.71,80.43s82.71-36,82.71-80.43A79.4,79.4,0,0,0,429.05,116.45ZM421.9,138l1.24-1.22C422.74,137.22,422.33,137.63,421.9,138Z'
                  transform='translate(-64.16 -39.63)'
                />
                <path
                  fill='#CCC7CE'
                  d='M758.07,116.45v.07c-1.89-1.84-3.68-3.58-4.72-4.56-4-3.71-12.05-1.87-16.27,3-4,4.63-5.64,14.14-2.33,18.5,1.93,2.53,9,7.77,10.78,9.11a54.77,54.77,0,0,1,12.54,35c0,29.78-23.32,53.92-52.09,53.92s-52.1-24.14-52.1-53.92a54.87,54.87,0,0,1,10.85-32.9h0s8.1-9.13,11.09-11.88c4-3.7,2.74-11.89-1.83-16.45-4.33-4.33-13.7-6.65-18.28-3.66-3.07,2-10.23,10.51-10.23,10.51h0a78.94,78.94,0,0,0-22.68,55.29c0,44.42,37,80.43,82.71,80.43s82.71-36,82.71-80.43A79.4,79.4,0,0,0,758.07,116.45ZM750.92,138l1.24-1.22C751.76,137.22,751.35,137.63,750.92,138Z'
                  transform='translate(-64.16 -39.63)'
                />
                <path
                  fill='#CCC7CE'
                  d='M957.08,113.66c-4.08-5.59-23.68-10.8-23.68-10.8v0a84.57,84.57,0,0,0-27.94-4.75c-45.69,0-82.72,36-82.72,80.42,0,33.11,20.59,61.54,50,73.87a16.82,16.82,0,0,0,3.94,2c20.1,7.31,34.73,5.48,34.73,5.48,14.62-1.82,12.79-16.45,12.79-16.45,0-9.14-11-11-11-11-19.05,0-31.52-6.56-32.77-7.25.12-.11.23-.23.36-.34a54.21,54.21,0,0,1-27-47.25c0-29.78,23.32-53.92,52.09-53.92a50.48,50.48,0,0,1,21.52,4.82c5.08,3,12.65,8,16.87,8.89s11,1.82,14.62-3.66C964.65,125.17,960.06,117.74,957.08,113.66Z'
                  transform='translate(-64.16 -39.63)'
                />
                <path
                  fill='#CCC7CE'
                  d='M1085.33,100h-54.22s0,.11.07.16a13.16,13.16,0,0,0-1.9-.16h-5.48a12.79,12.79,0,0,0-12.79,12.8V244.36a12.79,12.79,0,0,0,12.79,12.79h5.48a12.8,12.8,0,0,0,12.8-12.79V200.49h33.08a14.94,14.94,0,0,0,.94,3.69l3.81,9.57a15,15,0,1,0,27.91-11.11l-3-7.63a38.58,38.58,0,0,0,18.64-33v-23.6C1123.42,117.26,1106.28,100,1085.33,100Zm-43.25,78.64V126.83h28.11a23.85,23.85,0,0,1,23.66,23.89v4a23.85,23.85,0,0,1-23.66,23.89Z'
                  transform='translate(-64.16 -39.63)'
                />
                <path
                  fill='#CCC7CE'
                  d='M1309.87,163.37v-1.51l-.13.07c-.65-5.8-3.23-14.19-12.67-15.36-14.62-1.83-16.45,14.62-16.45,14.62l.81,1.08c-.27-.14-.55-.26-.81-.41v32.75a34.3,34.3,0,0,1-34.21,34.21h-8.35a34.3,34.3,0,0,1-34.21-34.21v-71s1.83-19.13-12.8-21-16.45,14.62-16.45,14.62l.11.14c-.06,1.17-.11,2.34-.11,3.51v74a66,66,0,0,0,65.81,65.81h3.65A66,66,0,0,0,1309.87,195V167.52A29,29,0,0,0,1309.87,163.37Z'
                  transform='translate(-64.16 -39.63)'
                />
                <path
                  fill='#CCC7CE'
                  d='M1614.21,226.08h-60.32V191.35h51.18a14.63,14.63,0,0,0,0-29.25h-51.18V127.37h14.62a14.62,14.62,0,1,0,0-29.24h-32.9A14.61,14.61,0,0,0,1521,112.75c0,.31,0,.61,0,.91s0,.61,0,.92V238.87a16.44,16.44,0,0,0,14,16.26,6.15,6.15,0,0,0,1.49.19h12.8a6.26,6.26,0,0,0,1.07-.1,15.28,15.28,0,0,0,1.67.1h62.15a14.62,14.62,0,0,0,0-29.24Z'
                  transform='translate(-64.16 -39.63)'
                />
              </svg>
            </Box>
          </Link>
        </Box>
        <Box component='div' marginTop={5}>
          <MenuItem
            onClick={handleLogout}
            sx={{ py: 2, '& svg': { mr: 2, fontSize: '1.375rem', color: 'text.primary' } }}
          >
            <Icon icon='mdi:logout-variant' />
            Logout
          </MenuItem>
        </Box>
      </Box>
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
                  (contactErrors.contactInfo?.phone ||
                    contactErrors.contactInfo?.altEmail ||
                    contactErrors.location?.language ||
                    contactErrors.location?.country ||
                    contactErrors.location?.provinceOrState ||
                    contactErrors.location?.city ||
                    contactErrors.contactInfo?.zipCode) &&
                  activeStep === 0
                ) {
                  labelProps.error = true
                } else if (
                  (personalErrors.personal?.gender ||
                    personalErrors.personal?.birthdate ||
                    personalErrors.personal?.civilStatus ||
                    personalErrors.personal?.name) &&
                  activeStep === 1
                ) {
                  labelProps.error = true
                } else if (
                  (professionalErrors.professional?.academicField ||
                    professionalErrors.professional?.educationLevel ||
                    professionalErrors.professional?.graduationYear ||
                    professionalErrors.professional?.job ||
                    professionalErrors.professional?.occupation) &&
                  activeStep === 2
                ) {
                  labelProps.error = true
                } else if (generalInsterestsErrors.generalInterests?.likes && activeStep === 3) {
                  labelProps.error = true
                } else {
                  labelProps.error = false
                }
              }

              return (
                <Step key={index}>
                  <StepLabel {...labelProps} StepIconComponent={StepperCustomDot}>
                    <div className='step-label'>
                      <Typography
                        className='step-number'
                        style={{
                          color: index === activeStep ? '#00FFED' : 'white'
                        }}
                      >
                        {`0${index + 1}`}
                      </Typography>
                      <div>
                        <Typography
                          className='step-title'
                          style={{
                            color: index === activeStep ? '#00FFED' : 'white'
                          }}
                        >
                          {step.title}
                        </Typography>
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
