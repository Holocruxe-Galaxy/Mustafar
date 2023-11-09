// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

interface TableHeaderProps {
  plan: string
  value: string
  redactar: string
  handleFilter: (val: string) => void
  handlePlanChange: (e: SelectChangeEvent) => void
  handleActionButtonClick: (e: string) => void
}

const TableHeader = (props: TableHeaderProps) => {
  // ** Props
  const { value, redactar, plan, handlePlanChange, handleFilter, handleActionButtonClick } = props

  return (
    <Box sx={{ p: 5, pb: 3, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
      <FormControl sx={{ mb: 2 }}>
        <InputLabel id='redactar'>REDACTAR</InputLabel>
        <Select
          value={redactar}
          id='redactar'
          label="Redactar"
          inputProps={{ placeholder: 'Redactar' }}
        >
          <MenuItem>Mail</MenuItem>
          <MenuItem>Notificaciones</MenuItem>
        </Select>
      </FormControl>
      <Box sx={{mb: 2, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
        <Button data-action='reactivar' onClick={() => handleActionButtonClick('reactivar')} color='success' variant='contained' sx={{ mx: 3, height: '50px' }}>Reactivar</Button>
        <Button data-action='suspender' onClick={() => handleActionButtonClick('suspender')} color='warning' variant='contained' sx={{ mx: 3, height: '50px' }}>Suspender</Button>
        <Button data-action='banear' onClick={() => handleActionButtonClick('banear')} color='error' variant='contained' sx={{ mx: 3, height: '50px' }}>Banear</Button>
      </Box>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
        <TextField
          value={value}
          placeholder='SEARCH USER'
          sx={{ mr: 6, mb: 2 }}
          onChange={e => handleFilter(e.target.value)}
        />
        <FormControl sx={{ mb: 2 }}>
          <InputLabel id='plan-select'>Select Plan</InputLabel>
          <Select
            value={plan}
            id='select-plan'
            label='Select Plan'
            labelId='plan-select'
            onChange={handlePlanChange}
            inputProps={{ placeholder: 'Select Plan' }}
          >
            <MenuItem value=''>Select Plan</MenuItem>
            <MenuItem value='basic'>Basic</MenuItem>
            <MenuItem value='company'>Company</MenuItem>
            <MenuItem value='enterprise'>Enterprise</MenuItem>
            <MenuItem value='team'>Team</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Box>
  )
}

export default TableHeader
