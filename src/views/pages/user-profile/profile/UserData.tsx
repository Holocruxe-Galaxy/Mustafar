// ** React Imports
import { useState, ElementType, ChangeEvent } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Button, { ButtonProps } from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import { styled } from '@mui/material/styles'
import Dialog from '@mui/material/Dialog'
import Select from '@mui/material/Select'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import Icon from 'src/@core/components/icon'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import DialogTitle from '@mui/material/DialogTitle'
import FormControl from '@mui/material/FormControl'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'

// ** Custom Components
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Types
import { ThemeColor } from 'src/@core/layouts/types'
import { UsersType } from 'src/types/apps/userTypes'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

interface ColorsType {
  [key: string]: ThemeColor
}

const data: UsersType = {
  id: 1,
  role: 'admin',
  status: 'active',
  username: 'gslixby0',
  avatarColor: 'primary',
  country: 'El Salvador',
  company: 'Yotz PVT LTD',
  contact: '(479) 232-9151',
  currentPlan: 'enterprise',
  fullName: 'Daisy Patterson',
  email: 'gslixby0@abc.net.au',
  avatar: '/images/avatars/1.png'
}

const roleColors: ColorsType = {
  admin: 'error',
  editor: 'info',
  author: 'warning',
  maintainer: 'success',
  subscriber: 'primary'
}

const statusColors: ColorsType = {
  active: 'success',
  pending: 'warning',
  inactive: 'secondary'
}
const ImgStyled = styled('img')(({ theme }) => ({
  width: 146,
  height: 146,
  marginRight: theme.spacing(3),
  marginTop: theme.spacing(3),
  borderRadius: theme.shape.borderRadius * 8
}))

const ButtonStyled = styled(Button)<ButtonProps & { component?: ElementType; htmlFor?: string }>(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    textAlign: 'center'
  },
  width: '58px',
  height: '58px',
  borderRadius: '50%'
}))

const ButtonCancel = styled(IconButton)<ButtonProps & { component?: ElementType; htmlFor?: string }>(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    textAlign: 'center'
  },
  width: '35px',
  height: '35px',
  marginTop: '10px'
}))

