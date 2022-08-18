import { ConfirmationNumberOutlined } from '@mui/icons-material'
import { Chip, Grid, Link } from '@mui/material'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid'
import { AdminLayout } from 'components/layouts'
import { IUser } from 'interfaces'
import NextLink from 'next/link'
import useSWR from 'swr'
import { IOrder } from '../../interfaces/order'

const columns: GridColDef[] = [
  { field: 'id', headerName: 'Order ID', width: 250 },
  { field: 'email', headerName: 'E-Mail', width: 250 },
  { field: 'name', headerName: 'Fullname', width: 200 },
  { field: 'total', headerName: 'Amount' },
  {
    field: 'isPaid',
    headerName: 'Paid',
    renderCell: ({ row }: GridValueGetterParams) => {
      return row.isPaid ? (
        <Chip variant='outlined' label='Paid' color='success' />
      ) : (
        <Chip variant='outlined' label='Pending' color='error' />
      )
    },
  },
  { field: 'numItems', headerName: 'Num. Items', align: 'center' },
  {
    field: 'link',
    headerName: 'Order',
    sortable: false,
    renderCell: ({ row }: GridValueGetterParams) => {
      return (
        <NextLink href={`/orders/${row.id}`} passHref>
          <Link target='_blank' underline='always'>
            {row.link}
          </Link>
        </NextLink>
      )
    },
  },
  { field: 'createdAt', headerName: 'Created', width: 200 },
]

const ordersPage = () => {
  const { data, error } = useSWR<IOrder[]>('/api/admin/orders')

  if (!data && !error) return <></>

  const rows = data!.map((order) => ({
    id: order._id,
    email: (order.user as IUser).email,
    name: (order.user as IUser).name,
    total: order.total,
    isPaid: order.isPaid,
    numItems: order.numberOfItems,
    link: 'View Order',
    createdAt: order.createdAt,
  }))
  return (
    <AdminLayout title='Orders' subTitle='Maintenance of orders' icon={<ConfirmationNumberOutlined />}>
      <Grid container className='fadeIn'>
        <Grid item xs={12} sx={{ height: 650, width: '100%' }}>
          <DataGrid rows={rows} columns={columns} pageSize={10} rowsPerPageOptions={[10]}></DataGrid>
        </Grid>
      </Grid>
    </AdminLayout>
  )
}

export default ordersPage
