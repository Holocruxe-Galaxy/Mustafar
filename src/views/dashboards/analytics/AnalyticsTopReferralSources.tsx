// ** React Imports
import { SyntheticEvent, useState } from 'react'

// ** MUI Import
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import Card from '@mui/material/Card'
import TabList from '@mui/lab/TabList'
import Table from '@mui/material/Table'
import TabPanel from '@mui/lab/TabPanel'
import Avatar from '@mui/material/Avatar'
import TabContext from '@mui/lab/TabContext'
import TableRow from '@mui/material/TableRow'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import TableContainer from '@mui/material/TableContainer'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Type Imports
import { ThemeColor } from 'src/@core/layouts/types'

// ** Custom Components
import CustomChip from 'src/@core/components/mui/chip'
import OptionsMenu from 'src/@core/components/option-menu'

// ** Util Import
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'

interface StatusObj {
  [ke: string]: {
    text: string
    color: ThemeColor
  }
}
interface TabContentType {
  status: string
  parameter: string
  conversion: string
  totalRevenue: string
  conversionDifference?: 'positive' | 'negative'
}
interface TabContentDataType {
  reddit: TabContentType[]
  google: TabContentType[]
  facebook: TabContentType[]
  instagram: TabContentType[]
}

const statusObj: StatusObj = {
  activo: { text: 'Activo', color: 'primary' },
  expired: { text: 'Expirado', color: 'error' },
  'in-draft': { text: 'Actualizado', color: 'info' },
  completed: { text: 'Completado', color: 'warning' }
}

const tabContentData: TabContentDataType = {
  google: [
    {
      status: 'activo',
      conversion: '100',
      totalRevenue: '45k',
      parameter: 'Google'
    },
    {
      conversion: '12',
      status: 'completed',
      totalRevenue: '500',
      parameter: 'Facebook',
      conversionDifference: 'negative'
    },
    {
      status: 'activo',
      conversion: '75',
      totalRevenue: '2765',
      parameter: 'Instagram'
    },
    {
      conversion: '0',
      status: 'in-draft',
      totalRevenue: '0',
      parameter: 'Reddit'
    }
  ],
  facebook: [
    {
      status: 'activo',
      conversion: '8',
      totalRevenue: '$322',
      conversionDifference: 'negative',
      parameter: 'Create Audiences in Ads Manager'
    },
    {
      status: 'activo',
      conversion: '19',
      totalRevenue: '$5,634',
      parameter: 'Facebook page advertising'
    },
    {
      status: 'expired',
      conversion: '23',
      totalRevenue: '$751',
      conversionDifference: 'negative',
      parameter: 'Messenger advertising'
    },
    {
      conversion: '21',
      status: 'completed',
      totalRevenue: '$3,585',
      parameter: 'Video campaign'
    }
  ],
  instagram: [
    {
      conversion: '15',
      status: 'in-draft',
      totalRevenue: '$599',
      conversionDifference: 'negative',
      parameter: 'Create shopping advertising'
    },
    {
      conversion: '37',
      status: 'completed',
      totalRevenue: '$1,467',
      parameter: 'IGTV advertising'
    },
    {
      conversion: '0',
      status: 'in-draft',
      totalRevenue: '$0',
      parameter: 'Collection advertising'
    },
    {
      status: 'activo',
      conversion: '29',
      totalRevenue: '$4,546',
      parameter: 'Stories advertising'
    }
  ],
  reddit: [
    {
      conversion: '+2',
      status: 'expired',
      totalRevenue: '$404',
      parameter: 'Interests advertising'
    },
    {
      status: 'activo',
      conversion: '25',
      totalRevenue: '$399',
      parameter: 'Community advertising'
    },
    {
      conversion: '21',
      status: 'completed',
      totalRevenue: '$177',
      parameter: 'Device advertising'
    },
    {
      status: 'activo',
      conversion: '5',
      totalRevenue: '$1,139',
      parameter: 'Campaigning',
      conversionDifference: 'negative'
    }
  ]
}

