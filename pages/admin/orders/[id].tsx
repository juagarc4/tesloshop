import { GetServerSideProps, NextPage } from 'next'

import { Typography, Grid, CardContent, Divider, Card, Box, Chip } from '@mui/material'
import { AirplaneTicketOutlined, CreditCardOffOutlined, CreditScoreOutlined } from '@mui/icons-material'

import { dbOrders } from 'database'
import { IOrder } from 'interfaces'
import { AdminLayout } from 'components/layouts'
import { CartList, OrderSummary } from 'components/cart'

interface Props {
  order: IOrder
}

const OrderPage: NextPage<Props> = ({ order }) => {
  const { shippingAddress } = order

  return (
    <AdminLayout title='Order Summary' subTitle={`Order Id: ${order._id}`} icon={<AirplaneTicketOutlined />}>
      {order.isPaid ? (
        <Chip
          sx={{ my: 2 }}
          label='Order already paid'
          variant='outlined'
          color='success'
          icon={<CreditScoreOutlined />}
          className='fadeIn'
        />
      ) : (
        <Chip
          sx={{ my: 2 }}
          label='Payment pending'
          variant='outlined'
          color='error'
          icon={<CreditCardOffOutlined />}
          className='fadeIn'
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
              <Box className='fadeIn' display='flex' flex={1} flexDirection='column' justifyContent='center'>
                {order.isPaid ? (
                  <Chip
                    sx={{ my: 2 }}
                    label='Order already paid'
                    variant='outlined'
                    color='success'
                    icon={<CreditScoreOutlined />}
                    className='fadeIn'
                  />
                ) : (
                  <Chip
                    sx={{ my: 2 }}
                    label='Payment pending'
                    variant='outlined'
                    color='error'
                    icon={<CreditCardOffOutlined />}
                    className='fadeIn'
                  />
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </AdminLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
  const { id = '' } = query
  const order = await dbOrders.getOrderById(id.toString())

  if (!order) {
    return {
      redirect: {
        destination: '/admin/orders',
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
