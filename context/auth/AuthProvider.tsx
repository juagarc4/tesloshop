import { FC, ReactElement, useReducer, useEffect } from 'react'
import Cookies from 'js-cookie'
import axios from 'axios'
import { AuthContext, authReducer } from './'
import { IUser } from 'interfaces'
import { tesloApi } from 'api'

export interface AuthState {
  isLoggedIn: boolean
  user?: IUser
}
interface Props {
  children: ReactElement | ReactElement[]
}
export interface RegisterData {
  hasError: boolean
  message?: string
}

const AUTH_INITIAL_STATE: AuthState = {
  isLoggedIn: false,
  user: undefined,
}

export const AuthProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE)

  useEffect(() => {
    checkToken()
  }, [])

  const checkToken = async () => {
    if (!Cookies.get('token')) {
      return
    }
    try {
      const { data } = await tesloApi.get('/user/validate-token')
      const { token, user } = data
      Cookies.set('token', token)
      dispatch({ type: '[Auth] - Login', payload: user })
      return true
    } catch (error) {
      Cookies.remove('token')
      return false
    }
  }

  const loginUser = async (email: string, password: string): Promise<boolean> => {
    try {
      const { data } = await tesloApi.post('/user/login', { email, password })
      const { token, user } = data
      Cookies.set('token', token)
      dispatch({ type: '[Auth] - Login', payload: user })
      return true
    } catch (error) {
      return false
    }
  }

  const registerUser = async (name: string, email: string, password: string): Promise<RegisterData> => {
    try {
      const { data } = await tesloApi.post('/user/register', { name, email, password })
      const { token, user } = data
      Cookies.set('token', token)
      // The same dispatch because the respone I need is the same.
      dispatch({ type: '[Auth] - Login', payload: user })
      // TODO: return
      return {
        hasError: false,
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
        message: 'User could not be created',
      }
    }
  }
  return <AuthContext.Provider value={{ ...state, loginUser, registerUser }}>{children}</AuthContext.Provider>
}
