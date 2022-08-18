import { ConfirmationNumberOutlined } from '@mui/icons-material'
import { AdminLayout } from 'components/layouts'
import React from 'react'

const ordersPage = () => {
  return (
    <AdminLayout title='Orders' subTitle='Maintenance of orders' icon={<ConfirmationNumberOutlined />}></AdminLayout>
  )
}

export default ordersPage
