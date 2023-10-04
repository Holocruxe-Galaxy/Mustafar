// ** MUI Imports
import React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { makeStyles } from '@mui/styles'
import { useTheme } from '@mui/material/styles'

// ** Hooks Import
import { useSettings } from 'src/@core/hooks/useSettings'
import { useRouter } from 'next/router'

// ** Types Imports
import { CardButtonsProps, CardLinksProps } from 'src/views/components/horizontalBar/types'

const CardButtons = (props: CardButtonsProps) => {
  // ** Props
  const {
    data
  } = props

  // ** Hooks
  const theme = useTheme()
  const { settings } = useSettings()
  const router = useRouter()

  // Vars
  const { skin } = settings

  // Styles
  const useStyles = makeStyles(() => ({
    button: {
      boxShadow: '4px 4px 25px 0px rgba(0, 0, 0, 0.70), 4px 4px 4px 0px rgba(66, 65, 136, 0.50) inset',
      backgroundColor: 'background.primary.main',
      '&:hover':{
        background: 'linear-gradient(180deg, #00FFED -10%, rgba(248, 54, 244, 0.20) 100%)',
      }
    },
    activeButton: {
      color: 'white',
      background: 'linear-gradient(180deg, #00FFED -10%, rgba(248, 54, 244, 0.20) 100%)',
      boxShadow: '4px 4px 25px 0px rgba(255, 255, 255, 0.20), 4px 4px 4px 0px rgba(255, 255, 255, 0.25) inset'
    },
    font: {
      color: '#00FFED',
      fontWeight: 1
    },
    fontActive: {
      color: 'white'
    }
  }))

  const classes = useStyles()

  const currentPage = data.find(item => item.href === router.pathname.slice(1))

  const handleRedirect = (href: string) => {
    let newRoute = href.slice(5)
    router.push(newRoute)
  }

  return (
    <Box
    component='div'
    sx={{
      width: '100%',
      height: '5.688rem',
      display: 'flex',
      overflow: 'hidden',
      position: 'relative',
      backgroundColor: 'background.paper',
      borderRadius: '10px',
      boxShadow: /* skin === 'bordered' ? 0 : 6 */ '4px 4px 4px 0px rgba(255, 255, 255, 0.50)',
      ...(skin === 'bordered' && { border: `1px solid ${theme.palette.divider}` })
    }}
    >
      {data?.map((item: CardLinksProps, index: number) => (
          <Button
          key={index}
          sx={{width: '20rem', height: 70, my: 2.5, mx: 6, pl:8, borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'start'}}
          className={currentPage?.href === item.href ? classes.activeButton : classes.button}
          onClick={() => handleRedirect(item.href)}
          startIcon={currentPage?.href === item.href ? item.activeIcon : item.inactiveIcon}>
            <Typography className={currentPage?.href === item.href ? classes.fontActive : classes.font} variant='h6'>{item.name}</Typography>
          </Button>
      ))}
    </Box>
  )
}

export default CardButtons