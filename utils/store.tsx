import React, { createContext, useReducer } from 'react'
import type { ReactNode } from 'react'
import { IProduct } from './allTypes.types'
import Cookies from 'js-cookie'

const init = {
  //darkMode: Cookies.get('darkMode' === 'ON' ? true : false),
  darkMode: false,
  cart: {
    cartItems: Cookies.get('cartItems')
      ? JSON.parse(Cookies.get('cartItems'))
      : [],
    //cartItems: [] as IProduct[],
    shippingAddress: Cookies.get('shippingAddress')
      ? JSON.parse(Cookies.get('shippingAddress'))
      : {},
    paymentMethod: '',
  },
  userInfo: Cookies.get('userInfo')
    ? JSON.parse(Cookies.get('userInfo'))
    : null,
}

export enum ActionType {
  DARK_MODE_ON = 'DARK_MODE_ON',
  DARK_MODE_OFF = 'DARK_MODE_OFF',
  CART_ADD_ITEM = 'CART_ADD_ITEM',
  REMEOVE_ITEM = 'REMEOVE_ITEM',
  USER_LOGIN = 'USER_LOGIN',
  USER_LOGOUT = 'USER_LOGOUT',
  SAVE_SHIPPING_ADDRESS = 'SAVE_SHIPPING_ADDRESS',
  SAVE_PAYMENT_METHOD = 'SAVE_PAYMENT_METHOD',
  CART_CLEAR = 'CART_CLEAR',
  FETCH_REQUEST = 'FETCH_REQUEST',
  FETCH_SUCCESS = 'FETCH_SUCCESS',
  FETCH_FAIL = 'FETCH_FAIL',
  PAY_REQUEST = 'PAY_REQUEST',
  PAY_SUCCESS = 'PAY_SUCCESS',
  PAY_FAIL = 'PAY_FAIL',
  PAY_RESET = 'PAY_RESET',
}

export type IDispatch = (action: ActionType) => void
export type IState = typeof init

export interface Istore {
  state: Istore
  dispatch: IDispatch
}

export interface IAction {
  type: ActionType
  payload: IProduct
}

export const Store = createContext<Istore | undefined>(undefined)

const reducer = (state: IState, action: IAction) => {
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

      Cookies.set('cartItems', JSON.stringify(cartItems))
      return { ...state, cart: { ...state.cart, cartItems } }
    }
    case ActionType.REMEOVE_ITEM: {
      const cartItems = state.cart.cartItems.filter(
        (item) => item._id !== action.payload
      )
      Cookies.set('cartItems', JSON.stringify(cartItems))
      return { ...state, cart: { ...state.cart, cartItems } }
    }
    case ActionType.USER_LOGIN:
      return { ...state, userInfo: action.payload }
    case ActionType.USER_LOGOUT:
      return {
        ...state,
        userInfo: null,
        cart: { cartItems: [], shippingAddress: {}, paymentMethod: '' },
      }
    case ActionType.SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        cart: { ...state.cart, shippingAddress: action.payload },
      }
    case ActionType.SAVE_PAYMENT_METHOD:
      return {
        ...state,
        cart: { ...state.cart, paymentMethod: action.payload },
      }
    case ActionType.CART_CLEAR:
      return { ...state, cart: { ...state.cart, cartItems: [] } }
    default:
      return state
  }
}

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, init)
  //const value = { state, dispatch }
  return <Store.Provider value={{ state, dispatch }}>{children}</Store.Provider>
}
