// ** MUI Imports
import Box from '@mui/material/Box'
import { makeStyles } from '@mui/styles'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog';
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Select, { SelectChangeEvent } from '@mui/material/Select'
import StatusButtons from 'src/views/components/adminButtons/StatusButtons'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

const useStyles = makeStyles(() => ({
  formControl: {
    width: '12rem', 
    position: 'absolute', 
    top: '10rem', 
    left: '33%'
  },
  buttons: {
    width: '12rem', 
    height: '4rem', 
    mb: '3rem', 
    backgroundColor: 'rgba(1, 0, 50, 1)',
    boxShadow: '4px 4px 25px 0px rgba(0, 0, 0, 0.70)'
  }
}))

interface TableHeaderProps {
  plan: string
  value: string
  redactar: string
  actionMessage: string
  selectedUsers: string[]
  setActionMessage: (e: string) => void
  handleActionConfirm:(val: string) => void
  handleFilter: (val: string) => void
  handlePlanChange: (e: SelectChangeEvent) => void
  handleActionButtonClick: (e: string) => void
  secondDialogOpen: boolean
  confirmationMessage: string
  setSecondDialogOpen: (e: boolean) => void
}

const TableHeader = (props: TableHeaderProps) => {
  // ** Props
  const { value, redactar, plan, actionMessage, selectedUsers, setActionMessage, handlePlanChange, handleFilter, handleActionButtonClick, handleActionConfirm, secondDialogOpen, confirmationMessage, setSecondDialogOpen } = props

  const classes = useStyles()
  const handleSecondDialogClose = () => setSecondDialogOpen(false)

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
        <Button data-action='reactivar' 
          onClick={() => handleActionButtonClick('reactivar')} 
          color='success' 
          variant='outlined' 
          sx={{ mx: 3, height: '50px' }}>
            Reactivar
        </Button>
        <Button data-action='suspender' 
          onClick={() => handleActionButtonClick('suspender')} 
          color='warning' 
          variant='outlined' 
          sx={{ mx: 3, height: '50px' }}>
            Suspender
        </Button>
        <StatusButtons
          data-action='banear'
          label='banear'
          onClick={() => handleActionButtonClick('banear')}
          color='error'
          variant='outlined'
        />
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
        <Dialog open={Boolean(actionMessage)} 
        onClose={() => setActionMessage("")}
        sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 650 } }}
        >
          <DialogTitle 
            sx={{
              textAlign: 'center',
              fontSize: '1.5rem !important',
              px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
              pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
            }}>
            {actionMessage}
          </DialogTitle>

          <DialogContent
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: ['wrap', 'nowrap'],
              pt: theme => `${theme.spacing(2)} !important`,
              pb: theme => `${theme.spacing(8)} !important`,
              px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`]
            }}>
            <FormControl fullWidth size='small' sx={{ mr: [0, 3], mb: [3, 0] }}>
              <InputLabel id='time-select'>TIEMPO</InputLabel>
              <Select>
                <MenuItem value='1hora'>1 Hora</MenuItem>
                <MenuItem value='5horas'>5 Horas</MenuItem>
                <MenuItem value='24horas'>24 Horas</MenuItem>
              </Select>
            </FormControl>
            <Button sx={{ minWidth: ['100%', 0] }}
             onClick={() => handleActionConfirm('suspender')}>
              Suspender
            </Button>
          </DialogContent>
        </Dialog>
        </Box>

        : 

        <Box component='div' >
        <Dialog 
          open={Boolean(actionMessage)} 
          onClose={() => setActionMessage("")}
          sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 612/* , height: 350 */ } }}>
        
        <DialogContent
          sx={{
            pb: theme => `${theme.spacing(6)} !important`,
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}>
            <Box
              sx={{
                display: 'flex',
                textAlign: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                justifyContent: 'center',
                /* mt: '6em', */
                '& svg': { mb: 6, color: 'warning.main' }
              }}>
              <Icon icon='mdi:alert-circle-outline' fontSize='5.5rem' />
              <Typography>{actionMessage}</Typography>
            </Box>
        </DialogContent>
        
        <DialogActions
          sx={{
            justifyContent: 'center',
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}>
          <Button className={classes.buttons} sx={{ mr: 2 }} onClick={() => handleActionConfirm('bannear')}>
            BANNEAR
          </Button>
          </DialogActions>
        </Dialog>

        <Dialog
            fullWidth
            open={secondDialogOpen}
            onClose={handleSecondDialogClose}
            sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 512 } }}
          >
          <DialogContent
            sx={{
              pb: theme => `${theme.spacing(6)} !important`,
              px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
              pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
            }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
              '& svg': {
                mb: 8,
                color: 'success.main'
              }
            }}
          >
            <Icon
              fontSize='5.5rem'
              icon='mdi:check-circle-outline'
            />
            <Typography>
              {confirmationMessage}
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: 'center',
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <Button variant='contained' color='success' onClick={handleSecondDialogClose}>
            OK
          </Button>
        </DialogActions>
      </Dialog>

        </Box>
      }

      </Box>
    </Box>
  )
}

export default TableHeader
