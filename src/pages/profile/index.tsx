import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/store'
import { editProfileData, fetchData } from 'src/store/apps/profile'
import { useForm, Controller } from 'react-hook-form'

// ** MUI Components
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { styled } from '@mui/material/styles'
import {
  Button,
  Chip,
  Dialog,
  DialogContent,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  TextField
} from '@mui/material'

import Avatar from 'src/@core/icons/profile/Avatar'
import Badge from 'src/@core/components/mui/badge'
import EditIcon from 'src/@core/icons/diary/EditIcon'
import Icon from 'src/@core/components/icon'
import ActivityTimeLine from 'src/views/pages/user-profile/profile/ActivityTimeline'
import PendingTasks from 'src/views/pages/user-profile/profile/PendingTasks'
import EmptyContainer from 'src/views/pages/user-profile/profile/EmptyContainer'

// import Camera from 'src/@core/icons/profile/Camera'
import Select from '@mui/material/Select'
import Save from 'src/@core/icons/diary/Save'

const BadgeContentSpan = styled('span')(({ theme }) => ({
  width: 8,
  height: 8,
  borderRadius: '50%',
  backgroundColor: '#51FF8F',
  boxShadow: `0 0 0 2px ${theme.palette.background.paper}`
}))

const StyledButton = styled(Button)({
  marginTop: '2em',
  transition: 'background 0.3s ease',
  '&:hover': {
    background: 'linear-gradient(180deg, #00FFED 0%, rgba(248, 54, 244, 0.2) 100%)'
  }
})

