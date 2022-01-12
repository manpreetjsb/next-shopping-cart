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
import { useRouter } from 'next/router'

const PlaceOrder: React.FC = () => {
  const router = useRouter()
  const { state, dispatch } = useContext(Store)
  const {
    cart: { cartItems },
  } = state

  return (
    <Layout title='Place Order'>
      <Grid mt={2} mb={2}>
        <Typography component='h1' variant='h1'>
          Place Order
        </Typography>
      </Grid>

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
        </Grid>
        <Grid item md={3} xs={12}>
          <Card>
            <List>
              <ListItem>
                <Typography>Order Summary</Typography>
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
