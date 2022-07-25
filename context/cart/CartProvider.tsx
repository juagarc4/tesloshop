import { FC, ReactElement, useReducer } from 'react'
import { ICartProduct } from 'interfaces'
import { CartContext, cartReducer } from './'

export interface CartState {
  cart: ICartProduct[]
}

interface Props {
  children: ReactElement | ReactElement[]
}

const CART_INITIAL_STATE: CartState = {
  cart: [],
}

export const CartProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE)

  return <CartContext.Provider value={{ ...state }}>{children}</CartContext.Provider>
}
