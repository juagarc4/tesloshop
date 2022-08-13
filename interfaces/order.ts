import { IAddress, IUser, ISize } from 'interfaces'

export interface IOrder {
  _id?: string
  user?: IUser | string
  orderItems: IOrderItem[]
  shippingAddress: IAddress
  paymentResult?: string
  numberOfItems: number
  subTotal: number
  tax: number
  total: number
  isPaid: boolean
  paidAt?: string
  transactionId?: string
}

export interface IOrderItem {
  _id: string
  title: string
  size: ISize
  gender: string
  quantity: number
  slug: string
  image: string
  price: number
}
