// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'
import { makeStyles } from '@mui/styles'

// ** Type Import
import { Settings } from 'src/@core/context/settingsContext'

// ** Components
// **import Autocomplete from 'src/layouts/components/Autocomplete'
import LanguageDropdown from 'src/@core/layouts/components/shared-components/LanguageDropdown'
import UserDropdown from 'src/@core/layouts/components/shared-components/UserDropdown'
import { Search, Bell, Line, InactiveConections, ActiveMetrics, InactiveMetrics, ActiveBinnacle, InactiveBinnacle, ActiveTutorial, InactiveTutorial } from 'src/views/components/icons/index'

//import ModeToggler from 'src/@core/layouts/components/shared-components/ModeToggler'

// ** Hook Import
import { useAuth } from 'src/hooks/useAuth'
import { useRouter } from 'next/router'

interface Props {
  hidden: boolean
  settings: Settings
  toggleNavVisibility: () => void
  saveSettings: (values: Settings) => void
}

const AppBarContent = (props: Props) => {
  // ** Hook
  const auth = useAuth()
  const router = useRouter()

  // ** Props
  const { /* hidden, */ settings, saveSettings } = props
  const theme = useTheme()

    // ** States
    const [activeArea, setActiveArea] = useState(false)

    const handleMouseEnter = () => {
      setActiveArea(true)
    }
  
    const handleMouseLeaves = () => {
      setActiveArea(false)
    }

  const useStyles = makeStyles(() => ({
    card: {
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'start', 
      width: '25rem', 
      height: '5.313rem', 
      margin: '1.200rem', 
      borderRadius: '14px', 
      fontSize: '21px', 
      fontWeight: 1,
      boxShadow: '4px 4px 25px 0px rgba(0, 0, 0, 0.70), 4px 4px 4px 0px rgba(66, 65, 136, 0.50) inset',
      '&:hover':{
        background: 'linear-gradient(180deg, #00FFED -10%, rgba(248, 54, 244, 0.20) 100%)'
      }
    },
    cardActive: {
      display: 'flex',
      fontWeight: '20px',
      justifyContent: 'start', 
      alignItems: 'center',
      background: 'linear-gradient(180deg, #00FFED -10%, rgba(248, 54, 244, 0.20) 100%)',
      boxShadow: '4px 4px 25px 0px rgba(255, 255, 255, 0.20), 4px 4px 4px 0px rgba(255, 255, 255, 0.25) inset;'
    },
    content: {
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'space-between', 
      width: '100%'
    },
    icons: {
      width: '20px',
      height: '20px'
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

  const cardsArr = [
    {
      page: 'home',
      buttons: [{ name: 'TUTORIAL', activeIcon: <ActiveTutorial />, inactiveIcon: <InactiveTutorial />, href: 'home'}]
    },
    {
      page: 'apps/diary',
      buttons: [
        { name: 'MI BITÁCORA', activeIcon: <ActiveBinnacle />, inactiveIcon: <InactiveBinnacle />, href: 'apps/diary'},
        { name: 'TUS MÉTRICAS', activeIcon: <ActiveMetrics />, inactiveIcon: <InactiveMetrics/>, href: ''}
      ]
    },
    {
      page: 'profile',
      buttons: [
        { name: 'TUS INTERESES', activeIcon: <ActiveBinnacle />, inactiveIcon: <InactiveBinnacle />, href: 'apps/diary'},
        { name: 'TUS MÉTRICAS', activeIcon: <ActiveMetrics />, inactiveIcon: <InactiveMetrics/>, href: ''}
      ]
    },
  ]

  // Vars
  const currentPage = cardsArr.find(item => item.page == router.pathname.slice(1))
  const selectedPage = currentPage?.page

  const handleRedirect = (href: string) => {
    router.push(`${href}`)
  }

  const { skin } = settings

  return (
    <Box
      component='div'
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        borderRadius: 1,
        overflow: 'hidden',
        position: 'relative',
        backgroundColor: 'background.paper',
        boxShadow: /* skin === 'bordered' ? 0 : 6 */ '4px 4px 4px 0px rgba(255, 255, 255, 0.50)',
        mt: 8,
        ...(skin === 'bordered' && { border: `1px solid ${theme.palette.divider}` })
      }}
    >
      {currentPage?.buttons.map((card, index: number) => (
        <Button
        key={index}
        sx={{width: '25rem', height: '5.313rem', margin: '1.200rem', pl:8, borderRadius: '14px', fontSize:'21px', fontWeight: 1 }}
        className={selectedPage === card.href ?  classes.cardActive : classes.card}
        onClick={() => handleRedirect(card.href)}
        startIcon={currentPage.page === card.href ? card.activeIcon : card.inactiveIcon}>
          <Typography className={currentPage.page === card.href ? classes.fontActive : classes.font} variant='h6'>{card.name}</Typography>
        </Button>
      ))}
      <Card 
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeaves} 
      className={activeArea ? classes.card : classes.card} >

        <CardContent className={classes.content} >
        <Search />
          <Line />
          <LanguageDropdown settings={settings} saveSettings={saveSettings} />
          <InactiveConections />            
          {auth.user && (
            <>
              <Bell /> 
              <Line />
              <UserDropdown settings={settings} />
            </>
          )}
        </CardContent>
      </Card>
    </Box>
  )
}

export default AppBarContent
