// ** MUI Imports
import Box from '@mui/material/Box'
import { useTheme } from '@mui/material/styles'

// ** Hooks
import { useSettings } from 'src/@core/hooks/useSettings'

const ButtonBarContent = () => {
  const theme = useTheme()
  const { settings } = useSettings()

  // Vars
  const { skin } = settings

  return (
    <Box
      component='div'
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        borderRadius: 1,
        overflow: 'hidden',
        position: 'relative',
        backgroundColor: 'background.paper',
        boxShadow: skin === 'bordered' ? 0 : 6,
        ...(skin === 'bordered' && { border: `1px solid ${theme.palette.divider}` })
      }}
      component='div'
    ></Box>
  )
}

export default ButtonBarContent
