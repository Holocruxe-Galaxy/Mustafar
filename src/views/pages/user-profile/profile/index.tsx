// ** MUI Components
import Grid from '@mui/material/Grid'

// ** Demo Components
import ActivityTimeline from 'src/views/pages/user-profile/profile/ActivityTimeline'

/*import ConnectionsTeams from 'src/views/pages/user-profile/profile/ConnectionsTeams'*/
import UserData from 'src/views/pages/user-profile/profile/UserData'

// ** Types
import { ProfileTabType } from 'src/@fake-db/types'

const ProfileTab = ({ data }: { data: ProfileTabType }) => {
  return data && Object.values(data).length ? (
    <Grid container spacing={6}>
      <Grid item lg={4} md={5} xs={12}>
        <UserData />
      </Grid>
      <Grid item lg={8} md={7} xs={12}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <ActivityTimeline />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  ) : null
}

export default ProfileTab
