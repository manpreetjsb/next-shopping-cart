import React, { createContext, useReducer } from 'react'
import type { ReactNode } from 'react'

const init = {
  darkMode: false,
  cart: {
    cartItems: [],
  },
}

export type Action = 'DARK_MODE_ON' | 'DARK_MODE_OFF'
export type Dispatch = (action: Action) => void
export type State = typeof init

export const Store = createContext<
  { state: State; dispatch: Dispatch } | undefined
>(undefined)

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'DARK_MODE_ON':
      return { ...state, darkMode: true }
    case 'DARK_MODE_OFF':
      return { ...state, darkMode: false }
    case 'CART_ADD_ITEM': {
      const newItem = action.payload
      const existItem = state.cart.cartItems.find(
        (item) => item._id === newItem._id
      )
      const cartItems = existItem
        ? state.cart.cartItems.map((item) =>
            item.name === existItem.name ? newItem : item
          )
        : [...state.cart.cartItems, newItem]
      return { ...state, cart: { ...state.cart, cartItems } }
    }

    default:
      return state
  }
}

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, init)
  //const value = { state, dispatch }
  return <Store.Provider value={{ state, dispatch }}>{children}</Store.Provider>
}
