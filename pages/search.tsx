import React from 'react'
import Layout from '../components/Layout/Layout'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Typography from '@mui/material/Typography'
import NextLink from 'next/link'
import { GetServerSideProps, InferGetStaticPropsType } from 'next'
import db from '../utils/db'
import Product from '../models/Product'
import { IProduct } from '../utils/allTypes.types'
import { CardActionArea, InputLabel } from '@mui/material'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Rating from '@mui/material/Rating'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'
import { useRouter } from 'next/router'

const prices = [
  {
    name: '€1 to €50',
    value: '1-50',
  },
  {
    name: '€51 to €200',
    value: '51-200',
  },
  {
    name: '€201 to €1000',
    value: '201-1000',
  },
]

const ratings = [1, 2, 3, 4, 5]
const PAGE_SIZE = 3

export interface PIpropFilterSearch {
  category: string
  brand: string
  page: string | string[] | undefined
  sort: string
  min: string | undefined
  max: string | undefined
  searchQuery: string
  price: string | string[] | undefined
  rating: any
}

const Search: React.FC<InferGetStaticPropsType<typeof getServerSideProps>> = (
  props: any
) => {
  const router = useRouter()

  const {
    query = 'all',
    category = 'all',
    brand = 'all',
    price = 'all',
    rating = 'all',
    sort = 'featured',
  } = router.query

  const { products, brands, categories, pages, countProducts } = props

  const filterSearch = ({
    page,
    category,
    brand,
    sort,
    min,
    max,
    searchQuery,
    price,
    rating,
  }: PIpropFilterSearch) => {
    const path = router.pathname
    const { query } = router
    if (page) query.page = page
    if (searchQuery) query.searchQuery = searchQuery
    if (sort) query.sort = sort
    if (category) query.category = category
    if (brand) query.brand = brand
    if (price) query.price = price
    if (rating) query.rating = rating
    if (min) query.min ? query.min : query.min === 0 ? 0 : min
    if (max) query.max ? query.max : query.max === 0 ? 0 : max

    router.push({
      pathname: path,
      query: query,
    })
  }

  const categoryHandler = (e: React.FormEvent<HTMLSelectElement>) => {
    filterSearch({ category: e.target.value })
  }

  const brandHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    filterSearch({ brand: e.target.value })
  }

  const pageHandler = (e: any, page: any) => {
    filterSearch({ page })
  }

  const sortHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    filterSearch({ sort: e.target.value })
  }
  const priceHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    filterSearch({ price: e.target.value })
  }
  const ratingHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    filterSearch({ rating: e.target.value })
  }

  return (
    <Layout title='Search'>
      <Box mt={3} mb={3}>
        <Grid container spacing={1} display={'flex'}>
          <Grid item md={3}>
            <List>
              <ListItem>
                <FormControl fullWidth variant='filled'>
                  <InputLabel htmlFor='outlined-age-native-simple'>
                    Categories
                  </InputLabel>
                  <Select
                    native
                    value={category}
                    onChange={categoryHandler}
                    fullWidth
                    size='small'
                    inputProps={{
                      name: 'categories',
                      id: 'outlined-age-native-simple',
                    }}
                  >
                    <option value={'all'}>All</option>
                    {categories.map((category: string) => {
                      return (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      )
                    })}
                  </Select>
                </FormControl>
              </ListItem>
              <ListItem>
                <FormControl variant='filled' fullWidth>
                  <InputLabel htmlFor='outlined-age-native-simple'>
                    Brands
                  </InputLabel>
                  <Select
                    native
                    value={brand}
                    onChange={(e) => brandHandler(e)}
                    size='small'
                    inputProps={{
                      name: 'brands',
                      id: 'outlined-age-native-simple',
                    }}
                  >
                    <option value={'all'}>All</option>
                    {brands.map((brand: string) => {
                      return (
                        <option key={brand} value={brand}>
                          {brand}
                        </option>
                      )
                    })}
                  </Select>
                </FormControl>
              </ListItem>
              <ListItem>
                <FormControl variant='filled' fullWidth>
                  <InputLabel htmlFor='outlined-age-native-simple'>
                    Prices
                  </InputLabel>
                  <Select
                    native
                    value={price}
                    onChange={priceHandler}
                    size='small'
                    label='prices'
                    inputProps={{
                      name: 'prices',
                      id: 'outlined-age-native-simple',
                    }}
                  >
                    <option value={'all'}>All</option>
                    {prices.map((price) => {
                      return (
                        <option key={price.value} value={price.value}>
                          {price.name}
                        </option>
                      )
                    })}
                  </Select>
                </FormControl>
              </ListItem>
              <ListItem>
                <FormControl variant='filled' fullWidth>
                  <InputLabel htmlFor='outlined-age-native-simple'>
                    Ratings
                  </InputLabel>
                  <Select
                    value={rating}
                    onChange={ratingHandler}
                    size='small'
                    label='ratings'
                    fullWidth
                  >
                    <MenuItem value={'all'}>All</MenuItem>
                    {ratings.map((rating) => {
                      return (
                        <MenuItem key={rating} value={rating}>
                          <Rating value={rating} readOnly />
                        </MenuItem>
                      )
                    })}
                  </Select>
                </FormControl>
              </ListItem>
            </List>
          </Grid>
          <Grid item md={9}>
            <Box mt={2} mb={2}>
              <Grid
                container
                spacing={3}
                display={'flex'}
                alignItems={'center'}
              >
                <Grid item md={6}>
                  {countProducts} Result
                </Grid>
                <Grid item md={6} textAlign={'right'}>
                  <Typography component='span'>Sort by</Typography>
                  <Select size='small' value={sort} onChange={sortHandler}>
                    <MenuItem value='featured'>Featured</MenuItem>
                    <MenuItem value='lowest'>Price: Low to High</MenuItem>
                    <MenuItem value='highest'>Price: High to Low</MenuItem>
                    <MenuItem value='toprated'>Customer Reviews</MenuItem>
                    <MenuItem value='newest'>Newest Arrivals</MenuItem>
                  </Select>
                </Grid>
              </Grid>
            </Box>
            <Grid container spacing={3}>
              {products.map((product: IProduct) => (
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
                          color='primary'
                          //onClick={() => addToCartHandler(product)}
                        >
                          Add to cart
                        </Button>
                      </Box>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
            <Box mt={5}>
              <Stack spacing={2}>
                <Pagination
                  count={pages}
                  defaultPage={parseInt(query.page || '1')}
                  size='small'
                  onChange={pageHandler}
                />
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Layout>
  )
}

export default Search

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  await db.connect()
  const pageSize: any = query.pageSize || PAGE_SIZE
  const page = query.page || 1
  const category = query.category || ''
  const brand = query.brand || ''
  const price = query.price || ''
  const rating = query.rating || ''
  const sort = query.sort || ''
  const searchQuery = query.s || ''

  const order =
    sort === 'featured'
      ? { featured: -1 }
      : sort === 'lowest'
      ? { price: 1 }
      : sort === 'highest'
      ? { price: -1 }
      : sort === 'toprated'
      ? { rating: -1 }
      : sort === 'newest'
      ? { createdAt: -1 }
      : { _id: -1 }

  const queryFilter =
    searchQuery && searchQuery !== 'all'
      ? {
          name: {
            $regex: searchQuery,
            $options: 'i',
          },
        }
      : {}

  // 10-50
  const priceFilter =
    price && price !== 'all'
      ? {
          price: {
            $gte: Number(price.split('-')[0]),
            $lte: Number(price.split('-')[1]),
          },
        }
      : {}

  const categoryFilter = category && category !== 'all' ? { category } : {}
  const brandFilter = brand && brand !== 'all' ? { brand } : {}
  const ratingFilter =
    rating && rating !== 'all'
      ? {
          rating: {
            $gte: Number(rating),
          },
        }
      : {}

  const products: any = await Product.find({
    ...queryFilter,
    ...categoryFilter,
    ...brandFilter,
    ...priceFilter,
    ...ratingFilter,
  })
    .sort(order)
    .skip(pageSize * (page - 1))
    .limit(pageSize)
    .lean()

  const categories = await Product.find().distinct('category')
  const brands: any = await Product.find().distinct('brand')

  const countProducts = await Product.countDocuments({
    ...queryFilter,
    ...categoryFilter,
    ...brandFilter,
    ...priceFilter,
    ...ratingFilter,
  })

  await db.disconnect()

  return {
    props: {
      products: products.map(db.convertDocToObject),
      categories: categories,
      brands: brands,
      page,
      pages: Math.ceil(countProducts / pageSize),
      countProducts,
    },
  }
}
