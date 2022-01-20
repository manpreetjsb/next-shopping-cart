import React, { useContext, useEffect, useReducer } from 'react'
import dynamic from 'next/dynamic'
import Typography from '@mui/material/Typography'
import Link from 'next/link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Card from '@mui/material/Card'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import { useRouter } from 'next/router'
import axios from 'axios'
import CircularProgress from '@mui/material/CircularProgress'
import { ActionType, Store } from '../utils/store'
import { getError } from '../utils/error'
import Layout from '../components/Layout/Layout'
import Button from '@mui/material/Button'

const reducer = (state, action) => {
  switch (action.type) {
    case ActionType.FETCH_REQUEST:
      return { ...state, loading: true, error: '' }
    case ActionType.FETCH_SUCCESS:
      return { ...state, loading: false, orders: action.payload, error: '' }
    case ActionType.FETCH_FAIL:
      return { ...state, loading: false, error: action.payload }
    default:
      state
  }
}

const OrderHistory = () => {
  const { state } = useContext(Store)
  const { userInfo } = state
  const { router } = useRouter

  const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
    loading: true,
    orders: [],
    error: '',
  })

  useEffect(() => {
    if (!userInfo) router.push('/login')

    const fetchOrders = async () => {
      try {
        dispatch({ type: ActionType.FETCH_REQUEST })
        const { data } = await axios.get(`/api/orders/history`, {
          headers: { authorization: `Bearer ${userInfo.token}` },
        })
        dispatch({ type: ActionType.FETCH_SUCCESS, payload: data })
      } catch (err) {
        dispatch({ type: ActionType.FETCH_FAIL, payload: getError(err) })
      }
    }
    fetchOrders()
  }, [])
  return (
    <Layout title='Order History'>
      <Grid container spacing={2} mt={3}>
        <Grid item md={3} xs={12}>
          <Box>
            <Card>
              <List>
                <ListItem button>
                  <Link href={'/profile'}>
                    <a>User Profile</a>
                  </Link>
                </ListItem>
                <ListItem selected button>
                  <Link href={'/order-history'}>
                    <a>Order History</a>
                  </Link>
                </ListItem>
              </List>
            </Card>
          </Box>
        </Grid>
        <Grid item md={9} xs={12}>
          <Box>
            <Card>
              <List>
                <ListItem>
                  <Typography component='h1' variant='h1'>
                    Order History
                  </Typography>
                </ListItem>
                <ListItem>
                  {loading ? (
                    <CircularProgress />
                  ) : error ? (
                    <Typography>{error}</Typography>
                  ) : (
                    <TableContainer>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>DATE</TableCell>
                            <TableCell>TOTAL</TableCell>
                            <TableCell>PAID</TableCell>
                            <TableCell>DELIVERED</TableCell>
                            <TableCell>ACTION</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {orders.map((order) => (
                            <TableRow key={order._id}>
                              <TableCell>
                                {order._id.substring(20, 24)}
                              </TableCell>
                              <TableCell>{order.createdAt}</TableCell>
                              <TableCell>{order.totalPrice}</TableCell>
                              <TableCell>
                                {order.isPaid
                                  ? `paid at ${order.paidAt}`
                                  : 'not paid'}
                              </TableCell>
                              <TableCell>
                                {order.isdelivered
                                  ? `delivered at ${order.deliveredAt}`
                                  : 'not delivered'}
                              </TableCell>
                              <TableCell>
                                <Button
                                  href={`/order/${order._id}`}
                                  variant='contained'
                                >
                                  Details
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  )}
                </ListItem>
              </List>
            </Card>
          </Box>
        </Grid>
      </Grid>
    </Layout>
  )
}

export default dynamic(() => Promise.resolve(OrderHistory), { ssr: false })
