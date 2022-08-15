import { db } from 'database'
import { Order, User, Product } from 'models'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data =
  | {
      numberOfOrders: number
      paidOrders: number //isPaid: true
      notPaidOrders: number
      numberOfClients: number // role: client
      numberOfProducts: number
      productsOutOfStock: number //inStock = 0
      lowStock: number //inStock <= 10
    }
  | { message: string }

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'GET':
      return getStatistics(req, res)

    default:
      return res.status(400).json({ message: 'Bad request' })
  }
}

const getStatistics = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await db.connect()
  const [numberOfOrders, paidOrders, numberOfClients, numberOfProducts, productsOutOfStock, lowStock] =
    await Promise.all([
      Order.count(),
      Order.find({ isPaid: true }).count(),
      User.find({ role: 'client' }).count(),
      Product.count(),
      Product.find({ inStock: 0 }).count(),
      Product.find({ inStock: { $lte: 10 } }).count(),
    ])
  await db.disconnect()

  res.status(400).json({
    numberOfOrders,
    paidOrders,
    notPaidOrders: numberOfOrders - paidOrders,
    numberOfClients,
    numberOfProducts,
    productsOutOfStock,
    lowStock,
  })
}
