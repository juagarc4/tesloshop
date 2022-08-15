import { useState, useEffect } from 'react'
import useSWR from 'swr'
import { Grid, Typography } from '@mui/material'
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
import { DashboardSummaryResponse } from 'interfaces'
import { AdminLayout } from 'components/layouts'
import { SummaryTile } from 'components/admin'

const DashboardPage = () => {
  const { data, error } = useSWR<DashboardSummaryResponse>('/api/admin/dashboard', {
    refreshInterval: 30 * 1000,
  })

  const [refreshIn, setRefreshIn] = useState(30)
  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshIn((refreshIn) => (refreshIn > 0 ? refreshIn - 1 : 30))
    }, 1000)
    return () => {
      clearInterval(interval)
    }
  }, [])

  if (!error && !data) {
    return <></>
  }

  if (error) {
    console.log(error)
    return <Typography>Error loading the information</Typography>
  }
  const { numberOfOrders, paidOrders, pendingOrders, numberOfClients, numberOfProducts, productsOutOfStock, lowStock } =
    data!
  return (
    <AdminLayout title='Dashboard' subTitle='General statistics' icon={<DashboardOutlined />}>
      <Grid container spacing={2}>
        <SummaryTile
          title={numberOfOrders}
          subTitle='Total orders'
          icon={<CreditCardOffOutlined color='secondary' sx={{ fontSize: 40 }} />}
        />
        <SummaryTile
          title={paidOrders}
          subTitle='Paid orders'
          icon={<AttachMoneyOutlined color='success' sx={{ fontSize: 40 }} />}
        />
        <SummaryTile
          title={pendingOrders}
          subTitle='Pending orders'
          icon={<CreditCardOffOutlined color='error' sx={{ fontSize: 40 }} />}
        />
        <SummaryTile
          title={numberOfClients}
          subTitle='Clients'
          icon={<GroupOutlined color='primary' sx={{ fontSize: 40 }} />}
        />
        <SummaryTile
          title={numberOfProducts}
          subTitle='Products'
          icon={<CategoryOutlined color='warning' sx={{ fontSize: 40 }} />}
        />
        <SummaryTile
          title={productsOutOfStock}
          subTitle='Out of stock'
          icon={<CancelPresentationOutlined color='error' sx={{ fontSize: 40 }} />}
        />
        <SummaryTile
          title={lowStock}
          subTitle='Low stock'
          icon={<ProductionQuantityLimitsOutlined color='warning' sx={{ fontSize: 40 }} />}
        />
        <SummaryTile
          title={refreshIn}
          subTitle='Update in:'
          icon={<AccessTimeOutlined color='secondary' sx={{ fontSize: 40 }} />}
        />
      </Grid>
    </AdminLayout>
  )
}

export default DashboardPage
