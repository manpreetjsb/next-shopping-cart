import React, { createContext, useReducer } from 'react'
import type { ReactNode } from 'react'
import { IProduct } from './product.types'

const init = {
  darkMode: false,
  cart: {
    /* cartItems: localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : ([] as IProduct[]), */
    cartItems: [] as IProduct[],
  },
}

export enum ActionType {
  DARK_MODE_ON = 'DARK_MODE_ON',
  DARK_MODE_OFF = 'DARK_MODE_OFF',
  CART_ADD_ITEM = 'CART_ADD_ITEM',
  REMEOVE_ITEM = 'REMEOVE_ITEM',
}

export type Dispatch = (action: ActionType) => void
export type State = typeof init

export interface Istore {
  state: State
  dispatch: Dispatch
}

export interface IAction {
  type: ActionType
  payload: IProduct
}

export const Store = createContext<Istore | undefined>(undefined)

const reducer = (state: State, action: IAction) => {
  switch (action.type) {
    case ActionType.DARK_MODE_ON:
      return { ...state, darkMode: true }
    case ActionType.DARK_MODE_OFF:
      return { ...state, darkMode: false }
    case ActionType.CART_ADD_ITEM: {
      const newItem = action.payload
      const existItem = state.cart.cartItems.find(
        (item) => item._id === newItem._id
      )
      const cartItems = existItem
        ? state.cart.cartItems.map((item) =>
            item.name === existItem.name ? newItem : item
          )
        : [...state.cart.cartItems, newItem]

      //localStorage.setItem('cartItems', JSON.stringify(cartItems))
      return { ...state, cart: { ...state.cart, cartItems } }
    }
    case ActionType.REMEOVE_ITEM: {
      console.log(action.payload.item._id)
      const cartItems = state.cart.cartItems.filter(
        (item) => item._id !== action.payload.item._id
      )
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