const RenderTabContent = ({ data }: { data: TabContentType[] }) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow sx={{ '& .MuiTableCell-root': { py: theme => `${theme.spacing(2.5)} !important` } }}>
            <TableCell>Integración</TableCell>
            <TableCell align='right'>Status</TableCell>
            <TableCell align='right'>Porcentaje</TableCell>
            <TableCell align='right' sx={{ whiteSpace: 'nowrap' }}>
              Registros
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row: TabContentType, index: number) => (
            <TableRow
              key={index}
              sx={{ '& .MuiTableCell-root': { border: 0, py: theme => `${theme.spacing(3)} !important` } }}
            >
              <TableCell>
                <Typography variant='body2' sx={{ fontWeight: 600, whiteSpace: 'nowrap', color: 'text.primary' }}>
                  {row.parameter}
                </Typography>
              </TableCell>
              <TableCell align='right'>
                <CustomChip
                  skin='light'
                  size='small'
                  label={statusObj[row.status].text}
                  color={statusObj[row.status].color}
                  sx={{ height: 20, fontWeight: 500, '& .MuiChip-label': { px: 1.625, lineHeight: 1.539 } }}
                />
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  sx={{
                    fontWeight: 600,
                    textAlign: 'right',
                    color: row.conversionDifference === 'negative' ? 'error.main' : 'success.main'
                  }}
                >{`${row.conversion}%`}</Typography>
              </TableCell>
              <TableCell>
                <Typography variant='body2' sx={{ fontWeight: 600, textAlign: 'right', color: 'text.primary' }}>
                  {row.totalRevenue}
                </Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

const AnalyticsTopReferralSources = () => {
  // ** State
  const [value, setValue] = useState<string>('google')

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  const RenderTabAvatar = ({ category }: { category: string }) => (
    <Avatar
      variant='rounded'
      sx={{
        width: 100,
        height: 92,
        backgroundColor: 'transparent',
        border: theme =>
          value === category ? `2px solid ${theme.palette.primary.main}` : `2px dashed ${theme.palette.divider}`
      }}
    >
      <Box component='div' sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        <img
          width={34}
          height={34}
          alt={`tabs-${category}`}
          src={`/images/logos/${category === 'facebook' ? 'facebook-round' : category}.png`}
        />
        <Typography variant='body2' sx={{ mt: 2, fontWeight: 600, color: 'text.primary', textTransform: 'capitalize' }}>
          {category}
        </Typography>
      </Box>
    </Avatar>
  )

  return (
    <Card>
      <CardHeader
        title='Holocruxe Sync'
        subheader='68% Activity Growth'
        action={
          <OptionsMenu
            options={['Last 28 Days', 'Last Month', 'Last Year']}
            iconButtonProps={{ size: 'small', className: 'card-more-options' }}
          />
        }
      />
      <TabContext value={value}>
        <TabList
          variant='scrollable'
          scrollButtons='auto'
          onChange={handleChange}
          aria-label='top referral sources tabs'
          sx={{
            mb: 2.5,
            px: 5,
            '& .MuiTab-root:not(:last-child)': { mr: 4 },
            '& .MuiTabs-indicator': { display: 'none' }
          }}
        >
          <Tab value='google' sx={{ p: 0 }} label={<RenderTabAvatar category='google' />} />
          <Tab value='facebook' sx={{ p: 0 }} label={<RenderTabAvatar category='facebook' />} />
          <Tab value='instagram' sx={{ p: 0 }} label={<RenderTabAvatar category='instagram' />} />
          <Tab value='reddit' sx={{ p: 0 }} label={<RenderTabAvatar category='reddit' />} />
          <Tab
            disabled
            value='add'
            sx={{ p: 0 }}
            label={
              <Avatar
                variant='rounded'
                sx={{
                  width: 100,
                  height: 92,
                  backgroundColor: 'transparent',
                  border: theme =>
                    value === 'add' ? `2px solid ${theme.palette.primary.main}` : `2px dashed ${theme.palette.divider}`
                }}
              >
                <Box
                  sx={{
                    width: 30,
                    height: 30,
                    display: 'flex',
                    borderRadius: '8px',
                    alignItems: 'center',
                    color: 'action.Activo',
                    justifyContent: 'center',
                    backgroundColor: theme => hexToRGBA(theme.palette.secondary.main, 0.12)
                  }}
                >
                  <Icon icon='mdi:plus' />
                </Box>
              </Avatar>
            }
          />
        </TabList>

        <TabPanel sx={{ p: 0, mb: 2.5 }} value='google'>
          <RenderTabContent data={tabContentData['google']} />
        </TabPanel>
        <TabPanel sx={{ p: 0, mb: 2.5 }} value='facebook'>
          <RenderTabContent data={tabContentData['facebook']} />
        </TabPanel>
        <TabPanel sx={{ p: 0, mb: 2.5 }} value='instagram'>
          <RenderTabContent data={tabContentData['instagram']} />
        </TabPanel>
        <TabPanel sx={{ p: 0, mb: 2.5 }} value='reddit'>
          <RenderTabContent data={tabContentData['reddit']} />
        </TabPanel>
      </TabContext>
    </Card>
  )
}

export default AnalyticsTopReferralSources
