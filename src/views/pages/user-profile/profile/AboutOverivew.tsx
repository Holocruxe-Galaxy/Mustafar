// ** MUI Components
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Components
import UserProfileIcon from 'src/views/pages/user-profile/UserProfileIcon'

// ** Types
import { ProfileTeamsType, ProfileTabCommonType } from 'src/@fake-db/types'

interface Props {
  teams: ProfileTeamsType[]
  about: ProfileTabCommonType[]
  contacts: ProfileTabCommonType[]
  overview: ProfileTabCommonType[]
}

const renderList = (arr: ProfileTabCommonType[]) => {
  if (arr && arr.length) {
    return arr.map((item, index) => {
      return (
        <Box
          key={index}
          sx={{
            display: 'flex',
            '&:not(:last-of-type)': { mb: 4 },
            '& svg': { color: 'text.secondary' }
          }}
          component='div'
        >
          <Box sx={{ display: 'flex', mr: 2 }} component='div'>
            <Icon icon={item.icon} />
          </Box>

          <Box sx={{ columnGap: 2, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }} component='div'>
            <Typography sx={{ fontWeight: 600, color: 'text.secondary' }}>
              {`${item.property.charAt(0).toUpperCase() + item.property.slice(1)}:`}
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              {item.value.charAt(0).toUpperCase() + item.value.slice(1)}
            </Typography>
          </Box>
        </Box>
      )
    })
  } else {
    return null
  }
}

const renderTeams = (arr: ProfileTeamsType[]) => {
  if (arr && arr.length) {
    return arr.map((item, index) => {
      return (
        <Box
          key={index}
          sx={{
            display: 'flex',
            alignItems: 'center',
            '&:not(:last-of-type)': { mb: 4 },
            '& svg': { color: `${item.color}.main` }
          }}
          component='div'
        >
          <Icon icon='item.icon' />

          <Typography sx={{ mx: 2, fontWeight: 600, color: 'text.secondary' }}>
            {item.property.charAt(0).toUpperCase() + item.property.slice(1)}
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>
            {item.value.charAt(0).toUpperCase() + item.value.slice(1)}
          </Typography>
        </Box>
      )
    })
  } else {
    return null
  }
}

const AboutOverivew = (props: Props) => {
  const { teams, about, contacts, overview } = props

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Box sx={{ mb: 7 }} component='div'>
              <UserProfileIcon />
            </Box>
            <Box sx={{ mb: 7 }} component='div'>
              <Typography variant='body2' sx={{ mb: 4, color: 'text.disabled', textTransform: 'uppercase' }}>
                Datos Personales:
              </Typography>
              {renderList(about)}
            </Box>
            <Box sx={{ mb: 7 }} component='div'>
              <Typography variant='body2' sx={{ mb: 4, color: 'text.disabled', textTransform: 'uppercase' }}>
                Contacto:
              </Typography>
              {renderList(contacts)}
            </Box>
            <div>
              <Typography variant='body2' sx={{ mb: 4, color: 'text.disabled', textTransform: 'uppercase' }}>
                Equipos:
              </Typography>
              {renderTeams(teams)}
            </div>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <div>
              <Typography variant='body2' sx={{ mb: 4, color: 'text.disabled', textTransform: 'uppercase' }}>
                Descripción General:
              </Typography>
              {renderList(overview)}
            </div>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default AboutOverivew
