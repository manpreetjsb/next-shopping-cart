import React, { createContext, useReducer } from 'react'
import type { ReactNode } from 'react'

const init = {
  darkMode: false,
}

export type Action = 'DARK_MODE_ON' | 'DARK_MODE_OFF'
export type Dispatch = (action: Action) => void
export type State = typeof init

export const Store = createContext<
  { state: State; dispatch: Dispatch } | undefined
>(undefined)

const reducer = (state: State, action: Action) => {
  switch (action) {
    case 'DARK_MODE_ON':
      return { ...state, darkMode: true }
    case 'DARK_MODE_OFF':
      return { ...state, darkMode: false }
    default:
      return state
  }
}

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, init)
  const value = { state, dispatch }
  return <Store.Provider value={value}>{children}</Store.Provider>
}
