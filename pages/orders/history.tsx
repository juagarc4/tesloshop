import { GetServerSideProps, NextPage } from 'next'
import NextLink from 'next/link'
import { Chip, Grid, Link, Typography } from '@mui/material'
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import { ShopLayout } from 'components/layouts'
import { getSession } from 'next-auth/react'
import { dbOrders } from 'database'
import { IOrder } from 'interfaces'

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'fullname', headerName: 'Full name', width: 200 },
  {
    field: 'paid',
    headerName: 'Paid',
    width: 200,
    renderCell: (params: GridRenderCellParams) => {
      return params.row.paid ? (
        <Chip color='success' label='Paid' variant='outlined' />
      ) : (
        <Chip color='error' label='Not Paid' variant='outlined' />
      )
    },
  },
  {
    field: 'link',
    headerName: 'Order',
    width: 200,
    sortable: false,
    renderCell: (params: GridRenderCellParams) => {
      return (
        <NextLink href={`/orders/${params.row.orderId}`} passHref>
          <Link underline='always'>{params.row.link}</Link>
        </NextLink>
      )
    },
  },
]

// const rows = [
//   { id: 1, fullname: 'Raul Garcia', paid: true, link: 'View Order' },
//   { id: 2, fullname: 'Maria Garcia', paid: true, link: 'View Order' },
//   { id: 3, fullname: 'Sonia Garcia', paid: false, link: 'View Order' },
//   { id: 4, fullname: 'Pedro Garcia', paid: false, link: 'View Order' },
//   { id: 5, fullname: 'Antonio Garcia', paid: true, link: 'View Order' },
//   { id: 6, fullname: 'Roberto Garcia', paid: false, link: 'View Order' },
//   { id: 7, fullname: 'Paul Garcia', paid: true, link: 'View Order' },
// ]

interface Props {
  orders: IOrder[]
}
const HistoryPage: NextPage<Props> = ({ orders }) => {
  const rows = orders.map((order, index) => ({
    id: index + 1,
    fullname: `${order.shippingAddress.firstName} ${order.shippingAddress.lastName}`,
    paid: order.isPaid,
    link: 'View Order',
    orderId: order._id,
  }))
  return (
    <ShopLayout title='Orders history' pageDescription='Page with history orders of the customer'>
      <Typography variant='h1' component='h1'>
        <Grid container className='fadeIn'>
          <Grid item xs={12} sx={{ height: 650, width: '100%' }}>
            <DataGrid rows={rows} columns={columns} pageSize={10} rowsPerPageOptions={[10]}></DataGrid>
          </Grid>
        </Grid>
      </Typography>
    </ShopLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session: any = await getSession({ req })

  if (!session) {
    return {
      redirect: {
        destination: `/auth/login?p=/orders/history`,
        permanent: false,
      },
    }
  }
  const orders = await dbOrders.getOrdersByUser(session.user._id)
  return {
    props: {
      orders,
    },
  }
}
export default HistoryPage
