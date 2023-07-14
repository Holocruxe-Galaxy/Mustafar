// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { AvatarProps } from '@mui/material/Avatar'
import { styled } from '@mui/material/styles'
import { useTheme } from '@mui/material/styles'

// ** Hooks
import { useSettings } from 'src/@core/hooks/useSettings'
import CardLinks from 'src/views/components/cardLinks/CardLinks'

// ** Custom Components Imports
import CustomAvatar from 'src/@core/components/mui/avatar'

const Avatar = styled(CustomAvatar)<AvatarProps>(({ theme }) => ({
  width: 55,
  height: 55,
  marginRight: theme.spacing(4)
}))

const ButtonBarContent = () => {
  // ** Hooks
  const theme = useTheme()
  const { settings } = useSettings()

  // Vars
  const { skin } = settings
  const name = 'Acá viene un Link'

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        borderRadius: 1,
        overflow: 'hidden',
        position: 'relative',
        backgroundColor: 'background.paper',
        boxShadow: skin === 'bordered' ? 0 : 6,
        ...(skin === 'bordered' && { border: `1px solid ${theme.palette.divider}` })
      }}
    >
      <Card sx={{ display: 'flex', alignItems: 'center', width: 290, margin: 5, height: 50 }}>
        <CardContent sx={{ py: theme => `${theme.spacing(4.125)} !important` }}>
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
    </Box>
  )
}

export default ButtonBarContent
