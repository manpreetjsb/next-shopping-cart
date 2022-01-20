import React, { useContext, useEffect } from 'react'
import dynamic from 'next/dynamic'
import Typography from '@mui/material/Typography'
import Link from 'next/link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import { useRouter } from 'next/router'
import axios from 'axios'
import { Store } from '../utils/store'

import Layout from '../components/Layout/Layout'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { Controller, useForm } from 'react-hook-form'
import { useSnackbar } from 'notistack'
import { getError } from '../utils/error'
import Cookies from 'js-cookie'

const Profile = () => {
  const { state, dispatch } = useContext(Store)
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm()
  const { userInfo } = state
  const { router } = useRouter
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()

  useEffect(() => {
    if (!userInfo) {
      return router.push('/login')
    }
    setValue('name', userInfo.name)
    setValue('email', userInfo.email)
  }, [])

  const submitHandler = async ({ name, email, password, confirmPassword }) => {
    closeSnackbar()
    if (password !== confirmPassword) {
      enqueueSnackbar('Password dont match', {
        variant: 'error',
      })
      return
    }
    try {
      const { data } = await axios.put('/api/users/profile', {
        name,
        email,
        password,
      })
      dispatch({ type: 'USER_LOGIN', payload: data })
      Cookies.set('userInfo', data)
      enqueueSnackbar('Profile updated successfully', {
        variant: 'success',
      })
    } catch (err: any) {
      enqueueSnackbar(getError(err), {
        variant: 'error',
      })
    }
  }
  return (
    <Layout title='Profile'>
      <Grid container spacing={2} mt={3}>
        <Grid item md={3} xs={12}>
          <Box>
            <Card>
              <List>
                <ListItem selected button>
                  <Link href={'/profile'}>
                    <a>User Profile</a>
                  </Link>
                </ListItem>
                <ListItem button>
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
                    Profile
                  </Typography>
                </ListItem>
                <ListItem>
                  <form onSubmit={handleSubmit(submitHandler)}>
                    <List>
                      <ListItem>
                        <Controller
                          name='name'
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
                              id='name'
                              label='Name'
                              inputProps={{ type: 'name' }}
                              error={Boolean(errors.name)}
                              helperText={
                                errors.name
                                  ? errors.name.type === 'minLength'
                                    ? 'Name length should be more then 1'
                                    : 'Name is required'
                                  : ''
                              }
                              {...field}
                            ></TextField>
                          )}
                        ></Controller>
                      </ListItem>
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
                            validate: (value) =>
                              value === '' ||
                              value.length > 5 ||
                              'Password length is more than 5',
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
                                  ? 'password length is more then 5'
                                  : ''
                              }
                              inputProps={{ type: 'password' }}
                              {...field}
                            />
                          )}
                        ></Controller>
                      </ListItem>
                      <ListItem>
                        <Controller
                          name='confirmPassword'
                          control={control}
                          defaultValue=''
                          rules={{
                            validate: (value) =>
                              value === '' ||
                              value.length > 5 ||
                              'Confirm Password length is more than 5',
                          }}
                          render={({ field }) => (
                            <TextField
                              fullWidth
                              label='Confirm Password'
                              id='confirmPassword'
                              variant='outlined'
                              error={Boolean(errors.confirmPassword)}
                              helperText={
                                errors.confirmPassword
                                  ? 'Confirm Password length is more then 5'
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
                          UPDATE
                        </Button>
                      </ListItem>
                    </List>
                  </form>
                </ListItem>
              </List>
            </Card>
          </Box>
        </Grid>
      </Grid>
    </Layout>
  )
}

export default dynamic(() => Promise.resolve(Profile), { ssr: false })
