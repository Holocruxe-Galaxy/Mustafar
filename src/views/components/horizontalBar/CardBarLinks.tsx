// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { AvatarProps } from '@mui/material/Avatar'
import { styled } from '@mui/material/styles'
import { makeStyles } from '@mui/styles'

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
  const { name, icon, href, classType } = props

  const useStyles = makeStyles(() =>({
    cardInactive: {
        background: 'none',
        boxShadow: '4px 4px 4px 0px rgba(66, 65, 136, 0.50) inset',
    },
    cardActive: {
        background: 'linear-gradient(180deg, #00FFED -10%, rgba(248, 54, 244, 0.20) 100%)',
        boxShadow: '4px 4px 25px 0px rgba(255, 255, 255, 0.20), 4px 4px 4px 0px rgba(255, 255, 255, 0.25) inset;'
    },
    typoInactive: {
        color: 'rgba(0, 255, 237, 1)',
        fontWeight: 1
    },
    typoActive: {
        color: 'white'
    }
  }))

  const classes = useStyles()

  return (
    <Card className={classType === 'cardActive'? classes.cardActive : classes.cardInactive} sx={{ display: 'flex', 
        alignItems: 'center', 
        width: '21.563rem', 
        height: 85, 
        mx: '25px', 
        my:5, 
        borderRadius: '14px'}}>
      <CardContent sx={{ height: 100 }} >
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
          <Typography className={classType === 'cardActive'? classes.typoActive : classes.typoInactive} variant='h6'>{name}</Typography>
        </Box>
      </CardContent>
    </Card>
  )
}

export default CardLinks