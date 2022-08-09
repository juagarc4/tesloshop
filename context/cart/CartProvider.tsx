import { FC, ReactElement, useEffect, useReducer, createContext } from 'react'
import Cookies from 'js-cookie'
import { cartReducer } from './'
import { IAddress, ICartProduct, IOrder } from 'interfaces'
import { CartContext } from 'context'
import { tesloApi } from 'api'
import axios from 'axios'

export interface CartState {
  isLoaded: boolean
  cart: ICartProduct[]
  numberOfItems: number
  subTotal: number
  tax: number
  total: number
  shippingAddress?: IAddress
}

interface Props {
  children: ReactElement | ReactElement[]
}

const CART_INITIAL_STATE: CartState = {
  isLoaded: false,
  cart: [],
  numberOfItems: 0,
  subTotal: 0,
  tax: 0,
  total: 0,
  shippingAddress: undefined,
}

export const CartProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE)

  useEffect(() => {
    try {
      const cartFromCookie = Cookies.get('cart') ? JSON.parse(Cookies.get('cart')!) : []
      dispatch({ type: '[Cart] - Load cart from cookies | storage', payload: cartFromCookie })
    } catch (error) {
      dispatch({ type: '[Cart] - Load cart from cookies | storage', payload: [] })
    }
  }, [])

  useEffect(() => {
    if (Cookies.get('firstName')) {
      const shippingAddress = {
        firstName: Cookies.get('firstName') || '',
        lastName: Cookies.get('lastName') || '',
        address: Cookies.get('address') || '',
        address2: Cookies.get('address2') || '',
        postalCode: Cookies.get('postalCode') || '',
        city: Cookies.get('city') || '',
        country: Cookies.get('country') || '',
        phone: Cookies.get('phone') || '',
      }
      dispatch({ type: '[Cart] - Load address from cookies', payload: shippingAddress })
    }
  }, [])

  useEffect(() => {
    Cookies.set('cart', JSON.stringify(state.cart))
  }, [state.cart])

  useEffect(() => {
    const numberOfItems = state.cart.reduce((prev, current) => current.quantity + prev, 0)
    const subTotal = state.cart.reduce((prev, current) => current.price * current.quantity + prev, 0)
    const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0)

    const orderSummary = {
      numberOfItems,
      subTotal,
      tax: subTotal * taxRate,
      total: subTotal * (taxRate + 1),
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

  const updateAddress = (address: IAddress) => {
    Cookies.set('firstName', address.firstName)
    Cookies.set('lastName', address.lastName)
    Cookies.set('address', address.address)
    Cookies.set('address2', address.address2 || '')
    Cookies.set('postalCode', address.postalCode)
    Cookies.set('city', address.city)
    Cookies.set('country', address.country)
    Cookies.set('phone', address.phone)
    dispatch({ type: '[Cart] - Update address', payload: address })
  }

  const createOrder = async (): Promise<{ hasError: boolean; message: string }> => {
    if (!state.shippingAddress) {
      throw new Error('No shipping address was provided.')
    }
    const body: IOrder = {
      orderItems: state.cart.map((p) => ({
        ...p,
        size: p.size!,
      })),
      shippingAddress: state.shippingAddress,
      numberOfItems: state.numberOfItems,
      subTotal: state.subTotal,
      tax: state.tax,
      total: state.total,
      isPaid: false,
    }

    try {
      const { data } = await tesloApi.post<IOrder>('/orders', body)
      dispatch({ type: '[Cart] - Order completed' })
      return {
        hasError: false,
        message: data._id!,
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const { message } = error.response?.data as { message: string }
        return {
          hasError: true,
          message,
        }
      }
      return {
        hasError: true,
        message: 'Unhandled Error. Contact with your support service.',
      }
    }
  }

  return (
    <CartContext.Provider
      value={{
        ...state,
        addProductToCart,
        updateCartQuantity,
        removeCartProduct,
        updateAddress,
        createOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
