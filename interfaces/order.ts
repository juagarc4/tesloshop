import { IAddress, IUser } from 'interfaces'

export interface IOrder {
  _id?: string
  user?: IUser | string
  orderItems: IOrderItem
  shippingAddress: IAddress
  paymentResult?: string
  numberOfItems: number
  subTotatl: number
  tax: number
  total: number
  isPaid: boolean
  paidAt: string
}

export interface IOrderItem {
  _id: string
  title: string
  size: string
  quantity: number
  slug: string
  image: string
  price: number
}
