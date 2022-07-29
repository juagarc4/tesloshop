import { createContext } from 'react'
import { IUser } from 'interfaces'
import { RegisterData } from './'

interface ContextProps {
  isLoggedIn: boolean
  user?: IUser
  loginUser: (email: string, password: string) => Promise<boolean>
  registerUser: (name: string, email: string, password: string) => Promise<RegisterData>
}

export const AuthContext = createContext({} as ContextProps)
