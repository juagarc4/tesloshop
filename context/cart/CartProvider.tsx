import { FC, ReactElement, useEffect, useReducer } from 'react'
import Cookie from 'js-cookie'
import { CartContext, cartReducer } from './'
import { ICartProduct } from 'interfaces'

export interface CartState {
  cart: ICartProduct[]
  numberOfItems: number
  subTotal: number
  taxes: number
  total: number
}

interface Props {
  children: ReactElement | ReactElement[]
}

const CART_INITIAL_STATE: CartState = {
  cart: [],
  numberOfItems: 0,
  subTotal: 0,
  taxes: 0,
  total: 0,
}

export const CartProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE)

  useEffect(() => {
    try {
      const cartFromCookie = Cookie.get('cart') ? JSON.parse(Cookie.get('cart')!) : []
      dispatch({ type: '[Cart] - Load cart from cookies | storage', payload: cartFromCookie })
    } catch (error) {
      dispatch({ type: '[Cart] - Load cart from cookies | storage', payload: [] })
    }
  }, [])

  useEffect(() => {
    Cookie.set('cart', JSON.stringify(state.cart))
  }, [state.cart])

  useEffect(() => {
    const numberOfItems = state.cart.reduce((prev, current) => current.quantity + prev, 0)
    const subTotal = state.cart.reduce((prev, current) => current.price * current.quantity + prev, 0)
    const taxes = subTotal * Number(process.env.NEXT_PUBLIC_TAX_RATE || 0)
    const total = subTotal + taxes

    const orderSummary = {
      numberOfItems,
      subTotal,
      taxes,
      total,
    }
    dispatch({ type: '[Cart] - Update order summary', payload: orderSummary })
  }, [state.cart])

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

  const updateCartQuantity = (product: ICartProduct) => {
    const updatedProducts = state.cart.map((p) => {
      if (p._id !== product._id) return p
      if (p.size !== product.size) return p
      p.quantity = product.quantity
      return p
    })
    dispatch({ type: '[Cart] - Update product quantity in cart', payload: updatedProducts })
  }

  const removeCartProduct = (product: ICartProduct) => {
    const updatedProducts = state.cart.filter((p) => !(p._id === product._id && p.size === product.size))
    dispatch({ type: '[Cart] - Remove product in cart', payload: updatedProducts })
  }

  return (
    <CartContext.Provider
      value={{
        ...state,
        addProductToCart,
        updateCartQuantity,
        removeCartProduct,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
