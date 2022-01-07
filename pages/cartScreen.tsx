import React, { useContext } from 'react'
import Typography from '@mui/material/Typography'
import Layout from '../components/Layout/Layout'
import { Store } from '../utils/store'
import Link from '@mui/material/Link'
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

const CartScreen: React.FC = () => {
  const { state } = useContext(Store)
  const { cartItems } = state.cart
  console.log('state', state)
  return (
    <Layout title='Shopping Cart'>
      <Grid mt={2} mb={2}>
        <Typography component='h1' variant='h1'>
          Shopping Cart
        </Typography>
      </Grid>
      {cartItems.length === 0 ? (
        <div>
          Cart is empty. <Link href='/'>Go to Products</Link>
        </div>
      ) : (
        <Grid container spacing={1}>
          <Grid item md={9} xs={12}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Image</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell align='right'>Quantity</TableCell>
                    <TableCell align='right'>Price</TableCell>
                    <TableCell align='right'>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cartItems.map((item) => {
                    return (
                      <TableRow>
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
                        <TableCell align='right'>
                          <Typography>{item.quantity}</Typography>
                        </TableCell>
                        <TableCell align='right'>
                          <Typography>{item.price} €</Typography>
                        </TableCell>
                        <TableCell align='right'>
                          <Typography>
                            <Button variant='contained' color='primary'>
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
                  <Button fullWidth color='secondary' variant='contained'>
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
