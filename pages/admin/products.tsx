import { CategoryOutlined } from '@mui/icons-material'
import { Grid } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { AdminLayout } from 'components/layouts'
import { IProduct } from 'interfaces'
import useSWR from 'swr'

const columns: GridColDef[] = [
  { field: 'img', headerName: 'Image' },
  { field: 'title', headerName: 'Title', width: 250 },
  { field: 'gender', headerName: 'Gender' },
  { field: 'type', headerName: 'Type' },
  { field: 'inStock', headerName: 'In Stock' },
  { field: 'price', headerName: 'Price' },
  { field: 'sizes', headerName: 'Sizes' },
]

const ProductsPage = () => {
  const { data, error } = useSWR<IProduct[]>('/api/admin/products')

  if (!data && !error) return <></>

  const rows = data!.map((product) => ({
    id: product._id,
    img: product.images[0],
    title: product.title,
    gender: product.gender,
    type: product.type,
    inStock: product.inStock,
    price: product.price,
    sizes: product.sizes,
  }))
  return (
    <AdminLayout title={`Products (${data?.length})`} subTitle='Maintenance of products' icon={<CategoryOutlined />}>
      <Grid container className='fadeIn'>
        <Grid item xs={12} sx={{ height: 650, width: '100%' }}>
          <DataGrid rows={rows} columns={columns} pageSize={10} rowsPerPageOptions={[10]}></DataGrid>
        </Grid>
      </Grid>
    </AdminLayout>
  )
}

export default ProductsPage
