// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { AvatarProps } from '@mui/material/Avatar'
import { styled } from '@mui/material/styles'

// ** Custom Components Imports
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Types Imports
import { CardLinksProp } from 'src/@core/components/card-statistics/types'

// ** Styled Avatar component
const Avatar = styled(CustomAvatar)<AvatarProps>(({ theme }) => ({
  width: 55,
  height: 55,
  marginRight: theme.spacing(4)
}))

const CardLinks = (props: CardLinksProp) => {
  // ** Props
  const name = 'Acá viene un Link'

  /*   const { name } = props */

  return (
    <Card sx={{ display: 'flex', alignItems: 'center', width: 290, backgroundColor: 'red', margin: 2 }}>
      <CardContent sx={{ py: theme => `${theme.spacing(4.125)} !important`, height: 100 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap'
          }}
        >
          <Avatar skin='light' /* color={color} */ variant='rounded'>
            {/* {icon} */}
          </Avatar>
          <Typography variant='h6'>{name}</Typography>
        </Box>
      </CardContent>
    </Card>
  )
}

export default CardLinks
