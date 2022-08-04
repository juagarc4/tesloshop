import { createContext } from 'react'
import { IAddress, ICartProduct } from 'interfaces'

interface ContextProps {
  isLoaded: boolean
  cart: ICartProduct[]
  numberOfItems: number
  subTotal: number
  taxes: number
  total: number
  shippingAddress?: IAddress
  addProductToCart: (product: ICartProduct) => void
  updateCartQuantity: (product: ICartProduct) => void
  removeCartProduct: (product: ICartProduct) => void
}

export const CartContext = createContext({} as ContextProps)
