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
import CardBarLinks from 'src/views/components/horizontalBar/CardBarLinks'
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
  const { /* hidden, */ settings, saveSettings } = props
  const theme = useTheme()

  const button = [
    {
      page: 'home',
      buttons: [{ name: 'TUTORIAL', icon: '', href: '',  active: true }]
    },
    {
      page: 'apps/diary',
      buttons: [
        { name: 'MI BITÁCORA', icon: '', href: '', active: true },
        { name: 'TUS MÉTRICAS', icon: '', href: '', active: true }
      ]
    },
    {
      page: 'apps/account',
      buttons: [
        { name: 'TUS INTERESES',
        // activeIcon: '', inactiveIcon: ''
        icon: '', href: '', active: true },
        { name: 'TUS MÉTRICAS', icon: '', href: '', active: true }
      ]
    },
    {
      page: 'apps/security',
      buttons: [
        { name: 'TUS INTERESES',
        // activeIcon: '', inactiveIcon: ''
        icon: '', href: '', active: true },
        { name: 'TUS MÉTRICAS', icon: '', href: '', active: true }
      ]
    },
    {
      page: 'apps/',
      buttons: [
        { name: 'TUS INTERESES',
        // activeIcon: '', inactiveIcon: ''
        icon: '', href: '', active: true },
        { name: 'TUS MÉTRICAS', icon: '', href: '', active: true }
      ]
    }
  ]

  // Vars
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
      {currentPage?.buttons.map((button, index) => (
        <Link key='index' href={button.href}>
          <CardBarLinks key={index} name={button.name} icon={button.icon} />
        </Link>
      ))}
      <Card sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '26.063rem', height: '5.313rem', margin: 5, borderRadius: '14px' }}>
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
    </Box>
  )
}

export default AppBarContent