const Profile = () => {
  const [open, setOpen] = useState<boolean>(false)
  const dispatch = useDispatch<AppDispatch>()
  const data = useSelector((state: RootState) => state.profile.data)

  useEffect(() => {
    dispatch(fetchData())

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleOpenDialog = () => {
    setOpen(!open)
  }
  const handleCloseDialog = () => {
    setOpen(false)
  }

  function formatearFecha(fecha: string): string {
    const fechaObj = new Date(fecha)
    const dia = fechaObj.getDate().toString().padStart(2, '0') // Obtener el día y asegurar que tenga dos dígitos
    const mes = (fechaObj.getMonth() + 1).toString().padStart(2, '0') // Obtener el mes (los meses comienzan desde 0 en JavaScript)
    const año = fechaObj.getFullYear().toString() // Obtener el año

    return `${dia}/${mes}/${año}`
  }

  function formatearNumeroTelefono(numero: string): string {
    // Eliminar el prefijo "AR+" usando expresiones regulares
    const numeroSinPrefijo = numero.replace(/^AR/, '')

    // Ocultar los últimos 5 dígitos con 'x' usando expresiones regulares
    const numeroOculto = numeroSinPrefijo.replace(/\d{7}$/, 'xxxxxxx')

    return numeroOculto
  }

  function capitalizarPrimeraLetra(texto: string): string {
    // Convertir el primer carácter a mayúscula y el resto a minúsculas
    return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase()
  }

  function calcularEdad(fechaNacimiento: string): number {
    const fechaNacimientoObj = new Date(fechaNacimiento)
    const fechaActual = new Date()

    // Calcular la diferencia en años
    const edadMilisegundos = fechaActual.getTime() - fechaNacimientoObj.getTime()
    const edadAños = edadMilisegundos / (1000 * 60 * 60 * 24 * 365.25)

    // Redondear la edad y devolverla como un número entero
    return Math.floor(edadAños)
  }

  const { control, handleSubmit } = useForm({
    defaultValues: {
      contactInfo: {
        phone: data.phone
      },
      location: {
        country: data.country,
        province: data.provinceOrState,
        city: data.city,
        language: data.language
      },
      personal: {
        name: data.name,
        birthdate: data.birthdate
      }
    }
  })

  const onSubmit = (val: any) => {
    if (val.personal.name === undefined) delete val.personal.name
    if (val.location.city === undefined) delete val.location.city
    if (val.personal.birthdate === undefined) delete val.personal.birthdate
    if (val.location.country === undefined) delete val.location.country
    if (val.location.province === undefined) delete val.location.province
    if (val.location.language === undefined) delete val.location.language
    if (val.contactInfo.phone === undefined) delete val.contactInfo.phone
    if (!Object.keys(val.personal).length) delete val.personal
    if (!Object.keys(val.location).length) delete val.location
    if (!Object.keys(val.contactInfo).length) delete val.contactInfo
    dispatch(editProfileData(val))
  }

  return (
    <Grid container>
      <Grid item xs={6}>
        <Card style={{ width: '505px', height: '849px', boxShadow: '4px 4px 4px 0px #FFFFFF80', marginLeft: '0.5em' }}>
          <CardContent>
            <Box component='div'>
              <Badge
                overlap='circular'
                sx={{ ml: 30, cursor: 'pointer' }}
                badgeContent={<BadgeContentSpan />}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right'
                }}
              >
                <div
                  style={{
                    border: '3px solid #51FF8F',
                    borderRadius: '100%',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center'
                  }}
                >
                  <Avatar />
                </div>
              </Badge>

              <Typography variant='h5' sx={{ mt: 4, color: '#00FFED', textAlign: 'center' }}>
                {data?.name}
              </Typography>
              <Typography variant='h6' sx={{ mt: 4, color: '#F836F4', textAlign: 'center', pb: 4 }}>
                {calcularEdad(data.birthdate)} años
              </Typography>
              <Divider variant='middle' sx={{ backgroundColor: '#00FFED', boxShadow: '0px 0px 10px 0px #00FFED' }} />
              <div style={{ textAlign: 'center', paddingTop: '1em' }}>
                <Typography sx={{ mt: 4, color: '#00FFED', display: 'inline' }}>Apodo:</Typography>
                <Typography sx={{ mt: 4, color: '#F836F4', display: 'inline', ml: 2 }}>{data.name}</Typography>
              </div>
              <div style={{ textAlign: 'center', paddingTop: '1em' }}>
                <Typography sx={{ mt: 4, color: '#00FFED', display: 'inline' }}>Fecha de nac.:</Typography>
                <Typography sx={{ mt: 4, color: '#F836F4', display: 'inline', ml: 2 }}>
                  {formatearFecha(data.birthdate)}
                </Typography>
              </div>
              <div style={{ textAlign: 'center', paddingTop: '1em' }}>
                <Typography sx={{ mt: 4, color: '#00FFED', display: 'inline' }}>Ciudad:</Typography>
                <Typography sx={{ mt: 4, color: '#F836F4', display: 'inline', ml: 2 }}>{data.city}</Typography>
              </div>
              <div style={{ textAlign: 'center', paddingTop: '1em' }}>
                <Typography sx={{ mt: 4, color: '#00FFED', display: 'inline' }}>Provincia:</Typography>
                <Typography sx={{ mt: 4, color: '#F836F4', display: 'inline', ml: 2, textAlign: 'center' }}>
                  {data.provinceOrState}
                </Typography>
              </div>
              <div style={{ textAlign: 'center', paddingTop: '1em' }}>
                <Typography sx={{ mt: 4, color: '#00FFED', display: 'inline', textAlign: 'center' }}>País:</Typography>
                <Typography sx={{ mt: 4, color: '#F836F4', display: 'inline', ml: 2, textAlign: 'center' }}>
                  {data.country}
                </Typography>
              </div>
              <div style={{ textAlign: 'center', paddingTop: '1em' }}>
                <Typography sx={{ mt: 4, color: '#00FFED', display: 'inline', textAlign: 'center' }}>
                  Teléfono:
                </Typography>
                <Typography sx={{ mt: 4, color: '#F836F4', display: 'inline', ml: 2, textAlign: 'center' }}>
                  {data?.phone && formatearNumeroTelefono(data?.phone)}
                </Typography>
              </div>
              <div style={{ textAlign: 'center', paddingTop: '1em' }}>
                <Typography sx={{ mt: 4, color: '#00FFED', display: 'inline', textAlign: 'center' }}>
                  E-mail:
                </Typography>
                <Typography sx={{ mt: 4, color: '#F836F4', display: 'inline', ml: 2, textAlign: 'center' }}>
                  {data.email}
                </Typography>
              </div>
              <div style={{ textAlign: 'center', paddingTop: '1em' }}>
                <Typography sx={{ mt: 4, color: '#00FFED', display: 'inline', textAlign: 'center' }}>
                  Idioma:
                </Typography>
                <Typography sx={{ mt: 4, color: '#F836F4', display: 'inline', ml: 2, textAlign: 'center' }}>
                  {data?.language && capitalizarPrimeraLetra(data?.language)}
                </Typography>
              </div>
              <div style={{ textAlign: 'center', paddingTop: '1em' }}>
                <Typography sx={{ mt: 4, color: '#00FFED', display: 'inline', textAlign: 'center' }}>
                  Estado:
                </Typography>
                <Chip
                  label='Activo'
                  sx={{
                    backgroundColor: '#F836F4',
                    color: '#000000',
                    boxShadow: '0px 0px 10px 0px #F836F4',
                    display: 'inline',
                    ml: 2
                  }}
                />
              </div>
            </Box>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <StyledButton variant='contained' startIcon={<EditIcon />} onClick={handleOpenDialog}>
                Editar
              </StyledButton>
            </div>
            <Dialog open={open} onClose={handleCloseDialog}>
              <DialogContent
                sx={{
                  px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
                  py: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(5)} !important`]
                }}
              >
                <Box component='div' sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Avatar />

                  {/* <div
                    style={{
                      backgroundColor: '#51FF8F',
                      borderRadius: '100%',
                      width: '45px',
                      height: '45px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      position: 'absolute',
                      top: 160,
                      left: 155
                    }}
                  >
                    <IconButton size='small' onClick={handleCloseDialog}>
                      <Camera />
                    </IconButton>
                  </div> */}
                  <Grid container spacing={1} sx={{ ml: 7, mt: 6 }}>
                    <Grid item xs={12}>
                      <Typography variant='h4' sx={{ color: 'text.primary', fontWeight: 700, fontSize: 35 }}>
                        EDITAR
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant='h4' sx={{ color: 'text.primary', fontWeight: 700, fontSize: 35 }}>
                        USUARIO
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sx={{ marginBottom: 20 }}>
                      <Typography variant='h4' sx={{ color: 'text.primary', fontWeight: 700, fontSize: 35 }}>
                        INFORMACIÓN
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
                <Box component='div' sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={2}>
                      <Grid item>
                        <FormControl>
                          <Controller
                            name='personal.name'
                            control={control}
                            render={({ field: { value, onChange } }) => (
                              <TextField
                                value={value}
                                focused
                                label='Apodo'
                                variant='outlined'
                                onChange={onChange}
                                sx={{ width: '217px', mb: 6, mr: 5 }}
                              />
                            )}
                          />
                        </FormControl>
                      </Grid>
                      <Grid item>
                        <FormControl>
                          <Controller
                            name='personal.birthdate'
                            control={control}
                            render={({ field: { value, onChange } }) => (
                              <TextField
                                value={value}
                                onChange={onChange}
                                focused
                                label='Fecha de nac'
                                variant='outlined'
                                sx={{ width: '217px', mb: 6 }}
                              />
                            )}
                          />
                        </FormControl>
                      </Grid>
                      <Grid item>
                        <FormControl>
                          <Controller
                            name='location.city'
                            control={control}
                            render={({ field: { value, onChange } }) => (
                              <TextField
                                value={value}
                                onChange={onChange}
                                focused
                                label='Ciudad'
                                variant='outlined'
                                sx={{ width: '217px', mb: 6, mr: 5 }}
                              />
                            )}
                          />
                        </FormControl>
                      </Grid>
                      <Grid item>
                        <FormControl>
                          <Controller
                            name='location.province'
                            control={control}
                            render={({ field: { value, onChange } }) => (
                              <TextField
                                value={value}
                                onChange={onChange}
                                focused
                                label='Provincia'
                                variant='outlined'
                                sx={{ width: '217px', mb: 6 }}
                              />
                            )}
                          />
                        </FormControl>
                      </Grid>
                      <Grid item>
                        <FormControl>
                          <Controller
                            name='location.country'
                            control={control}
                            render={({ field: { value, onChange } }) => (
                              <TextField
                                value={value}
                                onChange={onChange}
                                focused
                                label='País'
                                variant='outlined'
                                sx={{ width: '217px', mb: 6, mr: 5 }}
                              />
                            )}
                          />
                        </FormControl>
                      </Grid>
                      <Grid item>
                        <FormControl>
                          <Controller
                            name='contactInfo.phone'
                            control={control}
                            render={({ field: { value, onChange } }) => (
                              <TextField
                                value={value}
                                onChange={onChange}
                                focused
                                label='Teléfono'
                                variant='outlined'
                                sx={{ width: '217px' }}
                              />
                            )}
                          />
                        </FormControl>
                      </Grid>
                      <Grid item>
                        <FormControl fullWidth>
                          <InputLabel>Idioma</InputLabel>
                          <Controller
                            name='location.language'
                            control={control}
                            render={({ field: { value, onChange } }) => (
                              <Select value={value} onChange={onChange} label='Idioma' sx={{ width: '217px' }}>
                                <MenuItem value='SPANISH'>Español</MenuItem>
                                <MenuItem value='ENGLISH'>Inglés</MenuItem>
                              </Select>
                            )}
                          />
                        </FormControl>
                      </Grid>
                    </Grid>
                    <StyledButton variant='contained' type='submit' startIcon={<Save />} sx={{ ml: 75, mt: 2 }} onClick={handleCloseDialog}>
                      Guardar
                    </StyledButton>
                  </form>
                </Box>

                <IconButton
                  size='small'
                  onClick={handleCloseDialog}
                  sx={{ position: 'absolute', right: '1rem', top: '1rem' }}
                >
                  <Icon icon='mdi:close' />
                </IconButton>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={6}>
        <ActivityTimeLine />
      </Grid>
      <Grid item xs={6}>
        <PendingTasks />
      </Grid>
      <Grid item xs={6}>
        <EmptyContainer />
      </Grid>
    </Grid>
  )
}

export default Profile
