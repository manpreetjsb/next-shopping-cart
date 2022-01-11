import Grid from '@mui/material/Grid'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Typography from '@mui/material/Typography'
import Layout from '../components/Layout/Layout'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Link from 'next/link'
import { useContext, useEffect } from 'react'
import { Store } from '../utils/store'
import { useRouter } from 'next/router'
import axios from 'axios'
import { Controller, useForm } from 'react-hook-form'
import { useSnackbar } from 'notistack'

export interface Iregistration {
  name: string
  email: string
  password: string
  confirmPassword: string
}

const Register: React.FC = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm()
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const router = useRouter()
  const { redirect } = router.query
  const { state, dispatch } = useContext(Store)
  const { userInfo } = state
  useEffect(() => {
    if (userInfo) {
      router.push('/')
    }
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
      const { data } = await axios.post('/api/users/register', {
        name,
        email,
        password,
      })
      dispatch({ type: 'USER_LOGIN', payload: data })
      router.push(redirect || '/')
    } catch (err: any) {
      enqueueSnackbar(err.response ? err.response.data.message : err.message, {
        variant: 'error',
      })
    }
  }
  return (
    <Layout title='Register'>
      <Box sx={{ width: '75%', mx: 'auto' }}>
        <Grid mt={2} mb={2}>
          <Typography component='h1' variant='h1'>
            Register
          </Typography>
        </Grid>

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
              <Controller
                name='confirmPassword'
                control={control}
                defaultValue=''
                rules={{
                  required: true,
                  minLength: 6,
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
                        ? errors.confirmPassword.type === 'minLength'
                          ? 'Confirm Password length is more then 5'
                          : 'Confirm Password is required'
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
                REGISTER
              </Button>
            </ListItem>
            <ListItem>
              Already have an account? &nbsp;
              <Link href={`/login?redirect=${redirect || '/'}`}>
                <a>Login</a>
              </Link>
            </ListItem>
          </List>
        </form>
      </Box>
    </Layout>
  )
}
export default Register
