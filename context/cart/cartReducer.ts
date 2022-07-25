import { CartState } from './'
import { ICartProduct } from 'interfaces'

type CartActionType =
  | { type: '[Cart] - Load cart from cookies | storage'; payload: ICartProduct[] }
  | { type: '[Cart] - Add product'; payload: ICartProduct }

export const cartReducer = (state: CartState, action: CartActionType): CartState => {
  switch (action.type) {
    case '[Cart] - Load cart from cookies | storage':
      return {
        ...state,
      }
    case '[Cart] - Add product':
      return {
        ...state,
      }

    default:
      return state
  }
}
