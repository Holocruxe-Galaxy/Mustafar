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
import ActivityTimeLine from 'src/views/pages/user-profile/profile/ActivityTimeline'
import PendingTasks from 'src/views/pages/user-profile/profile/PendingTasks'
import EmptyContainer from 'src/views/pages/user-profile/profile/EmptyContainer'

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
    background: 'linear-gradient(180deg, #00FFED 0%, rgba(248, 54, 244, 0.2) 100%)',
  },
});

const Profile = () => {
  return (
    <Grid container>
      <Grid item xs={6}>
        <Card style={{ width: '505px', height: '849px', boxShadow: '4px 4px 4px 0px #FFFFFF80', marginLeft: '0.5em' }}>
          <CardContent>
            <Box component='div'>
              <Badge
                overlap='circular'
                sx={{ml: 30, cursor: 'pointer' }}
                badgeContent={<BadgeContentSpan />}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right'
                }}
              >
                    <Avatar />
              </Badge>
              <Typography variant='h5' sx={{ mt: 4, color: '#00FFED', textAlign: 'center' }}>
                Juan Perez
              </Typography>
              <Typography variant='h6' sx={{ mt: 4, color: '#F836F4', textAlign: 'center', pb: 4 }}>
                36 años
              </Typography>
              <Divider variant='middle' sx={{ backgroundColor: '#00FFED', boxShadow: '0px 0px 10px 0px #00FFED' }} />
              <div style={{ textAlign: 'center', paddingTop: '1em' }}>
                <Typography sx={{ mt: 4, color: '#00FFED', display: 'inline' }}>Apodo:</Typography>
                <Typography sx={{ mt: 4, color: '#F836F4', display: 'inline', ml: 2 }}>JuanP</Typography>
              </div>
              <div style={{ textAlign: 'center', paddingTop: '1em' }}>
                <Typography sx={{ mt: 4, color: '#00FFED', display: 'inline' }}>Fecha de nac.:</Typography>
                <Typography sx={{ mt: 4, color: '#F836F4', display: 'inline', ml: 2 }}>2/6/1986</Typography>
              </div>
              <div style={{ textAlign: 'center', paddingTop: '1em' }}>
                <Typography sx={{ mt: 4, color: '#00FFED', display: 'inline' }}>Ciudad:</Typography>
                <Typography sx={{ mt: 4, color: '#F836F4', display: 'inline', ml: 2 }}>Salta</Typography>
              </div>
              <div style={{ textAlign: 'center', paddingTop: '1em' }}>
                <Typography sx={{ mt: 4, color: '#00FFED', display: 'inline' }}>Provincia:</Typography>
                <Typography sx={{ mt: 4, color: '#F836F4', display: 'inline', ml: 2, textAlign: 'center' }}>
                  Salta
                </Typography>
              </div>
              <div style={{ textAlign: 'center', paddingTop: '1em' }}>
                <Typography sx={{ mt: 4, color: '#00FFED', display: 'inline', textAlign: 'center' }}>País:</Typography>
                <Typography sx={{ mt: 4, color: '#F836F4', display: 'inline', ml: 2, textAlign: 'center' }}>
                  Argentina
                </Typography>
              </div>
              <div style={{ textAlign: 'center', paddingTop: '1em' }}>
                <Typography sx={{ mt: 4, color: '#00FFED', display: 'inline', textAlign: 'center' }}>
                  Teléfono:
                </Typography>
                <Typography sx={{ mt: 4, color: '#F836F4', display: 'inline', ml: 2, textAlign: 'center' }}>
                  387 - XXXXXXX
                </Typography>
              </div>
              <div style={{ textAlign: 'center', paddingTop: '1em' }}>
                <Typography sx={{ mt: 4, color: '#00FFED', display: 'inline', textAlign: 'center' }}>
                  E-mail:
                </Typography>
                <Typography sx={{ mt: 4, color: '#F836F4', display: 'inline', ml: 2, textAlign: 'center' }}>
                  ejemplo@ejemplo.com
                </Typography>
              </div>
              <div style={{ textAlign: 'center', paddingTop: '1em' }}>
                <Typography sx={{ mt: 4, color: '#00FFED', display: 'inline', textAlign: 'center' }}>
                  Idioma:
                </Typography>
                <Typography sx={{ mt: 4, color: '#F836F4', display: 'inline', ml: 2, textAlign: 'center' }}>
                  Español
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
              <StyledButton variant='contained' startIcon={<EditIcon />}>
                Editar
              </StyledButton>
            </div>
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
