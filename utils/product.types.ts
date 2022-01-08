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
}

export interface IproductData {
  products: IProduct[]
}
