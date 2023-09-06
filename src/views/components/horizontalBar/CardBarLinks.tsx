// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { AvatarProps } from '@mui/material/Avatar'
import { styled } from '@mui/material/styles'

// ** Custom Components Imports
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Type
import { CardLinksProps } from './types'

// ** Styled Avatar component
const Avatar = styled(CustomAvatar)<AvatarProps>(({ theme }) => ({
  width: 55,
  height: 55,
  marginRight: theme.spacing(4)
}))

const CardLinks = (props: CardLinksProps) => {
  // Vars
  const { name, icon, href } = props

  return (
    <Card sx={{ display: 'flex', alignItems: 'center', width: 345, height: 85, mx: '25px', my:5, borderRadius: '14px'}}>
      <CardContent sx={{ height: 100 }}>
        <Box
          component='div'
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap'
          }}
        >
          <Avatar skin='light' variant='rounded'>
            {icon}
          </Avatar>
          <Typography variant='h6'>{name}</Typography>
        </Box>
      </CardContent>
    </Card>
  )
}

export default CardLinks