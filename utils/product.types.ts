export interface IProduct {
  _id?: string
  name: string
  slug: string
  category: string
  image: string
  price: number
  brand: string
  rating: number
  numReviews: number
  countInStock: number
  description: string
  createdAt?: string
  updatedAt?: string
  quantity?: number | null | undefined
}

export interface IproductData {
  products: IProduct[]
}

export interface IUser {
  _id?: string
  name: string
  email: string
  password: string
  isAdmin: boolean
  createdAt?: string
  updatedAt?: string
}

export interface IcartItem {
  cartItems: IProduct[]
  paymentMethod: string
  shippingAddress: {}
}
