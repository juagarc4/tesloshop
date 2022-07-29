import { useState } from 'react'
import NextLink from 'next/link'
import { useForm } from 'react-hook-form'
import { Box, Grid, TextField, Typography, Button, Link, Chip } from '@mui/material'
import { ErrorOutline } from '@mui/icons-material'
import { AuthLayout } from 'components/layouts'
import { validations } from 'utils'
import { tesloApi } from 'api'

type FormData = {
  email: string
  password: string
}
const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()

  const [showError, setShowError] = useState<Boolean>(false)

  const onLoginUser = async ({ email, password }: FormData) => {
    setShowError(false)
    try {
      const { data } = await tesloApi.post('/user/login', { email, password })
      const { token, user } = data
    } catch (error) {
      console.log('Credentials error')
      setShowError(true)
      setTimeout(() => setShowError(false), 3000)
    }
  }
  return (
    <AuthLayout title='Sign in page'>
      <form onSubmit={handleSubmit(onLoginUser)} noValidate>
        <Box sx={{ width: 350, padding: '10px 20px' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant='h1' component='h1'>
                Sign in to Teslo
              </Typography>
              <Chip
                label='User not found'
                color='error'
                icon={<ErrorOutline />}
                className='fadeIn'
                sx={{ mt: 1, display: showError ? 'flex' : 'none' }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label='Email Address'
                type='email'
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
                Sign in
              </Button>
            </Grid>
            <Grid item xs={12} display='flex' justifyContent='end'>
              <NextLink href='/auth/register' passHref>
                <Link sx={{ mx: 0.3 }} underline='always' variant='subtitle2'>
                  New to Teslo?
                </Link>
              </NextLink>
            </Grid>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  )
}

export default LoginPage
