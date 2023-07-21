// ** MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { Box } from '@mui/system'
import Card from '@mui/material/Card'
import { useTheme } from '@mui/material/styles'
import { styled } from '@mui/material/styles'

// ** Hooks
import { useSettings } from 'src/@core/hooks/useSettings'

const Diary = () => {
  const theme = useTheme()
  const { settings } = useSettings()
  const { skin } = settings
  return (
    <> 
      <Grid container direction="column" spacing={2}>
        <Card  
          sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            borderRadius: 2
          }}>
        <Grid item>
          <Card sx={{
            width: '90%',
            height: '50%',
            
            borderRadius: 2
          }}>
          <h1>Se puede poner un h1 aca?</h1>  
          </Card>
          <Card sx={{
              width: '90%',
              height: '50%',
              display: 'flex',
              borderRadius: 2,
              backgroundColor: 'background.paper'
            }}>
              <h1>Se puede </h1>
            </Card>
        </Grid>
        </Card>
      </Grid>
    </>
  )
}

export default Diary
