// ** React Imports
import { Fragment } from 'react'

// ** Next Import


// ** MUI Imports

import Badge from '@mui/material/Badge'

import { styled } from '@mui/material/styles'



import { InactiveAvatar, } from 'src/views/components/icons/index'
import Link from 'next/link'





// ** Styled Components
const BadgeContentSpan = styled('span')(({ theme }) => ({
  width: 8,
  height: 8,
  borderRadius: '50%',
  backgroundColor: theme.palette.success.main,
  boxShadow: `0 0 0 2px ${theme.palette.background.paper}`
}))

const UserDropdown = () => {
  // ** Props




  return (
    <Fragment>
    <Link href='/profile'>
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
          <InactiveAvatar />
        </Badge>
      </Fragment>
    </Link>
    </Fragment>
  )
}

export default UserDropdown
