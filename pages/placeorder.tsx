import React, { useContext, useEffect } from 'react'
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
import { useRouter } from 'next/router'
import CheckoutProcessBar from '../components/CheckoutProcessBar'

const PlaceOrder: React.FC = () => {
  const router = useRouter()
  const { state, dispatch } = useContext(Store)
  const {
    cart: { cartItems, shippingAddress, paymentMethod },
  } = state
  const round2 = (num: number) => Math.round(num * 100 + Number.EPSILON) / 100
  const itemsPrice = round2(
    cartItems.reduce((a, c) => a + c.price * c.quantity, 0)
  )
  const shippingPrice = itemsPrice > 200 ? 0 : 15
  const taxPrice = round2(itemsPrice * 0.15)
  const totalPrice = round2(itemsPrice + shippingPrice + taxPrice)

  useEffect(() => {
    if (!paymentMethod) {
      router.push('/payments')
    }
  }, [])

  return (
    <Layout title='Place Order'>
      <Grid mt={3} mb={3}>
        <CheckoutProcessBar activeStep={3} />
      </Grid>
      <Grid mt={2} mb={2}>
        <Typography component='h1' variant='h1'>
          Place Order
        </Typography>
      </Grid>

      <Grid container spacing={2}>
        <Grid item md={9} xs={12}>
          <Card>
            <List>
              <ListItem>
                <Typography component={'h2'} variant='h2'>
                  Shipping Address
                </Typography>
              </ListItem>
              <ListItem>
                {shippingAddress.fullName}, {shippingAddress.address},{' '}
                {shippingAddress.city}, {shippingAddress.postalCode} ,
                {shippingAddress.country}
              </ListItem>
            </List>
          </Card>
          <Card>
            <List>
              <ListItem>
                <Typography component={'h2'} variant='h2'>
                  Payment Method
                </Typography>
              </ListItem>
              <ListItem>{paymentMethod}</ListItem>
            </List>
          </Card>
          <Card>
            <List>
              <ListItem>
                <Typography component={'h2'} variant='h2'>
                  Order Items
                </Typography>
              </ListItem>
              <ListItem>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Image</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell align='center'>Quantity</TableCell>
                        <TableCell align='right'>Price</TableCell>
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
                              <Typography>{item.quantity}</Typography>
                            </TableCell>
                            <TableCell align='right'>
                              <Typography>{item.price} €</Typography>
                            </TableCell>
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </ListItem>
            </List>
          </Card>
        </Grid>
        <Grid item md={3} xs={12}>
          <Card>
            <List>
              <ListItem>
                <Typography component={'h2'} variant='h2'>
                  Order Summary
                </Typography>
              </ListItem>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>Items :</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography align='right'>{itemsPrice}€</Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>Tax :</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography align='right'>{taxPrice}€</Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>Shipping :</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography align='right'>{shippingPrice}€</Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>
                      <strong>Total :</strong>
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography align='right'>
                      <strong>{totalPrice}€</strong>
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Button fullWidth color='primary' variant='contained'>
                  Place Order
                </Button>
              </ListItem>
            </List>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  )
}
export default PlaceOrder
