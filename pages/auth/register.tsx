import { useState } from 'react'
import NextLink from 'next/link'
import { Box, Grid, TextField, Typography, Button, Link, Chip } from '@mui/material'
import { ErrorOutline } from '@mui/icons-material'
import { useForm } from 'react-hook-form'
import { AuthLayout } from 'components/layouts'
import { validations } from 'utils'
import { tesloApi } from 'api'

type FormData = {
  name: string
  email: string
  password: string
}
const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()

  const [showError, setShowError] = useState<Boolean>(false)

  const onRegisterForm = async ({ name, email, password }: FormData) => {
    setShowError(false)
    try {
      const { data } = await tesloApi.post('/user/register', { name, email, password })
      const { token, user } = data
      console.log({ token, user })
    } catch (error) {
      console.log('Register failed', error)
      setShowError(true)
      setTimeout(() => setShowError(false), 3000)
    }
    // TODO: Return user to previous page after login
  }
  return (
    <AuthLayout title='Register page'>
      <form onSubmit={handleSubmit(onRegisterForm)} noValidate>
        <Box sx={{ width: 350, padding: '10px 20px' }}>
          <Grid container spacing={2}>
            <Grid item xs={12} display='flex' justifyContent='end'>
              <NextLink href='/auth/login' passHref>
                <Link sx={{ mx: 0.3 }} underline='always' variant='subtitle2'>
                  I already have an account
                </Link>
              </NextLink>
            </Grid>
            <Grid item xs={12}>
              <Typography variant='h1' component='h1'>
                Register to Teslo
              </Typography>
              <Chip
                label='Register failed'
                color='error'
                icon={<ErrorOutline />}
                className='fadeIn'
                sx={{ mt: 1, display: showError ? 'flex' : 'none' }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label='Full name'
                variant='filled'
                fullWidth
                {...register('name', {
                  required: 'This field is required.',
                  minLength: { value: 2, message: 'Name must have at least 2 chars.' },
                })}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type='email'
                label='Email Address'
                variant='filled'
                fullWidth
                {...register('email', {
                  required: 'This field is required.',
                  validate: validations.isEmail,
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label='Password'
                type='password'
                variant='filled'
                fullWidth
                {...register('password', {
                  required: 'This field is required.',
                  minLength: { value: 6, message: 'Password must have at least 6 chars.' },
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type='submit' color='secondary' className='circular-btn' size='large' fullWidth>
                Register
              </Button>
            </Grid>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  )
}

export default RegisterPage
