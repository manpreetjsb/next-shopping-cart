import React, { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import RadioGroup from '@mui/material/RadioGroup'
import Radio from '@mui/material/Radio'
import FormControl from '@mui/material/FormControl'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Typography from '@mui/material/Typography'
import CheckoutProcessBar from '../components/CheckoutProcessBar'
import Layout from '../components/Layout/Layout'
import { Store } from '../utils/store'
import FormControlLabel from '@mui/material/FormControlLabel'
import Button from '@mui/material/Button'
import { useSnackbar } from 'notistack'

const Payments = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
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

  const submitHandler = (e: { preventDefault: () => void }) => {
    closeSnackbar()
    e.preventDefault()
    if (!paymentMethod) {
      enqueueSnackbar('Payment method is required', { variant: 'error' })
    } else {
      dispatch({ type: 'SAVE_PAYMENT_METHOD', payload: paymentMethod })
      router.push('/placeorder')
    }
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
            <ListItem>
              <FormControl component='fieldset'>
                <RadioGroup
                  aria-label='Payment Method'
                  name='paymentMethod'
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                >
                  <FormControlLabel
                    label='Stripe'
                    value='Stripe'
                    control={<Radio />}
                  />
                  <FormControlLabel
                    label='Cash'
                    value='Cash'
                    control={<Radio />}
                  />
                  <FormControlLabel
                    label='PayPal'
                    value='Paypal'
                    control={<Radio />}
                  />
                </RadioGroup>
              </FormControl>
            </ListItem>
            <ListItem>
              <Button
                fullWidth
                type='submit'
                variant='contained'
                color='primary'
              >
                Continue
              </Button>
            </ListItem>
            <ListItem>
              <Button
                fullWidth
                type='button'
                variant='contained'
                color='secondary'
                onClick={() => router.push('/shipping')}
              >
                Back
              </Button>
            </ListItem>
          </List>
        </form>
      </Box>
    </Layout>
  )
}
export default Payments