const UserData = () => {
  // ** States
  const [openEdit, setOpenEdit] = useState<boolean>(false)
  const [inputValue, setInputValue] = useState<string>('')
  const [imgSrc, setImgSrc] = useState<string>('/images/avatars/1.png')
  const [suspendDialogOpen, setSuspendDialogOpen] = useState<boolean>(false)
  const [subscriptionDialogOpen, setSubscriptionDialogOpen] = useState<boolean>(false)

  // ** Hooks
  const handleInputImageChange = (file: ChangeEvent) => {
    const reader = new FileReader()
    const { files } = file.target as HTMLInputElement
    if (files && files.length !== 0) {
      reader.onload = () => setImgSrc(reader.result as string)
      reader.readAsDataURL(files[0])

      if (reader.result !== null) {
        setInputValue(reader.result as string)
      }
    }
  }

  // Handle Edit dialog
  const handleEditClickOpen = () => setOpenEdit(true)
  const handleEditClose = () => setOpenEdit(false)

  if (data) {
    return (
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <CardContent sx={{ pt: 15, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
              {data.avatar ? (
                <CustomAvatar
                  src={data.avatar}
                  variant='rounded'
                  alt={data.fullName}
                  sx={{ width: 120, height: 120, fontWeight: 600, mb: 4, borderRadius: '50%' }}
                />
              ) : (
                <CustomAvatar
                  skin='light'
                  variant='rounded'
                  color={data.avatarColor as ThemeColor}
                  sx={{ width: 120, height: 120, fontWeight: 600, mb: 4, fontSize: '3rem' }}
                >
                  {getInitials(data.fullName)}
                </CustomAvatar>
              )}
              <Typography variant='h6' sx={{ mb: 2 }}>
                {data.fullName}
              </Typography>
              <CustomChip
                skin='light'
                size='small'
                label={data.role}
                color={roleColors[data.role]}
                sx={{
                  height: 20,
                  fontWeight: 600,
                  borderRadius: '5px',
                  fontSize: '0.875rem',
                  textTransform: 'capitalize',
                  '& .MuiChip-label': { mt: -0.25 }
                }}
              />
            </CardContent>
            <CardContent>
              <Typography variant='h6'>Detalles</Typography>
              <Divider sx={{ mt: theme => `${theme.spacing(4)} !important` }} />
              <Box sx={{ pt: 2, pb: 1 }} component='div'>
                <Box sx={{ display: 'flex', mb: 2.7 }} component='div'>
                  <Typography variant='subtitle2' sx={{ mr: 2, color: 'text.primary' }}>
                    Apodo:
                  </Typography>
                  <Typography variant='body2'>@{data.username}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 2.7 }} component='div'>
                  <Typography variant='subtitle2' sx={{ mr: 2, color: 'text.primary' }}>
                    Fecha de nacimiento:
                  </Typography>
                  <Typography variant='body2'></Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 2.7 }} component='div'>
                  <Typography variant='subtitle2' sx={{ mr: 2, color: 'text.primary' }}>
                    Ciudad:
                  </Typography>
                  <Typography variant='body2'>{data.country}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 2.7 }} component='div'>
                  <Typography variant='subtitle2' sx={{ mr: 2, color: 'text.primary' }}>
                    Provincia:
                  </Typography>
                  <Typography variant='body2'></Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 2.7 }} component='div'>
                  <Typography variant='subtitle2' sx={{ mr: 2, color: 'text.primary' }}>
                    País:
                  </Typography>
                  <Typography variant='body2'></Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 2.7 }} component='div'>
                  <Typography sx={{ mr: 2.7, fontWeight: 500, fontSize: '0.875rem' }}>Teléfono:</Typography>
                  <Typography variant='body2'>+1 {data.contact}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 2.7 }} component='div'>
                  <Typography variant='subtitle2' sx={{ mr: 2, color: 'text.primary' }}>
                    Email:
                  </Typography>
                  <Typography variant='body2'>{data.email}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 2.7 }} component='div'>
                  <Typography variant='subtitle2' sx={{ mr: 2, color: 'text.primary' }}>
                    Idioma:
                  </Typography>
                  <Typography variant='body2'>Español</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 2.7 }} component='div'>
                  <Typography variant='subtitle2' sx={{ mr: 2, color: 'text.primary' }}>
                    Estado:
                  </Typography>
                  <CustomChip
                    skin='light'
                    size='small'
                    label={data.status}
                    color={statusColors[data.status]}
                    sx={{
                      height: 20,
                      fontWeight: 500,
                      fontSize: '0.75rem',
                      borderRadius: '5px',
                      textTransform: 'capitalize'
                    }}
                  />
                </Box>
              </Box>
            </CardContent>

            <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button variant='contained' sx={{ mr: 2 }} onClick={handleEditClickOpen}>
                Editar
              </Button>
            </CardActions>

            <Dialog
              fullWidth
              open={openEdit}
              maxWidth='md'
              scroll='body'
              onClose={handleEditClose}
              aria-labelledby='user-view-edit'
              aria-describedby='user-view-edit-description'
              sx={{ '& .MuiPaper-root': { width: 630, height: 683, borderRadius: '10px' } }}
            >
              <Grid sx={{ display: 'flex' }}>
                <CardContent sx={{ pt: 0 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', position: 'relative' }} component='div'>
                    <ImgStyled src={imgSrc} alt='Profile Pic' />
                    <div>
                      <ButtonStyled
                        component='label'
                        variant='contained'
                        htmlFor='account-settings-upload-image'
                        sx={{ position: 'absolute', bottom: '2px', right: '2px' }}
                      >
                        <Icon icon='clarity:camera-line' />
                        <input
                          hidden
                          type='file'
                          value={inputValue}
                          accept='image/png, image/jpeg'
                          onChange={handleInputImageChange}
                          id='account-settings-upload-image'
                        />
                      </ButtonStyled>
                    </div>
                  </Box>
                </CardContent>
                <Grid container justifyContent='center'>
                  <DialogTitle
                    id='user-view-edit'
                    sx={{
                      fontFamily: 'Nunito',
                      textAlign: 'center',
                      fontSize: '35px !important',
                      whiteSpace: 'normal',
                      wordBreak: 'break-word',
                      px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
                      pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
                    }}
                  >
                    Edit User Information
                  </DialogTitle>
                </Grid>
                <ButtonCancel variant='outlined' color='secondary' size='small' onClick={handleEditClose}>
                  <Icon icon='ph:x-bold' />
                </ButtonCancel>
              </Grid>
              <DialogContent>
                <form>
                  <Grid container spacing={6}>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth label='Apodo' defaultValue='' />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth label='Fecha de Nacimiento' defaultValue='' />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth type='email' label='Email' defaultValue={data.email} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth label='Ciudad' defaultValue='' />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth label='País' defaultValue='' />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth label='Teléfono' defaultValue={`+54 ${data.contact}`} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <InputLabel id='user-view-language-label'>Idioma</InputLabel>
                        <Select
                          label='Idioma'
                          defaultValue='English'
                          id='user-view-language'
                          labelId='user-view-language-label'
                        >
                          <MenuItem value='English'>English</MenuItem>
                          <MenuItem value='Spanish'>Spanish</MenuItem>
                          <MenuItem value='Portuguese'>Portuguese</MenuItem>
                          <MenuItem value='Russian'>Russian</MenuItem>
                          <MenuItem value='French'>French</MenuItem>
                          <MenuItem value='German'>German</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                </form>
              </DialogContent>
              <DialogActions
                sx={{
                  justifyContent: 'center',
                  px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
                  pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
                }}
              >
                <Button variant='contained' sx={{ marginLeft: 'auto', marginBottom: 'auto' }} onClick={handleEditClose}>
                  Guardar
                </Button>
              </DialogActions>
            </Dialog>
          </Card>
        </Grid>
      </Grid>
    )
  } else {
    return null
  }
}

export default UserData
