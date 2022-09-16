import type { NextApiRequest, NextApiResponse } from 'next'
import mongoose from 'mongoose'
import { db } from 'database'
import { Product } from 'models'
import { IProduct } from 'interfaces'

type Data = { message: string } | IProduct

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'GET':
      return getProductBySlug(req, res)
    default:
      return res.status(400).json({ message: `Method ${req.method} does not exist or is not implemented` })
  }
}
const getProductBySlug = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { slug } = req.query
  const condition = { slug }

  await db.connect()
  const product = await Product.findOne(condition).lean()
  await db.disconnect()

  if (!product) {
    return res.status(404).json({ message: 'Product not found' })
  }
  product.images = product.images.map((image) => {
    return image.includes('cloudinary') ? image : `${process.env.NEXT_PUBLIC_SITE_URL}/products/${image}`
  })
  return res.status(200).json(product)
}
