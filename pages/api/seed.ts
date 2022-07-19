// IMPORTANT: DO NOT SEND THIS FILE TO ANY SERVER WITH VALUABLE DATA

import type { NextApiRequest, NextApiResponse } from 'next'
import { db, seedData } from 'database'
import { Product } from 'models'

type Data = {
  message: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (process.env.NODE_ENV === 'production') {
    return res.status(401).json({
      message: 'Access to this endpoint forbidden in production',
    })
  }

  await db.connect()
  await Product.deleteMany()
  await Product.insertMany(seedData.products)
  await db.disconnect()

  res.status(200).json({
    message: 'Process executed successfully',
  })
}
