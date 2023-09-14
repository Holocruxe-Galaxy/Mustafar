// ** MUI Imports
import React from 'react'
import Box from '@mui/material/Box'
import { useTheme } from '@mui/material/styles'

// ** Hooks Import
import { Link } from '@mui/material'
import { useSettings } from 'src/@core/hooks/useSettings'
import { useRouter } from 'next/router'

// ** Types Imports
import { CardButtonsProps, CardLinksProps } from 'src/views/components/horizontalBar/types'

import CardLinks from './CardLinks'

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

  const currentPage = data.find(item => item.href === router.pathname.slice(1))

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
        <Link key={index} href={item.href} underline="none">
          <CardLinks classType={currentPage?.href === item.href ? 'cardActive' : 'cardInactive'} name={item.name} activeIcon={item.activeIcon} inactiveIcon={item.inactiveIcon} key={index}/>
        </Link>
      ))}
    </Box>
  )
}

export default CardButtons