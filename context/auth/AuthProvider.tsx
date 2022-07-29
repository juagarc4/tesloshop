import { FC, ReactElement, useReducer } from 'react'
import { AuthContext, authReducer } from './'
import { IUser } from 'interfaces'

export interface AuthState {
  isLoggedIn: boolean
  user?: IUser
}
interface Props {
  children: ReactElement | ReactElement[]
}

const AUTH_INITIAL_STATE: AuthState = {
  isLoggedIn: false,
  user: undefined,
}

export const AuthProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE)

  return <AuthContext.Provider value={{ ...state }}>{children}</AuthContext.Provider>
}
