import NextLink from 'next/link'
import { Box, Grid, TextField, Typography, Button, Link } from '@mui/material'
import { useForm } from 'react-hook-form'
import { AuthLayout } from 'components/layouts'

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

  const onLoginUser = (data: FormData) => {
    console.log(data)
  }
  return (
    <AuthLayout title='Sign in page'>
      <form onSubmit={handleSubmit(onLoginUser)}>
        <Box sx={{ width: 350, padding: '10px 20px' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant='h1' component='h1'>
                Sign in to Teslo
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField label='Email Address' type='email' variant='filled' fullWidth {...register('email')} />
            </Grid>
            <Grid item xs={12}>
              <TextField label='Password' type='password' variant='filled' fullWidth {...register('password')} />
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
