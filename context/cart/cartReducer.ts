import { CartState } from './'
import { IAddress, ICartProduct } from 'interfaces'

type CartActionType =
  | { type: '[Cart] - Load cart from cookies | storage'; payload: ICartProduct[] }
  | { type: '[Cart] - Update products in cart'; payload: ICartProduct[] }
  | { type: '[Cart] - Update product quantity in cart'; payload: ICartProduct[] }
  | { type: '[Cart] - Remove product in cart'; payload: ICartProduct[] }
  | { type: '[Cart] - Load address from cookies'; payload: IAddress }
  | { type: '[Cart] - Update address'; payload: IAddress }
  | {
      type: '[Cart] - Update order summary'
      payload: {
        numberOfItems: number
        subTotal: number
        tax: number
        total: number
      }
    }
  | { type: '[Cart] - Order completed' }

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
    case '[Cart] - Load address from cookies':
    case '[Cart] - Update address':
      return {
        ...state,
        shippingAddress: action.payload, //To maintain the same format
      }
    case '[Cart] - Order completed':
      return {
        ...state,
        cart: [],
        numberOfItems: 0,
        subTotal: 0,
        tax: 0,
        total: 0,
      }
    default:
      return state
  }
}
