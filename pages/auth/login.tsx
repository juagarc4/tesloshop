import { useState, useEffect } from 'react'
import { GetServerSideProps } from 'next'

import { signIn, getSession, getProviders } from 'next-auth/react'
import { useRouter } from 'next/router'
import NextLink from 'next/link'

import { Box, Grid, TextField, Typography, Button, Link, Chip, Divider } from '@mui/material'
import { ErrorOutline } from '@mui/icons-material'
import { useForm } from 'react-hook-form'

import { AuthLayout } from 'components/layouts'
import { validations } from 'utils'

type FormData = {
  email: string
  password: string
}
const LoginPage = () => {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()

  const [showError, setShowError] = useState<Boolean>(false)

  const [providers, setProviders] = useState<any>({})

  useEffect(() => {
    getProviders().then((prov) => {
      setProviders(prov)
    })
  }, [])

  const onLoginUser = async ({ email, password }: FormData) => {
    setShowError(false)
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

            <Grid item xs={12} display='flex' justifyContent='end' flexDirection='column'>
              <Divider sx={{ width: '100%', mb: 2 }} />
              {Object.values(providers)
                .filter((provider: any) => provider.id !== 'credentials')
                .map((provider: any) => {
                  return (
                    <Button
                      key={provider.id}
                      variant='outlined'
                      fullWidth
                      color='primary'
                      sx={{ mb: 1 }}
                      onClick={() => signIn(provider.id)}
                    >
                      {provider.name}
                    </Button>
                  )
                })}
            </Grid>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
  const session = await getSession({ req })
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
