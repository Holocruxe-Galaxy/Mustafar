// ** MUI Imports
import Box from '@mui/material/Box'
import { useTheme } from '@mui/material/styles'

<<<<<<< HEAD
// ** Hooks Import
import { useSettings } from 'src/@core/hooks/useSettings'
import CardLinks from 'src/views/components/horizontalBar/CardLinks'
import { CardLinksProps } from 'src/views/components/horizontalBar/types'

const ButtonBarContent = () => {
  // ** Hooks
=======
// ** Hooks
import { useSettings } from 'src/@core/hooks/useSettings'

const ButtonBarContent = () => {
>>>>>>> bed1408e69a4fad3054cb279e2f1a07288b01e80
  const theme = useTheme()
  const { settings } = useSettings()

  // Vars
  const { skin } = settings
<<<<<<< HEAD
  const cards = [
    {
      name: 'Card 1'
    },
    {
      name: 'Card 2'
    }
  ]

  return (
    <Box
      sx={{
        width: '100%',
=======

  return (
    <Box
      component='div'
      sx={{
        width: '100%',
        height: '100%',
>>>>>>> bed1408e69a4fad3054cb279e2f1a07288b01e80
        display: 'flex',
        borderRadius: 1,
        overflow: 'hidden',
        position: 'relative',
        backgroundColor: 'background.paper',
        boxShadow: skin === 'bordered' ? 0 : 6,
        ...(skin === 'bordered' && { border: `1px solid ${theme.palette.divider}` })
      }}
<<<<<<< HEAD
    >
      {cards.map((item: CardLinksProps, index: number) => {
        return <CardLinks name={item.name} key={index} />
      })}
    </Box>
=======
    ></Box>
>>>>>>> bed1408e69a4fad3054cb279e2f1a07288b01e80
  )
}

export default ButtonBarContent
