import Grid from '@mui/material/Grid'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Typography from '@mui/material/Typography'
import Layout from '../components/Layout/Layout'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Link from 'next/link'
import axios from 'axios'
import { useContext, useState, useEffect } from 'react'
import { Store } from '../utils/store'
import { useRouter } from 'next/router'
import { Controller, useForm } from 'react-hook-form'
import { useSnackbar } from 'notistack'

const Login = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm()
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const router = useRouter()
  const { redirect } = router.query //login?redirect to shopping
  const { state, dispatch } = useContext(Store)
  const { userInfo } = state
  useEffect(() => {
    if (userInfo) {
      router.push('/')
    }
  }, [])

  const submitHandler = async ({ email, password }) => {
    console.log('email', password)
    closeSnackbar()
    try {
      const { data } = await axios.post('/api/users/login', {
        email,
        password,
      })
      console.log('hi')
      console.log(data)
      dispatch({ type: 'USER_LOGIN', payload: JSON.stringify(data) })
      router.push(redirect || '/')
    } catch (err) {
      enqueueSnackbar(err.response ? err.response.data.message : err.message, {
        variant: 'error',
      })
    }
  }

  return (
    <Layout title='Login'>
      <Box sx={{ width: '75%', mx: 'auto' }}>
        <Grid mt={2} mb={2}>
          <Typography component='h1' variant='h1'>
            Login
          </Typography>
        </Grid>

        <form onSubmit={handleSubmit(submitHandler)}>
          <List>
            <ListItem>
              <Controller
                name='email'
                control={control}
                defaultValue=''
                rules={{
                  required: true,
                  pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                }}
                render={({ field }) => (
                  <TextField
                    variant='outlined'
                    fullWidth
                    id='email'
                    label='Email'
                    inputProps={{ type: 'email' }}
                    error={Boolean(errors.email)}
                    helperText={
                      errors.email
                        ? errors.email.type === 'pattern'
                          ? 'Email is not valid'
                          : 'Email is required'
                        : ''
                    }
                    {...field}
                  ></TextField>
                )}
              ></Controller>
            </ListItem>
            <ListItem>
              <Controller
                name='password'
                control={control}
                defaultValue=''
                rules={{
                  required: true,
                  minLength: 6,
                }}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    label='Password'
                    id='password'
                    variant='outlined'
                    error={Boolean(errors.password)}
                    helperText={
                      errors.password
                        ? errors.password.type === 'minLength'
                          ? 'password length is more then 5'
                          : 'password is required'
                        : ''
                    }
                    inputProps={{ type: 'password' }}
                    {...field}
                  />
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
                LOGIN
              </Button>
            </ListItem>
            <ListItem>
              Don't have an account? &nbsp;
              <Link href={`/register?redirect=${redirect || '/'}`}>
                <a>Register</a>
              </Link>
            </ListItem>
          </List>
        </form>
      </Box>
    </Layout>
  )
}

export default Login
