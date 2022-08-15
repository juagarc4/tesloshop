import React from 'react'
import { Grid } from '@mui/material'
import {
  AccessTimeOutlined,
  AttachMoneyOutlined,
  CancelPresentationOutlined,
  CategoryOutlined,
  CreditCardOffOutlined,
  DashboardOutlined,
  GroupOutlined,
  ProductionQuantityLimitsOutlined,
} from '@mui/icons-material'
import { AdminLayout } from 'components/layouts'
import { SummaryTile } from 'components/admin'

const DashboardPage = () => {
  return (
    <AdminLayout title='Dashboard' subTitle='General statistics' icon={<DashboardOutlined />}>
      <Grid container spacing={2}>
        <SummaryTile
          title={1}
          subTitle='Total orders'
          icon={<CreditCardOffOutlined color='secondary' sx={{ fontSize: 40 }} />}
        />
        <SummaryTile
          title={2}
          subTitle='Paid orders'
          icon={<AttachMoneyOutlined color='success' sx={{ fontSize: 40 }} />}
        />
        <SummaryTile
          title={3}
          subTitle='Pending orders'
          icon={<CreditCardOffOutlined color='error' sx={{ fontSize: 40 }} />}
        />
        <SummaryTile title={4} subTitle='Customers' icon={<GroupOutlined color='primary' sx={{ fontSize: 40 }} />} />
        <SummaryTile title={5} subTitle='Products' icon={<CategoryOutlined color='warning' sx={{ fontSize: 40 }} />} />
        <SummaryTile
          title={6}
          subTitle='Out of stock'
          icon={<CancelPresentationOutlined color='error' sx={{ fontSize: 40 }} />}
        />
        <SummaryTile
          title={7}
          subTitle='Stock'
          icon={<ProductionQuantityLimitsOutlined color='warning' sx={{ fontSize: 40 }} />}
        />
        <SummaryTile
          title={8}
          subTitle='Update in:'
          icon={<AccessTimeOutlined color='secondary' sx={{ fontSize: 40 }} />}
        />
      </Grid>
    </AdminLayout>
  )
}

export default DashboardPage
