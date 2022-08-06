import { useState, useContext } from 'react'
import { GetServerSideProps } from 'next'

import { signIn, getSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import NextLink from 'next/link'

import { Box, Grid, TextField, Typography, Button, Link, Chip } from '@mui/material'
import { ErrorOutline } from '@mui/icons-material'
import { useForm } from 'react-hook-form'

import { AuthContext } from 'context'
import { AuthLayout } from 'components/layouts'
import { validations } from 'utils'

type FormData = {
  email: string
  password: string
}
const LoginPage = () => {
  const router = useRouter()
  const { loginUser } = useContext(AuthContext)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()

  const [showError, setShowError] = useState<Boolean>(false)

  const onLoginUser = async ({ email, password }: FormData) => {
    setShowError(false)

    // Without NextAuth
    // const isValidLogin = await loginUser(email, password)

    // if (!isValidLogin) {
    //   setShowError(true)
    //   setTimeout(() => setShowError(false), 3000)
    //   return
    // }
    // const dest = router.query.p?.toString() || '/'
    // router.replace(dest)
    await signIn('credentials', { email, password })
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
              <NextLink
                href={router.query.p ? `/auth/register?p=${router.query.p?.toString()}` : '/auth/register'}
                passHref
              >
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

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
  const session = await getSession({ req })
  console.log(session)
  const { p = '/' } = query

  if (session) {
    return {
      redirect: {
        destination: p.toString(),
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}

export default LoginPage
