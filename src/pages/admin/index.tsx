// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

// ** Custom Components Imports
import PageHeader from 'src/@core/components/page-header'

// ** Demo Components Imports
import Table from 'src/views/apps/roles/Table'
import RoleCards from 'src/views/apps/roles/RoleCards'

const RolesComponent = () => {
  return (
    <Grid container spacing={6}>
      <Grid item md={12} sx={{mt: 4}}>
      <PageHeader
        title={<Typography variant='h5'>Lista de Roles</Typography>}
      />
      <Box component='div'
      sx={{ backgroundColor: 'background.paper', p: 4, boxShadow: '4px 4px 4px 0px rgba(255, 255, 255, 0.50)', borderRadius: '14px', mt: 5 }}>
        <Grid item xs={12} sx={{ mb: 5 }}>
          <RoleCards />
        </Grid>
      </Box>
      </Grid>

      <PageHeader
        title={<Typography variant='h5'>Lista de Usuarios</Typography>}
      />
      <Grid item xs={12}>
        <Table />
      </Grid>
    </Grid>
  )
}

export default RolesComponent
