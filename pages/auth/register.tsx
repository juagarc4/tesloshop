import { useState, useContext } from 'react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { Box, Grid, TextField, Typography, Button, Link, Chip } from '@mui/material'
import { ErrorOutline } from '@mui/icons-material'
import { useForm } from 'react-hook-form'
import { AuthContext } from 'context'
import { AuthLayout } from 'components/layouts'
import { validations } from 'utils'
import { tesloApi } from 'api'

type FormData = {
  name: string
  email: string
  password: string
}
const RegisterPage = () => {
  const router = useRouter()
  const { registerUser } = useContext(AuthContext)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()

  const [showError, setShowError] = useState<Boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')

  const onRegisterForm = async ({ name, email, password }: FormData) => {
    setShowError(false)
    const { hasError, message } = await registerUser(name, email, password)
    console.log(hasError, message)
    if (hasError) {
      setShowError(true)
      setErrorMessage(message!)
      setTimeout(() => setShowError(false), 3000)
      return
    }
    const dest = router.query.p?.toString() || '/'
    router.replace(dest)
  }
  return (
    <AuthLayout title='Register page'>
      <form onSubmit={handleSubmit(onRegisterForm)} noValidate>
        <Box sx={{ width: 350, padding: '10px 20px' }}>
          <Grid container spacing={2}>
            <Grid item xs={12} display='flex' justifyContent='end'>
              <NextLink href={router.query.p ? `/auth/login?p=${router.query.p?.toString()}` : '/auth/login'} passHref>
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
