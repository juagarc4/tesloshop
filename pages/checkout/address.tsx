import { GetServerSideProps } from 'next'

import { Typography, Grid, TextField, FormControl, MenuItem, Select, Button, Box } from '@mui/material'
import { ShopLayout } from 'components/layouts'
import { isValidToken } from '../../utils/jwt'
import { jwt } from 'utils'

const AddressPage = () => {
  return (
    <ShopLayout title='Address' pageDescription='Confirm delivery adress'>
      <Typography variant='h1' component='h1'>
        Delivery Address
      </Typography>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={12} sm={6}>
          <TextField label='Firstname' variant='filled' fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label='Lastname' variant='filled' fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label='Address' variant='filled' fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label='Address 2 (optional)' variant='filled' fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label='Postal Code' variant='filled' fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label='City' variant='filled' fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <Select variant='filled' label='country' value={1}>
              <MenuItem value={1}>Spain</MenuItem>
              <MenuItem value={2}>Germany</MenuItem>
              <MenuItem value={3}>UK</MenuItem>
              <MenuItem value={4}>France</MenuItem>
              <MenuItem value={5}>Italy</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label='Phone' variant='filled' fullWidth />
        </Grid>
      </Grid>
      <Box sx={{ mt: 5 }} display='flex' justifyContent='center'>
        <Button color='secondary' className='circular-btn' size='large'>
          Review Order
        </Button>
      </Box>
    </ShopLayout>
  )
}

export default AddressPage
