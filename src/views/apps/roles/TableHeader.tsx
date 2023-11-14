// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { DialogActions } from '@mui/material'

interface TableHeaderProps {
  plan: string
  value: string
  redactar: string
  actionMessage: string
  selectedUsers: string
  setActionMessage: (e: string) => void
  handleActionConfirm:(val: string) => void
  handleFilter: (val: string) => void
  handlePlanChange: (e: SelectChangeEvent) => void
  handleActionButtonClick: (e: string) => void
}

const TableHeader = (props: TableHeaderProps) => {
  // ** Props
  const { value, redactar, plan, actionMessage, selectedUsers, setActionMessage, handlePlanChange, handleFilter, handleActionButtonClick, handleActionConfirm /* ,handleBanConfirm */ } = props

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
      { 
        !selectedUsers.length ? null :
        <Box sx={{mb: 2, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
        <Button data-action='reactivar' onClick={() => handleActionButtonClick('reactivar')} color='success' variant='outlined' sx={{ mx: 3, height: '50px' }}>Reactivar</Button>
        <Button data-action='suspender' onClick={() => handleActionButtonClick('suspender')} color='warning' variant='outlined' sx={{ mx: 3, height: '50px' }}>Suspender</Button>
        <Button data-action='banear' onClick={() => handleActionButtonClick('banear')} color='error' variant='outlined' sx={{ mx: 3, height: '50px' }}>Banear</Button>
      </Box>
      }
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

        {
        actionMessage.includes('suspenderá') ? 
        <Box component='div'>
        <Dialog open={Boolean(actionMessage)} onClose={() => setActionMessage("")}>
          <DialogTitle sx={{ py: '4rem', px: '8rem' }}>{actionMessage}</DialogTitle>
          <FormControl sx={{ width: '12rem', mb: '3em'}}>
            <InputLabel id='time-select'>TIEMPO</InputLabel>
            <Select>
              <MenuItem value='1hora'>1 Hora</MenuItem>
              <MenuItem value='5horas'>5 Horas</MenuItem>
              <MenuItem value='24horas'>24 Horas</MenuItem>
            </Select>
          </FormControl>
          <Button sx={{ width: '8rem', mb: '3rem', display: 'flex', justifyContent: 'center'}} onClick={() => handleActionConfirm('suspender')}>
            Suspender
          </Button>
        </Dialog>
        </Box>
        : 
        <Box component='div' >
        <Dialog open={Boolean(actionMessage)} onClose={() => setActionMessage("")}>
          <DialogTitle sx={{ p: '6rem' }}>{actionMessage}</DialogTitle>
          <Button sx={{ width: '8rem', mb: '3rem', display: 'flex', justifyContent: 'center'}} onClick={() => handleActionConfirm('bannear')}>
            BANNEAR
          </Button>
        </Dialog>
        </Box>
      }

      </Box>
    </Box>
  )
}

export default TableHeader


/* 
      

      <Dialog open={Boolean(actionMessage)} onClose={() => setActionMessage("")}>
        <DialogTitle>{actionMessage}</DialogTitle>
        <DialogActions>
          <Button onClick={() => handleActionConfirm()}></Button>
          </DialogActions>
          </Dialog>
    
    

*/
