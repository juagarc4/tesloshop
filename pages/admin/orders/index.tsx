import useSWR from 'swr'
import { ConfirmationNumberOutlined } from '@mui/icons-material'
import { Chip, Grid } from '@mui/material'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid'
import { AdminLayout } from 'components/layouts'
import { IUser, IOrder } from 'interfaces'

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
        <a target='_blank' href={`/admin/orders/${row.id}`}>
          {row.link}
        </a>
      )
    },
  },
  { field: 'createdAt', headerName: 'Created', width: 200 },
]

const OrdersPage = () => {
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

export default OrdersPage
