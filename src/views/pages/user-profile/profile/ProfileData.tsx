import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/store'
import { fetchData } from 'src/store/apps/profile'
import { styled } from '@mui/material/styles'

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
    const dispatch = useDispatch<AppDispatch>()
    const data = useSelector((state: RootState) => state.profile.data)
  
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
{/*             <div
              style={{
                border: '3px solid #51FF8F',
                borderRadius: '100%',
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center'
              }}
            >
            </div> */}
                <Avatar />
        </Badge>

          <Typography variant='h5' sx={{ mt: 4, color: '#00FFED', textAlign: 'center' }}>
                {data?.name}
          </Typography>
          <Typography variant='h6' sx={{ mt: 4, color: '#F836F4', textAlign: 'center', pb: 4 }}>
            {calcularEdad(data.birthdate)} años
          </Typography>
          <Divider variant='middle' sx={{ backgroundColor: '#00FFED', boxShadow: '0px 0px 10px 0px #00FFED' }} />
              <div style={{ paddingTop: '2em' }}>
            <Typography sx={{ mt: 4, ml: '1.5em', color: '#00FFED', display: 'inline' }}>Apodo:</Typography>
            <Typography sx={{ mt: 4, color: '#F836F4', display: 'inline', ml: 2 }}>{data.name}</Typography>
              </div>
              <div style={{ paddingTop: '1em' }}>
                <Typography sx={{ mt: 4, ml: '1.5em', color: '#00FFED', display: 'inline' }}>Fecha de nac.:</Typography>
                <Typography sx={{ mt: 4, color: '#F836F4', display: 'inline', ml: 2 }}>
                  {!data.birthdate ? 'No existe fecha de nacimiento' : formatearFecha(data.birthdate)}
                </Typography>
              </div>
              <div style={{ paddingTop: '1em' }}>
                <Typography sx={{ mt: 4, ml: '1.5em', color: '#00FFED', display: 'inline' }}>Ciudad:</Typography>
                <Typography sx={{ mt: 4, color: '#F836F4', display: 'inline', ml: 2 }}>{data.city}</Typography>
              </div>
              <div style={{ paddingTop: '1em' }}>
                <Typography sx={{ mt: 4, ml: '1.5em', color: '#00FFED', display: 'inline' }}>Provincia:</Typography>
                <Typography sx={{ mt: 4, color: '#F836F4', display: 'inline', ml: 2, textAlign: 'center' }}>
                  {data.provinceOrState}
                </Typography>
              </div>
              <div style={{ paddingTop: '1em' }}>
                <Typography sx={{ mt: 4, ml: '1.5em', color: '#00FFED', display: 'inline', textAlign: 'center' }}>País:</Typography>
                <Typography sx={{ mt: 4, color: '#F836F4', display: 'inline', ml: 2, textAlign: 'center' }}>
                  {data.country}
                </Typography>
              </div>
              <div style={{ paddingTop: '1em' }}>
                <Typography sx={{ mt: 4, ml: '1.5em', color: '#00FFED', display: 'inline', textAlign: 'center' }}>
                  Teléfono:
                </Typography>
                <Typography sx={{ mt: 4, color: '#F836F4', display: 'inline', ml: 2, textAlign: 'center' }}>
                  {data?.phone && formatearNumeroTelefono(data?.phone)}
                </Typography>
              </div>
              <div style={{ paddingTop: '1em' }}>
                <Typography sx={{ mt: 4, ml: '1.5em', color: '#00FFED', display: 'inline', textAlign: 'center' }}>
                  E-mail:
                </Typography>
                <Typography sx={{ mt: 4, color: '#F836F4', display: 'inline', ml: 2, textAlign: 'center' }}>
                  {data.email}
                </Typography>
              </div>
              <div style={{ paddingTop: '1em' }}>
                <Typography sx={{ mt: 4, ml: '1.5em', color: '#00FFED', display: 'inline', textAlign: 'center' }}>
                  Idioma:
                </Typography>
                <Typography sx={{ mt: 4, color: '#F836F4', display: 'inline', ml: 2, textAlign: 'center' }}>
                  {data?.language && capitalizarPrimeraLetra(data?.language)}
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
    </Box>
)

}

export default ProfileData