import { useContext } from 'react'
import { CardActionArea } from '@mui/material'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import NextLink from 'next/link'
import Layout from '../components/Layout/Layout'
import { GetServerSideProps, InferGetStaticPropsType } from 'next'
import db from '../utils/db'
import Product from '../models/Product'
import { IProduct, IproductData } from '../utils/product.types'
import axios from 'axios'
import { Store } from '../utils/store'

const Home: React.FC<InferGetStaticPropsType<typeof getServerSideProps>> = (
  props: IproductData
) => {
  const { dispatch } = useContext(Store)
  const addToCartHandler = async (product) => {
    const { data } = await axios.get(`/api/products/${product._id}`)
    if (data.countInStock <= 0) {
      window.alert('Sorry. Product is out of stock')
      return
    }
    dispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...product, quantity: 1 },
    })
  }

  return (
    <Layout title={'hello'} description={'undefined'}>
      <h1>Products</h1>
      <Grid container spacing={3}>
        {props.products.map((product: IProduct) => (
          <Grid item md={4} key={product._id}>
            <Card>
              <NextLink href={`/product/${product.slug}`} passHref>
                <CardActionArea>
                  <CardMedia
                    component='img'
                    image={product.image}
                    title={product.name}
                  ></CardMedia>
                  <CardContent>
                    <Typography component='h5' variant='h3'>
                      {product.name}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </NextLink>
              <CardActions>
                <Typography>{product.price} €</Typography>
                <Box ml={1}>
                  <Button
                    size='small'
                    variant='contained'
                    color='secondary'
                    onClick={() => addToCartHandler(product)}
                  >
                    Add to cart
                  </Button>
                </Box>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Layout>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async () => {
  await db.connect()
  const products: any = await Product.find({}).lean()
  //console.log(products)
  await db.disconnect()
  return {
    props: {
      products: products.map(db.convertDocToObject),
    },
  }
}
