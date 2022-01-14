import Grid from '@mui/material/Grid'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Typography from '@mui/material/Typography'
import Layout from '../components/Layout/Layout'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import { useContext, useEffect } from 'react'
import { Store } from '../utils/store'
import { useRouter } from 'next/router'
import { Controller, useForm } from 'react-hook-form'
import CheckoutProcessBar from '../components/CheckoutProcessBar'
import Cookies from 'js-cookie'

export interface Iregistration {
  name: string
  email: string
  password: string
  confirmPassword: string
}

const Shipping: React.FC = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm()

  const router = useRouter()
  const { state, dispatch } = useContext(Store)
  const {
    userInfo,
    cart: { shippingAddress },
  } = state
  useEffect(() => {
    console.log('userInfo', userInfo)
    /* if (userInfo) {
      router.push('/login?redirect=/shipping')
    } */
    setValue('fullname', shippingAddress.fullName)
    setValue('address', shippingAddress.address)
    setValue('city', shippingAddress.city)
    setValue('postalCode', shippingAddress.postalCode)
    setValue('country', shippingAddress.country)
  }, [])

  const submitHandler = ({ fullName, address, city, postalCode, country }) => {
    dispatch({
      type: 'SAVE_SHIPPING_ADDRESS',
      payload: { fullName, address, city, postalCode, country },
    })
    //localStorage.setItem({ fullName, address, city, postalCode, country })
    //Cookies.set('')
    router.push('/payments')
  }
  return (
    <Layout title='Shipping Address'>
      <Grid mt={3} mb={3}>
        <CheckoutProcessBar activeStep={1} />
      </Grid>
      <Box sx={{ width: '75%', mx: 'auto' }}>
        <Grid mt={2} mb={2}>
          <Typography component='h1' variant='h1'>
            Shipping Address
          </Typography>
        </Grid>

        <form onSubmit={handleSubmit(submitHandler)}>
          <List>
            <ListItem>
              <Controller
                name='fullName'
                control={control}
                defaultValue=''
                rules={{
                  required: true,
                  minLength: 2,
                }}
                render={({ field }) => (
                  <TextField
                    variant='outlined'
                    fullWidth
                    id='fullName'
                    label='Full Name'
                    error={Boolean(errors.fullName)}
                    helperText={
                      errors.fullName
                        ? errors.fullName.type === 'minLength'
                          ? 'Full Name length should be more then 1'
                          : 'Full Name is required'
                        : ''
                    }
                    {...field}
                  ></TextField>
                )}
              ></Controller>
            </ListItem>
            <ListItem>
              <Controller
                name='address'
                control={control}
                defaultValue=''
                rules={{
                  required: true,
                  minLength: 2,
                }}
                render={({ field }) => (
                  <TextField
                    variant='outlined'
                    fullWidth
                    id='address'
                    label='Address'
                    error={Boolean(errors.address)}
                    helperText={
                      errors.address
                        ? errors.address.type === 'minLength'
                          ? 'Address length should be more then 1'
                          : 'Address is required'
                        : ''
                    }
                    {...field}
                  ></TextField>
                )}
              ></Controller>
            </ListItem>
            <ListItem>
              <Controller
                name='city'
                control={control}
                defaultValue=''
                rules={{
                  required: true,
                  minLength: 2,
                }}
                render={({ field }) => (
                  <TextField
                    variant='outlined'
                    fullWidth
                    id='city'
                    label='City'
                    error={Boolean(errors.city)}
                    helperText={
                      errors.city
                        ? errors.city.type === 'minLength'
                          ? 'City length should be more then 1'
                          : 'City is required'
                        : ''
                    }
                    {...field}
                  ></TextField>
                )}
              ></Controller>
            </ListItem>
            <ListItem>
              <Controller
                name='postalCode'
                control={control}
                defaultValue=''
                rules={{
                  required: true,
                  minLength: 2,
                }}
                render={({ field }) => (
                  <TextField
                    variant='outlined'
                    fullWidth
                    id='postalCode'
                    label='Postal Code'
                    error={Boolean(errors.postalCode)}
                    helperText={
                      errors.postalCode
                        ? errors.postalCode.type === 'minLength'
                          ? 'postalCode should be more then 1'
                          : 'postalCode is required'
                        : ''
                    }
                    {...field}
                  ></TextField>
                )}
              ></Controller>
            </ListItem>
            <ListItem>
              <Controller
                name='country'
                control={control}
                defaultValue=''
                rules={{
                  required: true,
                  minLength: 2,
                }}
                render={({ field }) => (
                  <TextField
                    variant='outlined'
                    fullWidth
                    id='country'
                    label='Country'
                    error={Boolean(errors.country)}
                    helperText={
                      errors.country
                        ? errors.country.type === 'minLength'
                          ? 'country should be more then 1'
                          : 'country is required'
                        : ''
                    }
                    {...field}
                  ></TextField>
                )}
              ></Controller>
            </ListItem>
            <ListItem>
              <Button
                color='primary'
                fullWidth
                type='submit'
                variant='contained'
              >
                Continue
              </Button>
            </ListItem>
          </List>
        </form>
      </Box>
    </Layout>
  )
}
export default Shipping
