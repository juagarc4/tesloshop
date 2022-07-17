import NextLink from 'next/link'
import { Box, Grid, TextField, Typography, Button, Link } from '@mui/material'
import { AuthLayout } from 'components/layouts'

const LoginPage = () => {
  return (
    <AuthLayout title='Sign in page'>
      <Box sx={{ width: 350, padding: '10px 20px' }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant='h1' component='h1'>
              Sign in to Teslo
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField label='Email Address' variant='filled' fullWidth />
          </Grid>
          <Grid item xs={12}>
            <TextField label='Password' type='password' variant='filled' fullWidth />
          </Grid>
          <Grid item xs={12}>
            <Button color='secondary' className='circular-btn' size='large' fullWidth>
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
    </AuthLayout>
  )
}

export default LoginPage
