import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles'
import { fetchData } from 'src/store/apps/profile'
import { AppDispatch, RootState } from 'src/store'
import { useDispatch, useSelector } from 'react-redux'

// ** MUI Components
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Badge from 'src/@core/components/mui/badge'
import Avatar from 'src/@core/icons/profile/Avatar'
import {
    Button,
    Chip,
    DialogContent,
    Divider
  } from '@mui/material'
import { makeStyles } from '@mui/styles'
import Select from '@mui/material/Select'
import Dialog from '@mui/material/Dialog';
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import UpgradePlan from 'src/views/pages/user-profile/profile/UpgradePlan'
import StatusButtons from 'src/views/components/adminButtons/StatusButtons'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Store
import { reactivateUsers, suspendUsers, banUsers } from 'src/store/apps/admin'

const BadgeContentSpan = styled('span')(({ theme }) => ({
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: '#51FF8F',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`
  }))

  const useStyles = makeStyles(() => ({
    formControl: {
      width: '12rem', 
      position: 'absolute', 
      top: '10rem', 
      left: '33%'
    },
    buttons: {
      width: '12rem', 
      height: '4rem', 
      mb: '3rem', 
      backgroundColor: 'rgba(1, 0, 50, 1)',
      boxShadow: '4px 4px 25px 0px rgba(0, 0, 0, 0.70)'
    }
  }))

  const ProfileData = () => {
    const router = useRouter()
    const classes = useStyles()
    const dispatch = useDispatch<AppDispatch>()

    const userData = useSelector((state: RootState) => state.profile.data)
    const userProfileId = useSelector((state: RootState) => state.admin.userIdProfile)
    const adminUserProfileData = useSelector((state: RootState) => state.admin.userData)

    const isUserProfile = router.pathname.includes('user')
    const [actionMessage, setActionMessage] = useState<string>("");
    const [secondDialogOpen, setSecondDialogOpen] = useState<boolean>(false)
    const [confirmationMessage, setConfirmationMessage] = useState<string>("");
    
/*     const handleClose = () => setOpen(false) */

    const handleSecondDialogClose = () => setSecondDialogOpen(false)

    useEffect(() => {
      dispatch(fetchData())
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch])

    function formatearFecha(fecha: string): string {
        const fechaObj = new Date(fecha)
        const dia = fechaObj.getDate().toString().padStart(2, '0') // Obtener el día y asegurar que tenga dos dígitos
        const mes = (fechaObj.getMonth() + 1).toString().padStart(2, '0') // Obtener el mes (los meses comienzan desde 0 en JavaScript)
        const año = fechaObj.getFullYear().toString() // Obtener el año
    
        return `${dia}/${mes}/${año}`
    }
        
    function calcularEdad(fechaNacimiento: string | null | undefined): number {
      // Verificar si la fecha de nacimiento es null o undefined
      if (fechaNacimiento === null || fechaNacimiento === undefined) {
          return 0; // Retorna 0 si la fecha de nacimiento no está disponible
      }
      
      const fechaNacimientoObj = new Date(fechaNacimiento);
      const fechaActual = new Date();
      
      // Calcular la diferencia en años
      const edadMilisegundos = fechaActual.getTime() - fechaNacimientoObj.getTime();
      const edadAños = edadMilisegundos / (1000 * 60 * 60 * 24 * 365.25);
      
      // Redondear la edad y devolverla como un número entero
      return Math.floor(edadAños);
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


    // ** Manejador de las acciones de los botones
    const handleActionButtonClick = (val: string) => {
      if (userProfileId) {
        if (val === 'reactivar') {
          dispatch(reactivateUsers({ statusType: 'COMPLETE', users: [ userProfileId ] })) 
          setConfirmationMessage("Usuario reactivado con éxito.");
          setSecondDialogOpen(true)
        }
        if (val === 'suspender') {
          setActionMessage("Ud suspenderá esta cuenta por: ")
        }
        if (val === 'banear') {
          setActionMessage("¿Está seguro que desea bannear al usuario?")
        }
      }
    }  
  
    // ** Confirmación de las acciones de los botones
    const handleActionConfirm = (val: string) => {
      if (val === 'suspender') {
        dispatch(suspendUsers({ statusType: 'SUSPENDED', users: [ userProfileId ], timeLapse: ''}))
        setConfirmationMessage("Usuario suspendido con éxito.");
        setSecondDialogOpen(true)
        setActionMessage("");
      } else {
        dispatch(banUsers({ statusType: 'BANNED', users: [ userProfileId ] }))
        setConfirmationMessage("Usuario banneado con éxito.");
        setSecondDialogOpen(true)
        setActionMessage("");
      }
    }

  return (
      <Box component='div'>
        <Badge
          overlap='circular'
          sx={{ 
            left: '22%',
            cursor: 'pointer', 
            border: '3px solid #51FF8F', 
            borderRadius: '50%'
          }}
          badgeContent={<BadgeContentSpan />}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right'
          }}>
          <Avatar />
        </Badge>

            <Typography variant='h5' sx={{ mt: 4, color: '#00FFED', textAlign: 'center' }}>
                  {isUserProfile ? adminUserProfileData?.name :userData?.name}
            </Typography>
            <Typography variant='h6' sx={{ mt: 4, color: '#F836F4', textAlign: 'center', pb: 4 }}>
              {isUserProfile ? calcularEdad(adminUserProfileData.birthdate) : calcularEdad(userData.birthdate)} años
            </Typography>
            <Divider variant='middle' sx={{ backgroundColor: '#00FFED', boxShadow: '0px 0px 10px 0px #00FFED' }} />
                <div style={{ paddingTop: '2em' }}>
              <Typography sx={{ mt: 4, ml: '1.5em', color: '#00FFED', display: 'inline' }}>Apodo:</Typography>
              <Typography sx={{ mt: 4, color: '#F836F4', display: 'inline', ml: 2 }}>{isUserProfile ? adminUserProfileData.name : userData.name}</Typography>
                </div>
                <div style={{ paddingTop: '1em' }}>
                  <Typography sx={{ mt: 4, ml: '1.5em', color: '#00FFED', display: 'inline' }}>Fecha de nac.:</Typography>
                  <Typography sx={{ mt: 4, color: '#F836F4', display: 'inline', ml: 2 }}>
                    {isUserProfile ? formatearFecha(adminUserProfileData?.birthdate) : userData?.birthdate ? formatearFecha(userData?.birthdate) : 'No existe fecha de nacimiento'}
                  </Typography>
                </div>
                <div style={{ paddingTop: '1em' }}>
                  <Typography sx={{ mt: 4, ml: '1.5em', color: '#00FFED', display: 'inline' }}>Ciudad:</Typography>
                  <Typography sx={{ mt: 4, color: '#F836F4', display: 'inline', ml: 2 }}>{isUserProfile ? adminUserProfileData.city : userData.city}</Typography>
                </div>
                <div style={{ paddingTop: '1em' }}>
                  <Typography sx={{ mt: 4, ml: '1.5em', color: '#00FFED', display: 'inline' }}>Provincia:</Typography>
                  <Typography sx={{ mt: 4, color: '#F836F4', display: 'inline', ml: 2, textAlign: 'center' }}>
                    {isUserProfile ? adminUserProfileData.provinceOrState : userData.provinceOrState}
                  </Typography>
                </div>
                <div style={{ paddingTop: '1em' }}>
                  <Typography sx={{ mt: 4, ml: '1.5em', color: '#00FFED', display: 'inline', textAlign: 'center' }}>País:</Typography>
                  <Typography sx={{ mt: 4, color: '#F836F4', display: 'inline', ml: 2, textAlign: 'center' }}>
                    {isUserProfile ? adminUserProfileData.country :userData.country}
                  </Typography>
                </div>
                <div style={{ paddingTop: '1em' }}>
                  <Typography sx={{ mt: 4, ml: '1.5em', color: '#00FFED', display: 'inline', textAlign: 'center' }}>
                    Teléfono:
                  </Typography>
                  <Typography sx={{ mt: 4, color: '#F836F4', display: 'inline', ml: 2, textAlign: 'center' }}>
                    {isUserProfile ? adminUserProfileData.phone && formatearNumeroTelefono(adminUserProfileData?.phone) : userData?.phone && formatearNumeroTelefono(userData?.phone)}
                  </Typography>
                </div>
                <div style={{ paddingTop: '1em' }}>
                  <Typography sx={{ mt: 4, ml: '1.5em', color: '#00FFED', display: 'inline', textAlign: 'center' }}>
                    E-mail:
                  </Typography>
                  <Typography sx={{ mt: 4, color: '#F836F4', display: 'inline', ml: 2, textAlign: 'center' }}>
                    {isUserProfile ? adminUserProfileData.email : userData.email}
                  </Typography>
                </div>
                <div style={{ paddingTop: '1em' }}>
                  <Typography sx={{ mt: 4, ml: '1.5em', color: '#00FFED', display: 'inline', textAlign: 'center' }}>
                    Idioma:
                  </Typography>
                  <Typography sx={{ mt: 4, color: '#F836F4', display: 'inline', ml: 2, textAlign: 'center' }}>
                    {isUserProfile ? adminUserProfileData.language  && capitalizarPrimeraLetra(adminUserProfileData?.language) : userData?.language && capitalizarPrimeraLetra(userData?.language)}
                  </Typography>
                </div>
                <div style={{ paddingTop: '1em' }}>
                  <Typography sx={{ mt: 4, ml: '1.5em', color: '#00FFED', display: 'inline', textAlign: 'center' }}>
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
      {
        isUserProfile ? 
          <Box component='div'>
            <Box component='div'
              sx={{display: 'flex', justifyContent:'center', alignItems:'center', mt:'3em'}}>
              <StatusButtons
                data-action='reactivar'
                label='reactivar'
                onClick={() => handleActionButtonClick('reactivar')}
                color='success'
                variant='outlined'/>

              <StatusButtons
                data-action='suspender'
                label='suspender'
                onClick={() => handleActionButtonClick('suspender')}
                color='warning'
                variant='outlined'/>

              <StatusButtons
                data-action='banear'
                label='banear'
                onClick={() => handleActionButtonClick('banear')}
                color='error'
                variant='outlined'/>

            </Box>
              <Divider variant='middle' sx={{ backgroundColor: '#00FFED', boxShadow: '0px 0px 10px 0px #00FFED', my: '3rem' }} />
                <UpgradePlan />
          </Box>
          
          : null
      }

      {
        actionMessage.includes('suspenderá') ? 
        <Box component='div'>
          <Dialog open={Boolean(actionMessage)} 
            onClose={() => setActionMessage("")}
            sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 650 } }}
          >
          <DialogTitle 
            sx={{
              textAlign: 'center',
              fontSize: '1.5rem !important',
              px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
              pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
            }}>
            {actionMessage}
          </DialogTitle>

          <DialogContent
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: ['wrap', 'nowrap'],
              pt: theme => `${theme.spacing(2)} !important`,
              pb: theme => `${theme.spacing(8)} !important`,
              px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`]
            }}>
            <FormControl
            fullWidth size='small' sx={{ mr: [0, 3], mb: [3, 0] }}>
              <InputLabel id='time-select'>TIEMPO</InputLabel>
              <Select>
                <MenuItem value='1hora'>1 Hora</MenuItem>
                <MenuItem value='5horas'>5 Horas</MenuItem>
                <MenuItem value='24horas'>24 Horas</MenuItem>
              </Select>
            </FormControl>

            <Button sx={{ minWidth: ['100%', 0] }} 
             onClick={() => handleActionConfirm('suspender')}>
              Suspender
            </Button>
          </DialogContent>
          </Dialog>
        </Box>

        : 

        <Box component='div'>
          <Dialog fullWidth 
            open={Boolean(actionMessage)} 
            onClose={() => setActionMessage("")} 
            sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 612/* , height: 350 */ } }}>

          <DialogContent
          sx={{
            pb: theme => `${theme.spacing(6)} !important`,
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}>
          <Box
            sx={{
              display: 'flex',
              textAlign: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              justifyContent: 'center',
              /* mt: '6em', */
              '& svg': { mb: 6, color: 'warning.main' }
            }}>
            <Icon icon='mdi:alert-circle-outline' fontSize='5.5rem' />
            <Typography>{actionMessage}</Typography>
          </Box>
          </DialogContent>

          <DialogActions
          sx={{
            justifyContent: 'center',
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}>
          <Button className={classes.buttons} sx={{ mr: 2 }} onClick={() => handleActionConfirm('bannear')}>
            BANNEAR
          </Button>
          </DialogActions>
          </Dialog>

          <Dialog
            fullWidth
            open={secondDialogOpen}
            onClose={handleSecondDialogClose}
            sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 512 } }}
          >
          <DialogContent
            sx={{
              pb: theme => `${theme.spacing(6)} !important`,
              px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
              pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
            }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
              '& svg': {
                mb: 8,
                color: 'success.main'
              }
            }}
          >
            <Icon
              fontSize='5.5rem'
              icon='mdi:check-circle-outline'
            />
            <Typography>
              {confirmationMessage}
            </Typography>
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

        </Box>
      }

    </Box>
   )

  }

export default ProfileData