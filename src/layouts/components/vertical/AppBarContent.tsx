// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import { useTheme } from '@mui/material/styles'
import { makeStyles } from '@mui/styles'

// ** Type Import
import { Settings } from 'src/@core/context/settingsContext'

// ** Components
// **import Autocomplete from 'src/layouts/components/Autocomplete'
import CardBarLinks from 'src/views/components/horizontalBar/CardBarLinks'
import LanguageDropdown from 'src/@core/layouts/components/shared-components/LanguageDropdown'
import UserDropdown from 'src/@core/layouts/components/shared-components/UserDropdown'
import { Search, Bell, Line, Conections, ActiveMetrics, InactiveMetrics, ActiveBinnacle, InactiveBinnacle } from 'src/views/components/icons/index'

//import ModeToggler from 'src/@core/layouts/components/shared-components/ModeToggler'

// ** Hook Import
import { useAuth } from 'src/hooks/useAuth'
import { useRouter } from 'next/router'
import { Link } from '@mui/material'

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

  const useStyles = makeStyles(() => ({
    card: { 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      width: '26.063rem', 
      height: '5.313rem', 
      margin: '1.200rem', 
      borderRadius: '14px', 
      fontSize: '45px', 
      fontWeight: 1,
      boxShadow: '4px 4px 4px 0px rgba(66, 65, 136, 0.50) inset',
      '&:hover':{
        background: 'linear-gradient(180deg, #00FFED -10%, rgba(248, 54, 244, 0.20) 100%)'
      }
    },
    content: {
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'space-between', 
      width: '100%'
    }
  }))

  const classes = useStyles()

  const cardsArr = [
    {
      page: 'home',
      buttons: [{ name: 'TUTORIAL', activeIcon: '', inactiveIcon: '', href: 'home'}]
    },
    {
      page: 'apps/diary',
      buttons: [
        { name: 'MI BITÁCORA', activeIcon: <ActiveBinnacle />, inactiveIcon: <InactiveBinnacle />, href: 'apps/diary'},
        { name: 'TUS MÉTRICAS', activeIcon: <ActiveMetrics />, inactiveIcon: <InactiveMetrics/>, href: ''}
      ]
    }
  ]

  // Vars
  const currentPage = cardsArr.find(item => item.page == router.pathname.slice(1))
  const selectedPage = currentPage?.page

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
      {currentPage?.buttons.map((card, index) => (
        <Link key='index' href={card.href} underline="none">
          <CardBarLinks classType={ selectedPage === card.href ? 'cardActive' : 'cardInactive' }  key={index} name={card.name} activeIcon={card.activeIcon} inactiveIcon={card.inactiveIcon} />
        </Link>
      ))}
      <Card className={classes.card} >
        <CardContent className={classes.content} >
        <Search />
          <Line />
          <LanguageDropdown settings={settings} saveSettings={saveSettings} />
          <Conections />
{/*           <ModeToggler settings={settings} saveSettings={saveSettings} /> */}
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
