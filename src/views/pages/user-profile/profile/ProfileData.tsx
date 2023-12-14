import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { styled } from '@mui/material/styles'
import { fetchData } from 'src/store/apps/profile'
import { AppDispatch, RootState } from 'src/store'
import { useDispatch, useSelector } from 'react-redux'

// ** MUI Components
import Avatar from 'src/@core/icons/profile/Avatar'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Badge from 'src/@core/components/mui/badge'
import {
    Button,
    Chip,
    Divider
  } from '@mui/material'
import UpgradePlan from 'src/views/pages/user-profile/profile/UpgradePlan'
import StatusButtons from 'src/views/components/adminButtons/StatusButtons'

// ** Redux
import { reactivateUsers, suspendUsers, banUsers } from 'src/store/apps/admin'

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

  const ProfileData = () => {
      const router = useRouter()
      const dispatch = useDispatch<AppDispatch>()
      const userData = useSelector((state: RootState) => state.profile.data)
      const userProfileId = useSelector((state: RootState) => state.admin.userIdProfile)
      console.log("ProfileData - userProfileId: ", userProfileId)
      const adminUserProfileData = useSelector((state: RootState) => state.admin.userData)
      const isUserProfile = router.pathname.includes('user')
      const [confirm, setConfirm] = useState<boolean>(false)
      const [actionMessage, setActionMessage] = useState<string>("");
      

      useEffect(() => {
        dispatch(fetchData())
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [])

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

        const handleActionButtonClick = (val: string) => {
          if (userProfileId) {
            if (val === 'reactivar') {
              setConfirm(true)
              dispatch(reactivateUsers({ statusType: 'COMPLETE', users: [ userProfileId ] })) 
            }
            if (val === 'suspender') {
              setActionMessage("Ud suspenderá esta cuenta por: ")
            }
            if (val === 'banear') {
              setActionMessage("¿Está seguro que desea bannear al usuario?")
          }
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
              }}
          >
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
                    {/* {!userData.birthdate ? 'No existe fecha de nacimiento' : formatearFecha(userData.birthdate)} */}
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
                variant='outlined'
              />
              <StatusButtons
                data-action='suspender'
                label='suspender'
                onClick={() => handleActionButtonClick('suspender')}
                color='warning'
                variant='outlined'
              />              
              <StatusButtons
                data-action='banear'
                label='banear'
                onClick={() => handleActionButtonClick('banear')}
                color='error'
                variant='outlined'
              />
              </Box>
              <Divider variant='middle' sx={{ backgroundColor: '#00FFED', boxShadow: '0px 0px 10px 0px #00FFED', my: '3rem' }} />
                <UpgradePlan />
            </Box>
              : null
          }
      </Box>
  )

  }

export default ProfileData