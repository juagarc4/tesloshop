import { useState } from 'react'
import { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { getSession } from 'next-auth/react'

import { Typography, Grid, CardContent, Divider, Card, Box, Link, Chip, CircularProgress } from '@mui/material'
import { CreditCardOffOutlined, CreditScoreOutlined } from '@mui/icons-material'
import { PayPalButtons } from '@paypal/react-paypal-js'

import { ShopLayout } from 'components/layouts'
import { CartList, OrderSummary } from 'components/cart'
import { dbOrders } from 'database'
import { IOrder } from 'interfaces'
import { tesloApi } from 'api'

interface Props {
  order: IOrder
}

interface OrderResponseBody {
  id: string
  status: 'COMPLETED' | 'SAVED' | 'APPROVED' | 'VOIDED' | 'COMPLETED' | 'PAYER_ACTION_REQUIRED'
}
const OrderPage: NextPage<Props> = ({ order }) => {
  const router = useRouter()
  const { shippingAddress } = order
  const [isPaying, setIsPaying] = useState(false)

  const onOrderCompleted = async (details: OrderResponseBody) => {
    if (details.status !== 'COMPLETED') {
      return alert('There is no payment on PayPal')
    }

    setIsPaying(true)

    try {
      const { data } = await tesloApi.post('/orders/pay', {
        transactionId: details.id,
        orderId: order._id,
      })
      router.reload()
    } catch (error) {
      setIsPaying(false)
      console.log(error)
      alert('Error')
    }
  }

  return (
    <ShopLayout title='Order Summary' pageDescription='Order summary'>
      <Typography variant='h1' component='h1'>
        Order: {order._id}
      </Typography>
      {order.isPaid ? (
        <Chip
          sx={{ my: 2 }}
          label='Order already paid'
          variant='outlined'
          color='success'
          icon={<CreditScoreOutlined />}
        />
      ) : (
        <Chip
          sx={{ my: 2 }}
          label='Payment pending'
          variant='outlined'
          color='error'
          icon={<CreditCardOffOutlined />}
        />
      )}

      <Grid container className='fadeIn'>
        <Grid item xs={12} sm={7}>
          <CartList products={order.orderItems} />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card className='summary-card'>
            <CardContent>
              <Typography variant='h2'>
                Summary ({order.numberOfItems} Product{order.numberOfItems === 1 ? '' : 's'})
              </Typography>
              <Divider sx={{ my: 1 }} />
              <Box display='flex' justifyContent='space-between'>
                <Typography variant='subtitle1'>Delivery Adress</Typography>
              </Box>
              <Typography>
                {shippingAddress.firstName} {shippingAddress.lastName}
              </Typography>
              <Typography>{shippingAddress.address}</Typography>
              {shippingAddress.address2 && <Typography>{shippingAddress.address}</Typography>}
              <Typography>
                {shippingAddress.postalCode} {shippingAddress.city}
              </Typography>
              <Typography>{shippingAddress.country}</Typography>
              <Typography>{shippingAddress.phone}</Typography>
              <Divider sx={{ my: 1 }} />
              <OrderSummary order={order} />
              <Box sx={{ mt: 3 }} display='flex' flexDirection='column'>
                {isPaying ? (
                  <Box className='fadeIn' display='flex' justifyContent='center'>
                    <CircularProgress />
                  </Box>
                ) : (
                  <Box className='fadeIn' display='flex' flex={1} flexDirection='column' justifyContent='center'>
                    {order.isPaid ? (
                      <Chip
                        sx={{ my: 2 }}
                        label='Order already paid'
                        variant='outlined'
                        color='success'
                        icon={<CreditScoreOutlined />}
                      />
                    ) : (
                      <PayPalButtons
                        createOrder={(data, actions) => {
                          return actions.order.create({
                            purchase_units: [
                              {
                                amount: {
                                  value: order.total.toString(),
                                },
                              },
                            ],
                          })
                        }}
                        onApprove={(data, actions) => {
                          return actions.order!.capture().then((details) => {
                            onOrderCompleted(details)
                          })
                        }}
                      />
                    )}
                  </Box>
                )}
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
