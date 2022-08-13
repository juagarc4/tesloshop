import { getSession } from 'next-auth/react'
import { db } from 'database'
import { IOrder } from 'interfaces'
import { Order, Product } from 'models'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data =
  | {
      message: string
    }
  | IOrder

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'POST':
      return createOrder(req, res)
    default:
      return res.status(400).json({ message: 'Bad request' })
  }
}
const createOrder = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { orderItems, total } = req.body as IOrder

  //Verify we have an user
  const session: any = await getSession({ req })

  if (!session) {
    return res.status(401).json({ message: 'You should be authenticated to follow with the process' })
  }

  const productIds = orderItems.map((product) => product._id)

  await db.connect()
  const dbProducts = await Product.find({ _id: { $in: productIds } })
  try {
    const subTotal = orderItems.reduce((prev, current) => {
      const currentPrice = dbProducts.find((prod) => prod.id === current._id)?.price

      if (!currentPrice) {
        throw new Error('Please review your cart. The product does not exist')
      }

      return current.price * current.quantity + prev
    }, 0)
    const tax = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0)
    const totalBackend = subTotal * (tax + 1)
    if (total !== totalBackend) {
      throw new Error('Total does not match with amount')
    }

    // All fine till here
    const userId = session.user._id
    const newOrder = new Order({ ...req.body, isPaid: false, user: userId })
    newOrder.total = Math.round(newOrder.total * 100) / 100
    await newOrder.save()
    await db.disconnect()
    return res.status(201).json(newOrder)
  } catch (error: any) {
    await db.disconnect()
    console.log(error)
    return res.status(201).json({ message: error.message || 'Review server logs' })
  }
}
