// ** MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import UserViewBilling from 'src/views/apps/user/UserViewBilling'
import ProfileData from "src/views/pages/user-profile/profile/ProfileData"

const User = () => {
  
  return (
      <Grid container spacing={6} className='match-height'>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ boxShadow: '4px 4px 4px 0px #FFFFFF80' }}>
            <CardContent>
                <ProfileData />
            </CardContent>
          </Card>
        </Grid>
        <Grid item md={8}>
          <UserViewBilling />
        </Grid>
      </Grid>
  )
}

export default User
