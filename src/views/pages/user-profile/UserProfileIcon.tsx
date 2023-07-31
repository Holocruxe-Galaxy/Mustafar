// ** React Imports
import { useState, useEffect } from 'react'

// ** MUI Components
import Card from '@mui/material/Card'
import { styled } from '@mui/material/styles'
import CardContent from '@mui/material/CardContent'

// ** Third Party Imports
import axios from 'axios'

// ** Types
import { ProfileHeaderType } from 'src/@fake-db/types'

const ProfilePicture = styled('img')(({ theme }) => ({
  width: 120,
  height: 120,
  borderRadius: theme.shape.borderRadius * 6,
  border: `5px solid ${theme.palette.common.white}`,
  [theme.breakpoints.down('md')]: {
    marginBottom: theme.spacing(4)
  }
}))

const UserProfileHeader = () => {
  // ** State
  const [data, setData] = useState<ProfileHeaderType | null>(null)

  useEffect(() => {
    axios.get('/pages/profile-header').then(response => {
      setData(response.data)
    })
  }, [])

  return data !== null ? (
    <Card>
      <CardContent
        sx={{
          display: 'flex',
          flexWrap: { xs: 'wrap', md: 'nowrap' },
          justifyContent: { xs: 'center', md: 'center' }
        }}
      >
        <ProfilePicture src={data.profileImg} alt='profile-picture' />
      </CardContent>
    </Card>
  ) : null
}

export default UserProfileHeader
