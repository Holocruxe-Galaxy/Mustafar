// ** MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { Button, Checkbox, FormControlLabel } from '@mui/material'
import { styled } from '@mui/system';
import Eliminar from 'src/@core/icons/Eliminar'

const StyledButton = styled(Button)({
  marginTop: '2em',
  position: 'absolute',
  right: '1em',
  bottom: '1em',
  transition: 'background 0.3s ease',
  '&:hover': {
    background: 'linear-gradient(180deg, #00FFED 0%, rgba(248, 54, 244, 0.2) 100%)',
  },
});
const PendingTasks = () => {
  return (
    <Card style={{ width: '502px', height: '476px', boxShadow: '4px 4px 4px 0px #FFFFFF80', paddingLeft: '1em',
     marginTop: 50, marginLeft: 10, position: 'relative'  }}>
      <CardHeader
        title='Tareas pendientes'
        sx={{pt:10}}
      />
      <CardContent style={{ display: 'flex', flexDirection: 'column' }}>
      <FormControlLabel control={<Checkbox defaultChecked />} label="Label" />
      <FormControlLabel control={<Checkbox defaultChecked />} label="Label" />
      <FormControlLabel control={<Checkbox defaultChecked />} label="Label" />
      <FormControlLabel control={<Checkbox defaultChecked />} label="Label" />
      </CardContent>
      <StyledButton variant='contained' startIcon={<Eliminar />}>
      Borrar
    </StyledButton>
    </Card>
  )
}

export default PendingTasks
