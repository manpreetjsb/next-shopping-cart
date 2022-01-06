import Link from '@mui/material/Link'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Image from 'next/image'

import Layout from '../../components/Layout/Layout'
import { GetServerSideProps, InferGetStaticPropsType } from 'next'
import db from '../../utils/db'
import Product from '../../models/Product'
import { IProduct } from '../../utils/product.types'

const ProductPage: React.FC<
  InferGetStaticPropsType<typeof getServerSideProps>
> = (props: IProduct) => {
  const { product } = props

  if (!product) {
    return <div>Product not Found</div>
  }

  return (
    <Layout title={product.name} description={product.description}>
      <Grid mt={2} mb={2}>
        <Link href='/'>Back to Products</Link>
      </Grid>

      <Grid container spacing={2}>
        <Grid item md={6} xs={12}>
          <Image
            src={product.image}
            alt={product.name}
            layout='responsive'
            width={100}
            height={100}
          ></Image>
        </Grid>
        <Grid item md={3} xs={12}>
          <List>
            <ListItem>
              <Typography component='h1' variant='h1'>
                {product.name}
              </Typography>
            </ListItem>
            <ListItem>Category: {product.category}</ListItem>
            <ListItem>Brand: {product.brand}</ListItem>
            <ListItem>
              Rating: {product.rating} stars ({product.numReviews} reviews)
            </ListItem>
            <ListItem>
              Description: <Typography> {product.description}</Typography>
            </ListItem>
          </List>
        </Grid>
        <Grid item md={3} xs={12}>
          <Card>
            <List>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>Price</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>{product.price} €</Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>Status</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>
                      {product.countInStock ? 'In stock' : 'Unavailable'}
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Button fullWidth variant='contained' color='primary'>
                  Add to cart
                </Button>
              </ListItem>
            </List>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  )
}

export default ProductPage

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params } = context
  const { slug }: string = params
  console.log(typeof slug)
  await db.connect()
  const product: any = await Product.findOne({ slug }).lean()

  await db.disconnect()
  return {
    props: {
      product: db.convertDocToObject(product),
    },
  }
}
