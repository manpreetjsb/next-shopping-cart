import { useRouter } from 'next/router'
import data from '../../utils/data'

const ProductPage = () => {
  const router = useRouter()
  const { slug } = router.query

  const product = data.products.find((item) => item.slug === slug)
  if (!product) {
    return <div>Product not Found</div>
  }

  return (
    <div>
      <h1>{product.name}</h1>
    </div>
  )
}

export default ProductPage
