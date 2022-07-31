import { CartState } from './'
import { ICartProduct } from 'interfaces'

type CartActionType =
  | { type: '[Cart] - Load cart from cookies | storage'; payload: ICartProduct[] }
  | { type: '[Cart] - Update products in cart'; payload: ICartProduct[] }
  | { type: '[Cart] - Update product quantity in cart'; payload: ICartProduct[] }
  | { type: '[Cart] - Remove product in cart'; payload: ICartProduct[] }
  | {
      type: '[Cart] - Update order summary'
      payload: {
        numberOfItems: number
        subTotal: number
        taxes: number
        total: number
      }
    }

export const cartReducer = (state: CartState, action: CartActionType): CartState => {
  switch (action.type) {
    case '[Cart] - Load cart from cookies | storage':
      return {
        ...state,
        isLoaded: true,
        cart: [...action.payload], //To maintain the same format
      }
    case '[Cart] - Update products in cart':
      return {
        ...state,
        cart: [...action.payload],
      }
    case '[Cart] - Update product quantity in cart':
      return {
        ...state,
        cart: [...action.payload],
      }
    case '[Cart] - Remove product in cart':
      return {
        ...state,
        cart: [...action.payload],
      }
    case '[Cart] - Update order summary':
      return {
        ...state,
        ...action.payload,
      }
    default:
      return state
  }
}
