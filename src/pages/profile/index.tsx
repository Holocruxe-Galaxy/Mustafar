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
import EditIcon from 'src/@core/icons/diary/EditIcon'
import Icon from 'src/@core/components/icon'
import ActivityTimeLine from 'src/views/pages/user-profile/profile/ActivityTimeline'
import PendingTasks from 'src/views/pages/user-profile/profile/PendingTasks'
import EmptyContainer from 'src/views/pages/user-profile/profile/EmptyContainer'
import ProfileData from 'src/views/pages/user-profile/profile/ProfileData'

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

  const { control, handleSubmit } = useForm({
    defaultValues: {
      contactInfo: {
        phone: data.phone
      },
      location: {
        country: data.country,
        provinceOrState: data.provinceOrState,
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
    if (val.location.provinceOrState === undefined) delete val.location.provinceOrState
    if (val.location.language === undefined) delete val.location.language
    if (val.contactInfo.phone === undefined) delete val.contactInfo.phone
    if (!Object.keys(val.personal).length) delete val.personal
    if (!Object.keys(val.location).length) delete val.location
    if (!Object.keys(val.contactInfo).length) delete val.contactInfo
    dispatch(editProfileData(val))
  }

  return (
    <Grid container spacing={6} className='match-height'>
      <Grid item xs={12} sm={6} md={4}>
        <Card style={{ boxShadow: '4px 4px 4px 0px #FFFFFF80', marginLeft: '0.5em' }}>
          <CardContent>
            <ProfileData />

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
                                placeholder='MM/DD/AAAA'
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
                            name='location.provinceOrState'
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
                                placeholder='+541304957502'
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
      
        <Grid item xs={12} sm={4} md={8} >
          <ActivityTimeLine  />
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
