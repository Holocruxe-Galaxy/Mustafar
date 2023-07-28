// ** MUI Imports
import Box from '@mui/material/Box'
import { useTheme } from '@mui/material/styles'

// ** Hooks Import
import { useSettings } from 'src/@core/hooks/useSettings'
import CardLinks from 'src/views/components/horizontalBar/CardLinks'
import { CardLinksProps } from 'src/views/components/horizontalBar/types'
import { Link } from '@mui/material'

const ButtonBarContent = () => {
  // ** Hooks
  const theme = useTheme()
  const { settings } = useSettings()

  // Vars
  const { skin } = settings
  const cards = [
    {
      name: 'Card 1',
      icon: '',
      href: ''
    },
    {
      name: 'Card 2',
      icon: ''
    }
  ]

  return (
    <Box
      component='div'
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
      {cards?.map((item: CardLinksProps, index: number) => (
        <Link key={index} href={item.href}>
          <CardLinks name={item.name} icon={item.icon} key={index} />
        </Link>
      ))}
    </Box>
  )
}

export default ButtonBarContent
