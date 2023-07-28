// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import { useTheme } from '@mui/material/styles'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Type Import
import { Settings } from 'src/@core/context/settingsContext'

// ** Components
// **import Autocomplete from 'src/layouts/components/Autocomplete'
import CardLinks from 'src/views/components/horizontalBar/CardLinks'
import LanguageDropdown from 'src/@core/layouts/components/shared-components/LanguageDropdown'
import ModeToggler from 'src/@core/layouts/components/shared-components/ModeToggler'
import UserDropdown from 'src/@core/layouts/components/shared-components/UserDropdown'

// ** Hook Import
import { useAuth } from 'src/hooks/useAuth'
import { useRouter } from 'next/router'
import { Link } from '@mui/material'

/* import Link from 'next/link' */

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
  const { /* hidden, */ settings, saveSettings /* , toggleNavVisibility  */ } = props
  const theme = useTheme()

  const button = [
    {
      page: 'home',
      buttons: [
        { name: 'Tutorial', icon: '', href: '' }

        /*         { name: 'Documentation', icon: '', href: '' } */
      ]
    },
    {
      page: 'apps/chat',
      buttons: [
        { name: 'Tus intereses', icon: '', href: '/home' },
        { name: 'Tus métricas', icon: '', href: '' }
      ]
    }
  ]

  // Vars
  /*   const currentPath = router.pathname */
  const currentPage = button.find(item => item.page == router.pathname.slice(1))

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
        boxShadow: skin === 'bordered' ? 0 : 6,
        mt: 8,
        ...(skin === 'bordered' && { border: `1px solid ${theme.palette.divider}` })
      }}
    >
      {/*       <Box className='actions-left' sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
        {hidden && !settings.navHidden ? (
          <IconButton color='inherit' sx={{ ml: -2.75 }} onClick={toggleNavVisibility}>
            <Icon icon='mdi:menu' />
          </IconButton>
        ) : null}
        {auth.user && <Autocomplete hidden={hidden} settings={settings} />}
      </Box> */}
      {/*       <Box className='actions-right' sx={{ display: 'flex', alignItems: 'center' }}> */}
      {currentPage?.buttons.map((button, index) => (
        <Link key='index' href={button.href}>
          <CardLinks key={index} name={button.name} icon={button.icon} />
        </Link>
      ))}
      <Card sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 500, margin: 4 }}>
        <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '90%' }}>
          <Icon icon='ic:baseline-search' />
          <LanguageDropdown settings={settings} saveSettings={saveSettings} />
          <ModeToggler settings={settings} saveSettings={saveSettings} />
          {auth.user && (
            <>
              <Icon icon='ic:baseline-mail' />
              <UserDropdown settings={settings} />
            </>
          )}
        </CardContent>
      </Card>
      {/*       </Box> */}
    </Box>
  )
}

export default AppBarContent
