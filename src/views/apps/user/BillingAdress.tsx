// ** React Imports
import { useState, ChangeEvent } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Alert from '@mui/material/Alert'
import Table from '@mui/material/Table'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import Select from '@mui/material/Select'
import Switch from '@mui/material/Switch'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import TableRow from '@mui/material/TableRow'
import { styled } from '@mui/material/styles'
import TableCell from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import AlertTitle from '@mui/material/AlertTitle'
import InputLabel from '@mui/material/InputLabel'
import CardContent from '@mui/material/CardContent'
import DialogTitle from '@mui/material/DialogTitle'
import FormControl from '@mui/material/FormControl'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import LinearProgress from '@mui/material/LinearProgress'
import TableContainer from '@mui/material/TableContainer'
import FormControlLabel from '@mui/material/FormControlLabel'
import DialogContentText from '@mui/material/DialogContentText'

const BillingAdress = () => {
  // ** States
const [openAddressCard, setOpenAddressCard] = useState<boolean>(false)
const [openUpgradePlans, setOpenUpgradePlans] = useState<boolean>(false)
const [subscriptionDialogOpen, setSubscriptionDialogOpen] = useState<boolean>(false)

  return (
<Grid item xs={12}>
  <Card>
    <CardHeader
      title='Billing Address'
/*       action={
        <Button variant='contained' onClick={() => setOpenAddressCard(true)}>
          Edit Address
        </Button>
      } */
    />
    <CardContent>
      <Grid container spacing={6}>
        <Grid item xs={12} lg={6}>
          <TableContainer>
            <Table size='small' sx={{ width: '95%' }}>
              <TableBody
                sx={{
                  '& .MuiTableCell-root': {
                      border: 0,
                      pt: 2,
                      pb: 2,
                      pl: '0 !important',
                      pr: '0 !important',
                      '&:first-of-type': {
                        width: 148
                      }
                    }
                    }}
                >
              <TableRow>
                <TableCell>
                  <Typography
                    sx={{
                      fontWeight: 500,
                      fontSize: '0.875rem',
                      whiteSpace: 'nowrap',
                      lineHeight: '22px',
                              letterSpacing: '0.1px'
                            }}
                          >
                            Company Name:
                          </Typography>
                        </TableCell>
                        <TableCell>Pixinvent</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Typography
                            sx={{
                              fontWeight: 500,
                              fontSize: '0.875rem',
                              whiteSpace: 'nowrap',
                              lineHeight: '22px',
                              letterSpacing: '0.1px'
                            }}
                          >
                            Billing Email:
                          </Typography>
                        </TableCell>
                        <TableCell>gertrude@gmail.com</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Typography
                            sx={{
                              fontWeight: 500,
                              fontSize: '0.875rem',
                              whiteSpace: 'nowrap',
                              lineHeight: '22px',
                              letterSpacing: '0.1px'
                            }}
                          >
                            Tax ID:
                          </Typography>
                        </TableCell>
                        <TableCell>TAX-875623</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Typography
                            sx={{
                              fontWeight: 500,
                              fontSize: '0.875rem',
                              whiteSpace: 'nowrap',
                              lineHeight: '22px',
                              letterSpacing: '0.1px'
                            }}
                          >
                            VAT Number:
                          </Typography>
                        </TableCell>
                        <TableCell>SDF754K77</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Typography
                            sx={{
                              fontWeight: 500,
                              fontSize: '0.875rem',
                              whiteSpace: 'nowrap',
                              lineHeight: '22px',
                              letterSpacing: '0.1px'
                            }}
                          >
                            Billing Address:
                          </Typography>
                        </TableCell>
                        <TableCell>100 Water Plant Avenue, Building 1303 Wake Island</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>

              <Grid item xs={12} lg={6}>
                <TableContainer>
                  <Table size='small'>
                    <TableBody
                      sx={{
                        '& .MuiTableCell-root': {
                          border: 0,
                          pt: 2,
                          pb: 2,
                          pl: '0 !important',
                          pr: '0 !important',
                          '&:first-of-type': {
                            width: 148
                          }
                        }
                      }}
                    >
                      <TableRow>
                        <TableCell>
                          <Typography
                            sx={{
                              fontWeight: 500,
                              fontSize: '0.875rem',
                              whiteSpace: 'nowrap',
                              lineHeight: '22px',
                              letterSpacing: '0.1px'
                            }}
                          >
                            Contact:
                          </Typography>
                        </TableCell>
                        <TableCell>+1(609) 933-44-22</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Typography
                            sx={{
                              fontWeight: 500,
                              fontSize: '0.875rem',
                              whiteSpace: 'nowrap',
                              lineHeight: '22px',
                              letterSpacing: '0.1px'
                            }}
                          >
                            Country:
                          </Typography>
                        </TableCell>
                        <TableCell>Australia</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Typography
                            sx={{
                              fontWeight: 500,
                              fontSize: '0.875rem',
                              whiteSpace: 'nowrap',
                              lineHeight: '22px',
                              letterSpacing: '0.1px'
                            }}
                          >
                            State:
                          </Typography>
                        </TableCell>
                        <TableCell>Queensland</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Typography
                            sx={{
                              fontWeight: 500,
                              fontSize: '0.875rem',
                              whiteSpace: 'nowrap',
                              lineHeight: '22px',
                              letterSpacing: '0.1px'
                            }}
                          >
                            Zip Code:
                          </Typography>
                        </TableCell>
                        <TableCell>403114</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </Grid>
          </CardContent>

          <Dialog
            open={openAddressCard}
            onClose={() => setOpenAddressCard(false)}
            aria-labelledby='user-address-edit'
            sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 650 } }}
            aria-describedby='user-address-edit-description'
          >
            <DialogTitle
              id='user-address-edit'
              sx={{
                textAlign: 'center',
                fontSize: '1.5rem !important',
                px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
                pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
              }}
            >
              Edit Address
            </DialogTitle>
            <DialogContent
              sx={{
                pb: theme => `${theme.spacing(8)} !important`,
                px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`]
              }}
            >
              <DialogContentText variant='body2' id='user-address-edit-description' sx={{ textAlign: 'center', mb: 7 }}>
                Edit Address for future billing
              </DialogContentText>
              <form>
                <Grid container spacing={6}>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth defaultValue='Pixinvent' label='Company Name' />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth type='email' defaultValue='gertrude@gmail.com' label='Email' />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth defaultValue='TAX-875623' label='Tax ID' />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth defaultValue='SDF754K77' label='VAT Number' />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      multiline
                      minRows={2}
                      label='Billing Address'
                      defaultValue='100 Water Plant Avenue, Building 1303 Wake Island'
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth defaultValue='+1(609) 933-44-22' label='Contact' />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel id='country-select'>Country</InputLabel>
                      <Select labelId='country-select' defaultValue='usa' label='Country'>
                        <MenuItem value='usa'>USA</MenuItem>
                        <MenuItem value='uk'>UK</MenuItem>
                        <MenuItem value='france'>France</MenuItem>
                        <MenuItem value='germany'>Germany</MenuItem>
                        <MenuItem value='japan'>Japan</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth defaultValue='Capholim' label='State' />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth type='number' defaultValue='403114' label='Zip Code' />
                  </Grid>
                </Grid>
              </form>
            </DialogContent>
            <DialogActions
              sx={{
                justifyContent: 'center',
                px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
                pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
              }}
            >
              <Button variant='contained' sx={{ mr: 2 }} onClick={() => setOpenAddressCard(false)}>
                Submit
              </Button>
              <Button variant='outlined' color='secondary' onClick={() => setOpenAddressCard(false)}>
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
        </Card>
      </Grid>
  )
}

export default BillingAdress
