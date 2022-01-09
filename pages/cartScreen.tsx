import React, { useContext } from 'react'
import Typography from '@mui/material/Typography'
import Layout from '../components/Layout/Layout'
import { Store } from '../utils/store'
import Link from 'next/link'
import Grid from '@mui/material/Grid'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Image from 'next/image'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ButtonGroup from '@mui/material/ButtonGroup'
import axios from 'axios'
import { useRouter } from 'next/router'

const CartScreen: React.FC = () => {
  const router = useRouter()
  const { state, dispatch } = useContext(Store)
  const { cartItems } = state.cart

  const removeItem = (item) => {
    dispatch({
      type: 'REMEOVE_ITEM',
      payload: { item },
    })
  }

  const updateCart = async (item, quantity, condition) => {
    if (condition === 'dec') {
      quantity = quantity - 1
      if (quantity === 0) {
        return
      }
    } else {
      quantity = quantity + 1
    }

    const { data } = await axios.get(`/api/products/${item._id}`)
    if (data.countInStock <= 0) {
      window.alert('Sorry. Product is out of stock')
      return
    }
    dispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...item, quantity },
    })
  }

  const checkoutHandler = () => {
    router.push('/shipping')
  }

  return (
    <Layout title='Shopping Cart'>
      <Grid mt={2} mb={2}>
        <Typography component='h1' variant='h1'>
          Shopping Cart
        </Typography>
      </Grid>
      {cartItems.length === 0 ? (
        <Grid>
          Cart is empty.{' '}
          <Link href='/'>
            <a>Go to Products</a>
          </Link>
        </Grid>
      ) : (
        <Grid container spacing={2}>
          <Grid item md={9} xs={12}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Image</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell align='center'>Quantity</TableCell>
                    <TableCell align='right'>Price</TableCell>
                    <TableCell align='right'>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cartItems.map((item) => {
                    return (
                      <TableRow key={item._id}>
                        <TableCell>
                          <Link href={`/product/${item.slug}`}>
                            <Image
                              src={item.image}
                              alt={item.name}
                              width={50}
                              height={50}
                            ></Image>
                          </Link>
                        </TableCell>
                        <TableCell>
                          <Typography>{item.name}</Typography>
                        </TableCell>
                        <TableCell align='center'>
                          <Typography>
                            <ButtonGroup
                              size='small'
                              aria-label='small outlined button group'
                            >
                              <Button
                                onClick={() =>
                                  updateCart(item, item.quantity, 'dec')
                                }
                              >
                                -
                              </Button>
                              <Button disabled>{item.quantity}</Button>
                              <Button
                                onClick={() =>
                                  updateCart(item, item.quantity, 'inc')
                                }
                              >
                                +
                              </Button>
                            </ButtonGroup>
                          </Typography>
                        </TableCell>
                        <TableCell align='right'>
                          <Typography>{item.price} €</Typography>
                        </TableCell>
                        <TableCell align='right'>
                          <Typography>
                            <Button
                              variant='outlined'
                              size='small'
                              color='primary'
                              onClick={() => removeItem(item)}
                            >
                              X
                            </Button>
                          </Typography>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item md={3} xs={12}>
            <Card>
              <List>
                <ListItem>
                  <Typography>
                    Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}{' '}
                    item) :{' '}
                    {cartItems.reduce((a, c) => a + c.quantity * c.price, 0)} €
                  </Typography>
                </ListItem>
                <ListItem>
                  <Button
                    fullWidth
                    color='secondary'
                    variant='contained'
                    onClick={checkoutHandler}
                  >
                    Check out
                  </Button>
                </ListItem>
              </List>
            </Card>
          </Grid>
        </Grid>
      )}
    </Layout>
  )
}
export default CartScreen
