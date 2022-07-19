import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from 'database'
import { Product } from 'models'
import { IProduct } from 'interfaces'

type Data = { message: string } | IProduct[]

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'GET':
      return searchProducts(req, res)

    default:
      res.status(400).json({ message: 'Bad request' })
  }
}

const searchProducts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  let { q = '' } = req.query
  if (q.length === 0) {
    return res.status(400).json({ message: 'You should enter a search term' })
  }

  q = q.toString().toLowerCase()
  await db.connect()
  const products = await Product.find({ $text: { $search: q } })
    .select('title images price slug inStock -_id')
    .lean()
  await db.disconnect()
  return res.status(200).json(products)
}
