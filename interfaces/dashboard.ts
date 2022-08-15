export interface DashboardSummaryResponse {
  numberOfOrders: number
  paidOrders: number
  pendingOrders: number
  numberOfClients: number
  numberOfProducts: number
  productsOutOfStock: number
  lowStock: number
}
