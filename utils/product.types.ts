export interface product {
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
}

export interface data {
  products: product[]
}
