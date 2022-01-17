import React, { useContext, useEffect, useReducer } from 'react'
import dynamic from 'next/dynamic'
import Typography from '@mui/material/Typography'
import Layout from '../../components/Layout/Layout'
import { Store, ActionType } from '../../utils/store'
import Link from 'next/link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Image from 'next/image'
import Card from '@mui/material/Card'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'
import { getError } from '../../utils/error'
import axios from 'axios'
import { GetServerSideProps, InferGetStaticPropsType } from 'next'
import CircularProgress from '@mui/material/CircularProgress'
import CheckoutProcessBar from '../../components/CheckoutProcessBar'

const reducer = (state, action) => {
  switch (action.type) {
    case ActionType.FETCH_REQUEST:
      return { ...state, loading: true, error: '' }
    case ActionType.FETCH_SUCCESS:
      return { ...state, loading: false, order: action.payload, error: '' }
    case ActionType.FETCH_FAIL:
      return { ...state, loading: false, error: action.payload }
    default:
      state
  }
}

const Order: React.FC = ({ params }) => {
  const router = useRouter()
  const orderId = params.id
  const { state } = useContext(Store)
  const { userInfo } = state

  const [{ loading, error, order }, dispatch] = useReducer(reducer, {
    loading: true,
    order: {},
    error: '',
  })

  const {
    shippingAddress,
    paymentMethod,
    orderItems,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    isDelivered,
    deliveredAt,
    isPaid,
    paidAt,
  } = order

  useEffect(() => {
    if (!userInfo) {
      return router.push('/login')
    }
    const fetchOrder = async () => {
      try {
        dispatch({ type: ActionType.FETCH_REQUEST })
        const { data } = await axios.get(`/api/orders/${orderId}`, {
          headers: { authorization: `Bearer ${userInfo.token}` },
        })
        dispatch({ type: ActionType.FETCH_SUCCESS, payload: data })
      } catch (err) {
        dispatch({ type: ActionType.FETCH_FAIL, payload: getError(err) })
      }
    }

    if (!order._id || (order._id && order._id !== orderId)) {
      fetchOrder()
    }
  }, [order])

  const { closeSnackbar, enqueueSnackbar } = useSnackbar()

  return (
    <Layout title={`Order ${orderId}`}>
      <Grid mt={3} mb={3}>
        <CheckoutProcessBar activeStep={3} />
      </Grid>
      <Grid mt={2} mb={2}>
        <Typography component='h1' variant='h1'>
          Order {orderId}
        </Typography>
      </Grid>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography>{error}</Typography>
      ) : (
        <Grid container spacing={2}>
          <Grid item md={9} xs={12}>
            <Box>
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
                  <ListItem>
                    Status:
                    {isDelivered
                      ? `Delivered at ${deliveredAt}`
                      : 'Not Delivered'}
                  </ListItem>
                </List>
              </Card>
            </Box>
            <Box my={2}>
              <Card>
                <List>
                  <ListItem>
                    <Typography component={'h2'} variant='h2'>
                      Payment Method
                    </Typography>
                  </ListItem>
                  <ListItem>{paymentMethod}</ListItem>
                  <ListItem>
                    Status:
                    {isPaid ? `Paid at ${paidAt}` : 'Not Paid'}
                  </ListItem>
                </List>
              </Card>
            </Box>
            <Box mt={2}>
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
                          {orderItems.map((item) => {
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
            </Box>
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
              </List>
            </Card>
          </Grid>
        </Grid>
      )}
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  return { props: { params } }
}

export default dynamic(() => Promise.resolve(Order), { ssr: false })
