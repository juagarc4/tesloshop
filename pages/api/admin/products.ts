import type { NextApiRequest, NextApiResponse } from 'next'
import { isValidObjectId } from 'mongoose'
import { db } from 'database'
import { IProduct } from 'interfaces'
import { Product } from 'models'

import { v2 as cloudinary } from 'cloudinary'
cloudinary.config(process.env.CLOUDINARY_URL || '')

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
      return createProduct(req, res)
    default:
      return res.status(400).json({ message: 'Bad request' })
  }
}
const getProducts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await db.connect()
  const products = await Product.find().sort({ title: 'asc' }).lean()
  await db.disconnect()

  const updatedProducts = products.map((product) => {
    product.images = product.images.map((image) => {
      return image.includes('cloudinary') ? image : `${process.env.NEXT_PUBLIC_SITE_URL}/products/${image}`
    })
    return product
  })
  return res.status(200).json(updatedProducts)
}
const updateProdct = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { _id = '', images = [] } = req.body as IProduct

  if (!isValidObjectId(_id)) {
    return res.status(400).json({ message: 'Product id not valid' })
  }

  if (images.length < 2) {
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
    product.images.forEach(async (image) => {
      if (!images.includes(image)) {
        const [fileId, extension] = image.substring(image.lastIndexOf('/') + 1).split('.')
        await cloudinary.uploader.destroy(fileId)
      }
    })
    await product.update(req.body)
    await db.disconnect()
    return res.status(200).json(product)
  } catch (error) {
    console.log(error)
    await db.disconnect()
    return res.status(400).json({ message: 'Unhandled error: Review server console.' })
  }
}

const createProduct = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { images = [] } = req.body as IProduct

  if (images.length < 2) {
    return res.status(400).json({ message: 'Product needs at least 2 Images' })
  }

  try {
    await db.connect()
    const productInDB = await Product.findOne({ slug: req.body.slug })
    if (productInDB) {
      await db.disconnect()
      return res.status(400).json({ message: 'Product with this slug already exists' })
    }
    const product = new Product(req.body)
    await product.save()
    await db.disconnect()

    return res.status(201).json(product)
  } catch (error) {
    console.log(error)
    await db.disconnect()
    return res.status(400).json({ message: 'Unhandled error: Review server console.' })
  }
}
