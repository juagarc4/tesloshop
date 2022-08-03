import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { Typography, Grid, TextField, FormControl, MenuItem, Select, Button, Box, FormHelperText } from '@mui/material'
import { ShopLayout } from 'components/layouts'
import { countries } from 'utils'
import Cookies from 'js-cookie'

type FormData = {
  firstName: string
  lastName: string
  address: string
  address2?: string
  postcode: string
  city: string
  country: string
  phone: string
}
const AddressPage = () => {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      firstName: '',
      lastName: '',
      address: '',
      address2: '',
      postcode: '',
      city: '',
      country: countries[0].code,
      phone: '',
    },
  })

  const onSubmitAddressForm = ({
    firstName,
    lastName,
    address,
    address2,
    postcode,
    city,
    country,
    phone,
  }: FormData) => {
    Cookies.set('firstName', firstName)
    Cookies.set('lastName', lastName)
    Cookies.set('address', address)
    Cookies.set('address2', address2 || '')
    Cookies.set('postcode', postcode)
    Cookies.set('city', city)
    Cookies.set('country', country)
    Cookies.set('phone', phone)
    router.push('/checkout/summary')
  }

  return (
    <ShopLayout title='Address' pageDescription='Confirm delivery adress'>
      <form onSubmit={handleSubmit(onSubmitAddressForm)} noValidate>
        <Typography variant='h1' component='h1'>
          Delivery Address
        </Typography>
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              label='Firstname'
              variant='filled'
              fullWidth
              {...register('firstName', {
                required: 'This field is required.',
                minLength: { value: 2, message: 'First Name must have at least 2 chars.' },
              })}
              error={!!errors.firstName}
              helperText={errors.firstName?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label='Lastname'
              variant='filled'
              fullWidth
              {...register('lastName', {
                required: 'This field is required.',
                minLength: { value: 2, message: 'Last Name must have at least 2 chars.' },
              })}
              error={!!errors.lastName}
              helperText={errors.lastName?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label='Address'
              variant='filled'
              fullWidth
              {...register('address', {
                required: 'This field is required.',
                minLength: { value: 2, message: 'Adress must have at least 2 chars.' },
              })}
              error={!!errors.address}
              helperText={errors.address?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label='Address 2 (optional)' variant='filled' fullWidth {...register('address2')} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label='Postcode'
              variant='filled'
              fullWidth
              {...register('postcode', {
                required: 'This field is required.',
              })}
              error={!!errors.postcode}
              helperText={errors.postcode?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label='City'
              variant='filled'
              fullWidth
              {...register('city', {
                required: 'This field is required.',
              })}
              error={!!errors.city}
              helperText={errors.city?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <TextField
                select
                value={countries[0].code}
                variant='filled'
                label='Country'
                {...register('country', {
                  required: 'This field is required.',
                })}
                error={!!errors.country}
                helperText={errors.country?.message}
              >
                {countries.map((country) => (
                  <MenuItem key={country.code} value={country.code}>
                    {country.name}
                  </MenuItem>
                ))}
              </TextField>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label='Phone'
              variant='filled'
              fullWidth
              {...register('phone', {
                required: 'This field is required.',
              })}
              error={!!errors.phone}
              helperText={errors.phone?.message}
            />
          </Grid>
        </Grid>
        <Box sx={{ mt: 5 }} display='flex' justifyContent='center'>
          <Button type='submit' color='secondary' className='circular-btn' size='large'>
            Review Order
          </Button>
        </Box>
      </form>
    </ShopLayout>
  )
}

export default AddressPage
