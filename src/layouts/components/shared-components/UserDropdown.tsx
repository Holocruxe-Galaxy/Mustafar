// ** React Imports
import { Fragment } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** MUI Imports

import Badge from '@mui/material/Badge'
import Avatar from '@mui/material/Avatar'

import { styled } from '@mui/material/styles'



// ** Styled Components
const BadgeContentSpan = styled('span')(({ theme }) => ({
  width: 8,
  height: 8,
  borderRadius: '50%',
  backgroundColor: theme.palette.success.main,
  boxShadow: `0 0 0 2px ${theme.palette.background.paper}`
}))

const UserDropdown = () => {

  // ** Hooks
  const router = useRouter()



  const handleDropdownClose = (url?: string) => {
    if (url) {
      router.push(url)
    }

  }





  return (
    <Fragment>
      <Badge
        overlap='circular'
        sx={{ ml: 2, cursor: 'pointer' }}
        badgeContent={<BadgeContentSpan />}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
      >
        <Avatar
          alt='John Doe'
          onClick={() => handleDropdownClose('/profile')}
          sx={{ width: 40, height: 40 }}
          src='/images/avatars/1.png'
        />
      </Badge>

    </Fragment>
  )
}

export default UserDropdown
