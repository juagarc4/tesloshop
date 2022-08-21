import type { NextApiRequest, NextApiResponse } from 'next'
import { isValidObjectId } from 'mongoose'
import { db } from 'database'
import { IProduct } from 'interfaces'
import { Product } from 'models'

type Data =
  | {
      message: string
    }
  | IProduct[]
  | IProduct

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'GET':
      return getProducts(req, res)

    case 'PUT':
      return updateProdct(req, res)
    case 'POST':
    default:
      return res.status(400).json({ message: 'Bad request' })
  }
}
const getProducts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await db.connect()
  const products = await Product.find().sort({ title: 'asc' }).lean()
  await db.disconnect()

  return res.status(200).json(products)
  // TODO: Update images
}
const updateProdct = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { _id = '', images = [] } = req.body as IProduct

  if (!isValidObjectId(_id)) {
    return res.status(400).json({ message: 'Product id not valid' })
  }

  if (images.length <= 2) {
    return res.status(400).json({ message: 'At least 2 images are needed' })
  }

  // TODO: Full urls for images

  try {
    await db.connect()
    const product = await Product.findById(_id)
    if (!product) {
      await db.disconnect()
      return res.status(400).json({ message: 'Product does not exist' })
    }
    //TODO: Remove images in Cloudinary
    await product.update(req.body)
    await db.disconnect()
    return res.status(200).json(product)
  } catch (error) {
    await db.disconnect()
    return res.status(400).json({ message: 'Unhandled error: Review server console.' })
  }
}
