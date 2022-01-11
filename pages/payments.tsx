import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Typography from '@mui/material/Typography'
import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import CheckoutProcessBar from '../components/CheckoutProcessBar'
import Layout from '../components/Layout/Layout'
import { Store } from '../utils/store'

const Payments = () => {
  const router = useRouter()
  const [paymentMethod, setPaymentMethod] = useState('')
  const { state, dispatch } = useContext(Store)
  const {
    cart: { shippingAddress },
  } = state
  useEffect(() => {
    if (!shippingAddress.address) {
      router.push('/shipping')
    } else {
      setPaymentMethod(localStorage.getItem('paymentMethod') || '')
    }
  }, [])

  const submitHandler = (e) => {
    e.preventDefault()
  }
  return (
    <Layout title='Payment Mathod'>
      <Grid mt={3} mb={3}>
        <CheckoutProcessBar activeStep={2} />
      </Grid>
      <Box sx={{ width: '75%', mx: 'auto' }}>
        <Grid mt={2} mb={2}>
          <Typography component='h1' variant='h1'>
            Payment Mathod
          </Typography>
        </Grid>
        <form onSubmit={submitHandler}>
          <List>
            <ListItem></ListItem>
          </List>
        </form>
      </Box>
    </Layout>
  )
}
export default Payments
