// ** MUI Components
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { styled } from '@mui/material/styles'



import Avatar from 'src/@core/icons/profile/Avatar'
import Badge from 'src/@core/components/mui/badge'
import { Button, Chip, Divider } from '@mui/material'
import EditIcon from 'src/@core/icons/diary/EditIcon'



const BadgeContentSpan = styled('span')(({ theme }) => ({
  width: 8,
  height: 8,
  borderRadius: '50%',
  backgroundColor: '#51FF8F',
  boxShadow: `0 0 0 2px ${theme.palette.background.paper}`
}))




const AboutOverivew = () => {


  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Box component='div' sx={{ mb: 7 }}>
              
              <Badge
          overlap='circular'
          sx={{ ml: 2, cursor: 'pointer' }}
          badgeContent={<BadgeContentSpan />}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right'
          }}
        >

              <div style={{border: `2px solid #51FF8F`, borderRadius: '100%', overflow: 'hidden'}}>
                <Avatar />
              </div>
        </Badge>
        <Typography variant='h5' sx={{ mt: 4, color: '#00FFED' }}>
                Juan Perez
              </Typography>
        <Typography variant='h6' sx={{ mt: 4, color: '#F836F4' }}>
                36 años
              </Typography>
              <Divider variant="middle" sx={{ backgroundColor: '#00FFED', boxShadow: '0px 0px 10px 0px #00FFED' }}/>
              <div>
              <Typography  sx={{ mt: 4, color: '#00FFED', display: 'inline' }}>
                Apodo:
              </Typography>
        <Typography  sx={{ mt: 4, color: '#F836F4' , display: 'inline', ml: 2}}>
                JuanP
              </Typography>
              </div>
              <div>

              <Typography  sx={{ mt: 4, color: '#00FFED', display: 'inline' }}>
                Fecha de nac.:
              </Typography>
        <Typography  sx={{ mt: 4, color: '#F836F4', display: 'inline' , ml: 2}}>
        2/6/1986
              </Typography>
              </div>
              <div>

              <Typography  sx={{ mt: 4, color: '#00FFED', display: 'inline' }}>
              Ciudad:
              </Typography>
        <Typography  sx={{ mt: 4, color: '#F836F4', display: 'inline' , ml: 2}}>
                Salta
              </Typography>
              </div>
              <div>
              <Typography  sx={{ mt: 4, color: '#00FFED', display: 'inline' }}>
                Provincia:
              </Typography>
        <Typography  sx={{ mt: 4, color: '#F836F4', display: 'inline' , ml: 2}}>
        Salta
              </Typography>
              </div>
              <div>

              <Typography  sx={{ mt: 4, color: '#00FFED', display: 'inline' }}>
                País:
              </Typography>
        <Typography  sx={{ mt: 4, color: '#F836F4', display: 'inline', ml: 2 }}>
                Argentina
              </Typography>
              </div>
              <div>

              <Typography  sx={{ mt: 4, color: '#00FFED', display: 'inline' }}>
                Teléfono:
              </Typography>
        <Typography  sx={{ mt: 4, color: '#F836F4',display: 'inline', ml: 2 }}>
        387 - XXXXXXX
              </Typography>
              </div>
              <div>

              <Typography  sx={{ mt: 4, color: '#00FFED',display: 'inline' }}>
                E-mail:
              </Typography>
        <Typography  sx={{ mt: 4, color: '#F836F4',display: 'inline', ml: 2 }}>
        ejemplo@ejemplo.com
              </Typography>
              </div>
              <div>

              <Typography  sx={{ mt: 4, color: '#00FFED' ,display: 'inline'}}>
                Idioma:
              </Typography>
        <Typography  sx={{ mt: 4, color: '#F836F4' ,display: 'inline', ml: 2}}>
                Español
              </Typography>
              </div>
              <div>

              <Typography  sx={{ mt: 4, color: '#00FFED',display: 'inline' }}>
                Estado:
              </Typography>
              <Chip label="Activo" 
              sx={{ backgroundColor: '#F836F4', color: '#000000', boxShadow: '0px 0px 10px 0px #F836F4', display: 'inline', ml: 2}} />
              </div>
            </Box>
            <Button variant="contained" startIcon={<EditIcon />}>Editar </Button>
          </CardContent>
        </Card>
      </Grid>

    </Grid>
  )
}

export default AboutOverivew
