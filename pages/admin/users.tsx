import { useState, useEffect } from 'react'
import useSWR from 'swr'
import { Grid, MenuItem, Select } from '@mui/material'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid'
import { PeopleOutlined } from '@mui/icons-material'

import { tesloApi } from 'api'
import { AdminLayout } from 'components/layouts'
import { IUser } from 'interfaces'

const UsersPage = () => {
  const { data, error } = useSWR<IUser[]>('/api/admin/users')
  const [users, setUsers] = useState<IUser[]>([])

  useEffect(() => {
    if (data) {
      setUsers(data)
    }
  }, [data])

  if (!data && !error) return <></>

  const onRoleUpdated = async (userId: string, newRole: string) => {
    const previousUsers = users.map((user) => ({ ...user }))
    const updatedUsers = users.map((user) => ({
      ...user,
      role: userId === user._id ? newRole : user.role,
    }))

    setUsers(updatedUsers as IUser[])
    try {
      await tesloApi.put('/admin/users', { userId, role: newRole })
    } catch (error) {
      setUsers(previousUsers)
      alert('Role could not be updated')
    }
  }

  const columns: GridColDef[] = [
    { field: 'email', headerName: 'E-Mail', width: 250 },
    { field: 'name', headerName: 'Full name', width: 300 },
    {
      field: 'role',
      headerName: 'Role',
      width: 300,
      renderCell: ({ row }: GridValueGetterParams) => {
        return (
          <Select
            value={row.role}
            label='Role'
            onChange={({ target }) => onRoleUpdated(row.id, target.value)}
            sx={{ width: '300px' }}
          >
            <MenuItem value='admin'>Admin</MenuItem>
            <MenuItem value='client'>Client</MenuItem>
            <MenuItem value='super-user'>Super User</MenuItem>
            <MenuItem value='SEO'>SEO</MenuItem>
          </Select>
        )
      },
    },
  ]

  const rows = users.map((user) => ({
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

export default UsersPage
