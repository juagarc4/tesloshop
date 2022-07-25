import { ISize, IGender } from 'interfaces'

export interface ICartProduct {
  _id: string
  image: string
  price: number
  size: ISize
  slug: string
  title: string
  gender: IGender
  quantity: number
}
