// ** MUI Imports
import Button from '@mui/material/Button'

const StatusButtons = ({ label, onClick, color, variant }) => {
  return (
    <Button
    data-action={label}
    onClick={onClick}
    color={color}
    variant={variant}
    sx={{ /* mx: 3, */ height: '50px' }}
    >
      {label}
    </Button>
  )
}

export default StatusButtons;
