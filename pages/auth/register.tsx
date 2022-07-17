import NextLink from 'next/link'
import { Box, Grid, TextField, Typography, Button, Link } from '@mui/material'
import { AuthLayout } from 'components/layouts'

const RegisterPage = () => {
  return (
    <AuthLayout title='Register page'>
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
          </Grid>
          <Grid item xs={12}>
            <TextField label='Full name' variant='filled' fullWidth />
          </Grid>
          <Grid item xs={12}>
            <TextField label='Email Address' variant='filled' fullWidth />
          </Grid>
          <Grid item xs={12}>
            <TextField label='Password' type='password' variant='filled' fullWidth />
          </Grid>
          <Grid item xs={12}>
            <Button color='secondary' className='circular-btn' size='large' fullWidth>
              Register
            </Button>
          </Grid>
        </Grid>
      </Box>
    </AuthLayout>
  )
}

export default RegisterPage
