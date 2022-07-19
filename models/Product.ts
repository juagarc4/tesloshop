import mongoose, { Schema, model, Model } from 'mongoose'
import { IProduct } from 'interfaces'

const productSchema = new Schema(
  {
    description: { type: String, required: true },
    images: [{ type: String }],
    inStock: { type: Number, required: true, default: 0 },
    price: { type: Number, required: true, default: 0 },
    sizes: [
      {
        type: String,
        enum: {
          values: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
          message: '{VALUE} ist not a valid size',
        },
        required: true,
      },
    ],
    slug: { type: String, required: true, unique: true },
    tags: [{ type: String }],
    title: { type: String, required: true },
    type: {
      type: String,
      enum: {
        values: ['shirts', 'pants', 'hoodies', 'hats'],
        message: '{VALUE} ist not a valid type',
      },
      required: true,
    },
    gender: {
      type: String,
      enum: {
        values: ['men', 'women', 'kid', 'unisex'],
        message: '{VALUE} ist not a valid gender',
      },
      required: true,
    },
  },
  { timestamps: true }
)

// TODO: Crete Mongo index

const Product: Model<IProduct> = mongoose.models.Product || model('Product', productSchema)

export default Product
