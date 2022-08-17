import useSWR from 'swr'
import { Grid } from '@mui/material'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid'
import { PeopleOutlined } from '@mui/icons-material'

import { AdminLayout } from 'components/layouts'
import { IUser } from 'interfaces'

const usersPage = () => {
  const { data, error } = useSWR<IUser[]>('/api/admin/users')

  if (!data && !error) return <></>

  const columns: GridColDef[] = [
    { field: 'email', headerName: 'E-Mail', width: 250 },
    { field: 'name', headerName: 'Full name', width: 300 },
    { field: 'role', headerName: 'Role', width: 300 },
  ]

  const rows = data!.map((user) => ({
    id: user._id,
    email: user.email,
    name: user.name,
    role: user.role,
  }))

  return (
    <AdminLayout title='Users' subTitle='Maintenance of users' icon={<PeopleOutlined />}>
      <Grid container className='fadeIn'>
        <Grid item xs={12} sx={{ height: 650, width: '100%' }}>
          <DataGrid rows={rows} columns={columns} pageSize={10} rowsPerPageOptions={[10]}></DataGrid>
        </Grid>
      </Grid>
    </AdminLayout>
  )
}

export default usersPage
