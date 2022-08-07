import { useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { Typography, Grid, TextField, FormControl, MenuItem, Select, Button, Box, FormHelperText } from '@mui/material'
import Cookies from 'js-cookie'
import { CartContext } from 'context'
import { IAddress } from 'interfaces'
import { countries } from 'utils'
import { ShopLayout } from 'components/layouts'

type FormData = IAddress

const getAddressFromCookies = (): FormData => {
  return {
    firstName: Cookies.get('firstName') || '',
    lastName: Cookies.get('lastName') || '',
    address: Cookies.get('address') || '',
    address2: Cookies.get('address2') || '',
    postalCode: Cookies.get('postalCode') || '',
    city: Cookies.get('city') || '',
    country: Cookies.get('country') || '',
    phone: Cookies.get('phone') || '',
  }
}

const AddressPage = () => {
  const router = useRouter()
  const { updateAddress } = useContext(CartContext)
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    defaultValues: {
      firstName: '',
      lastName: '',
      address: '',
      address2: '',
      postalCode: '',
      city: '',
      country: countries[0].code,
      phone: '',
    },
  })

  useEffect(() => {
    reset(getAddressFromCookies())
  }, [reset])

  const onSubmitAddressForm = (data: FormData) => {
    updateAddress(data)
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
              label='Postal Code'
              variant='filled'
              fullWidth
              {...register('postalCode', {
                required: 'This field is required.',
              })}
              error={!!errors.postalCode}
              helperText={errors.postalCode?.message}
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
            {/* <FormControl fullWidth> */}
            <TextField
              // select
              // defaultValue={Cookies.get('country') || countries[0].code}
              fullWidth
              label='Country'
              variant='filled'
              {...register('country', {
                required: 'This field is required.',
              })}
              error={!!errors.country}
              helperText={errors.country?.message}
            >
              {/* {
                    countries.map( country => (
                        <MenuItem
                            key={ country.code }
                            value={ country.code }
                        >
                          { country.name }
                        </MenuItem>
                     ))
                  }
              */}
            </TextField>
            {/* </FormControl> */}
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
