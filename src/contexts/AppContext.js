import { createContext } from 'react'

export const AppContext = createContext({ isLoggedin: null, user: null, login: null, logout: null, signup: null })
