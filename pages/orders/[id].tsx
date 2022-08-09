import { GetServerSideProps, NextPage } from 'next'
import { getSession } from 'next-auth/react'
import NextLink from 'next/link'

import { Typography, Grid, CardContent, Divider, Card, Box, Link, Chip } from '@mui/material'
import { CreditScoreOutlined } from '@mui/icons-material'

import { ShopLayout } from 'components/layouts'
import { CartList, OrderSummary } from 'components/cart'
import { dbOrders } from 'database'
import { IOrder } from 'interfaces'

interface Props {
  order: IOrder
}
const OrderPage: NextPage<Props> = ({ order }) => {
  console.log(order)
  return (
    <ShopLayout title='Order ABC1234 Summary' pageDescription='Order summary'>
      <Typography variant='h1' component='h1'>
        Order: {order._id}
      </Typography>

      {/* <Chip sx={{ my: 2 }} label='Payment pending' variant='outlined' color='error' icon={<CreditCardOffOutlined />} /> */}
      <Chip
        sx={{ my: 2 }}
        label='Order already paid'
        variant='outlined'
        color='success'
        icon={<CreditScoreOutlined />}
      />

      <Grid container>
        <Grid item xs={12} sm={7}>
          <CartList editable={false} />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card className='summary-card'>
            <CardContent>
              <Typography variant='h2'>Summary (3 Products)</Typography>
              <Divider sx={{ my: 1 }} />
              <Box display='flex' justifyContent='space-between'>
                <Typography variant='subtitle1'>Delivery Adress</Typography>
                <NextLink href='/checkout/address' passHref>
                  <Link underline='always'>Edit</Link>
                </NextLink>
              </Box>
              <Typography>Raul Garcia</Typography>
              <Typography>schwannstr. 25</Typography>
              <Typography>40476 Düsseldorf</Typography>
              <Typography>Germany</Typography>
              <Typography>+49 15236215698</Typography>
              <Divider sx={{ my: 1 }} />
              <Box display='flex' justifyContent='end'>
                <NextLink href='/cart' passHref>
                  <Link underline='always'>Edit</Link>
                </NextLink>
              </Box>
              <OrderSummary />
              <Box sx={{ mt: 3 }}>
                {/* TODO */}
                <h1>Pay</h1>
                <Chip
                  sx={{ my: 2 }}
                  label='Order already paid'
                  variant='outlined'
                  color='success'
                  icon={<CreditScoreOutlined />}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
  const { id = '' } = query
  const session: any = await getSession({ req })

  if (!session) {
    return {
      redirect: {
        destination: `/auth/login?p=/orders/${id}`,
        permanent: false,
      },
    }
  }

  const order = await dbOrders.getOrderById(id.toString())

  if (!order) {
    return {
      redirect: {
        destination: '/orders/history',
        permanent: false,
      },
    }
  }

  if (order.user !== session.user._id) {
    return {
      redirect: {
        destination: '/orders/history',
        permanent: false,
      },
    }
  }
  return {
    props: {
      order,
    },
  }
}
export default OrderPage
