import { FC, ReactElement, useReducer } from 'react'
import { CartContext, cartReducer } from './'
import { ICartProduct } from 'interfaces'
import { stat } from 'fs/promises'

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
  const addProductToCart = (product: ICartProduct) => {
    // Solution: Step 1 (Not practical) => Duplicated products in cart can happen
    // dispatch({ type: '[Cart] - Add product', payload: product })
    // Solution: Step 2 (not pratical) => We need to know the staus of the same product in the cart.
    // Moreover we override in this way the products instead of update them. This doens't work on the summary page
    // where we can add new items of a product.
    // const productsInCart = state.cart.filter((p) => p._id !== product._id && p.size !== product.size)
    // dispatch({ type: '[Cart] - Add product', payload: [...productsInCart, product] })
    // Solution: Step 3 (the best one) => We have to proces the full cart and sent it to the reducer
    const productInCart = state.cart.some((p) => p._id === product._id)
    if (!productInCart) return dispatch({ type: '[Cart] - Update products in cart', payload: [...state.cart, product] })

    const productInCartButDifferentSize = state.cart.some((p) => p._id === product._id && p.size === product.size)
    if (!productInCartButDifferentSize)
      return dispatch({ type: '[Cart] - Update products in cart', payload: [...state.cart, product] })

    const updatedProducts = state.cart.map((p) => {
      if (p._id !== product._id) return p
      if (p.size !== product.size) return p

      p.quantity += product.quantity

      return p
    })
    dispatch({ type: '[Cart] - Update products in cart', payload: updatedProducts })
  }

  return <CartContext.Provider value={{ ...state, addProductToCart }}>{children}</CartContext.Provider>
}
