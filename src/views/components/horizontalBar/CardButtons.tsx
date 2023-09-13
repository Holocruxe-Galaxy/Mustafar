// ** MUI Imports
import React from 'react'
import Box from '@mui/material/Box'
import { useTheme } from '@mui/material/styles'

// ** Hooks Import
import { Link } from '@mui/material'
import { useSettings } from 'src/@core/hooks/useSettings'

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

  // Vars
  const { skin } = settings

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
      boxShadow: skin === 'bordered' ? 0 : 6,
      ...(skin === 'bordered' && { border: `1px solid ${theme.palette.divider}` })
    }}
    >
      {data?.map((item: CardLinksProps, index: number) => (
        <Link key={index} href={item.href}>
          <CardLinks name={item.name} icon={item.icon} key={index}/>
        </Link>
      ))}
    </Box>
  )
}

export default CardButtons