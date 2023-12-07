// ** MUI Imports
import Grid from '@mui/material/Grid'

import CurrentPlan from './CurrentPlan'
import PaymentMethods from './PaymentMethods'
import BillingAdress from './BillingAdress'


const UserViewBilling = () => {
  
  return (
    <Grid container spacing={6}>
      <CurrentPlan />
      <PaymentMethods />
      <BillingAdress />
    </Grid>
  )
}

export default UserViewBilling
