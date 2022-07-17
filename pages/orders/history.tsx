import NextLink from 'next/link'
import { Chip, Grid, Link, Typography } from '@mui/material'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid'
import { ShopLayout } from 'components/layouts'

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'fullname', headerName: 'Full name', width: 200 },
  {
    field: 'paid',
    headerName: 'Paid',
    width: 200,
    renderCell: (params: GridValueGetterParams) => {
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
    renderCell: (params: GridValueGetterParams) => {
      return (
        <NextLink href={`/order/${params.row.id}`} passHref>
          <Link underline='always'>{params.row.link}</Link>
        </NextLink>
      )
    },
  },
]

const rows = [
  { id: 1, fullname: 'Raul Garcia', paid: true, link: 'View Order' },
  { id: 2, fullname: 'Maria Garcia', paid: true, link: 'View Order' },
  { id: 3, fullname: 'Sonia Garcia', paid: false, link: 'View Order' },
  { id: 4, fullname: 'Pedro Garcia', paid: false, link: 'View Order' },
  { id: 5, fullname: 'Antonio Garcia', paid: true, link: 'View Order' },
  { id: 6, fullname: 'Roberto Garcia', paid: false, link: 'View Order' },
  { id: 7, fullname: 'Paul Garcia', paid: true, link: 'View Order' },
]

const HistoryPage = () => {
  return (
    <ShopLayout title='Orders history' pageDescription='Page with history orders of the customer'>
      <Typography variant='h1' component='h1'>
        <Grid container>
          <Grid item xs={12} sx={{ height: 650, width: '100%' }}>
            <DataGrid rows={rows} columns={columns} pageSize={10} rowsPerPageOptions={[10]}></DataGrid>
          </Grid>
        </Grid>
      </Typography>
    </ShopLayout>
  )
}

export default HistoryPage
