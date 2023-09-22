// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import { makeStyles } from '@mui/styles'
import { useRouter } from 'next/router'


// ** Type
import { CardLinksProps } from './types'

const CardLinks = (props: CardLinksProps) => {
  // Vars
  const { name, activeIcon, inactiveIcon, classType, href } = props

  const useStyles = makeStyles(() => ({
    cardInactive: {
      background: 'none',
      boxShadow: '4px 4px 25px 0px rgba(0, 0, 0, 0.70), 4px 4px 4px 0px rgba(66, 65, 136, 0.50) inset',
      '&:hover':{
        background: 'linear-gradient(180deg, #00FFED -10%, rgba(248, 54, 244, 0.20) 100%)'
      }
    },
    cardActive: {
      display: 'flex',
      alignItems: 'center',
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
    <Button 
    startIcon={'cardActive' ? activeIcon : inactiveIcon}>
      {name}
    </Button>
  )
}

export default CardLinks