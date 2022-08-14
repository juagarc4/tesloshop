import React from 'react'
import { AdminLayout } from 'components/layouts'
import { DashboardOutlined } from '@mui/icons-material'

const DashboardPage = () => {
  return (
    <AdminLayout title='Dashboard' subTitle='General statistics' icon={<DashboardOutlined />}>
      <h3>Hello world</h3>
    </AdminLayout>
  )
}

export default DashboardPage
