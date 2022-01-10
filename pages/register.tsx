import Grid from '@mui/material/Grid'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Typography from '@mui/material/Typography'
import Layout from '../components/Layout/Layout'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Link from 'next/link'
import { useContext, useEffect, useState } from 'react'
import { Store } from '../utils/store'
import { useRouter } from 'next/router'
import axios from 'axios'

const Register = () => {
  const router = useRouter()
  const { redirect } = router.query
  const { state, dispatch } = useContext(Store)
  const { userInfo } = state
  useEffect(() => {
    if (userInfo) {
      router.push('/')
    }
  }, [])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const submitHandler = async (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      alert('Password dont match')
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
      alert(err.response.data ? err.response.data.message : err.message)
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

        <form onSubmit={submitHandler}>
          <List>
            <ListItem>
              <TextField
                fullWidth
                label='Name'
                id='Name'
                variant='outlined'
                inputProps={{ type: 'Name' }}
                onChange={(e) => setName(e.target.value)}
              />
            </ListItem>
            <ListItem>
              <TextField
                variant='outlined'
                fullWidth
                id='email'
                label='Email'
                inputProps={{ type: 'email' }}
                onChange={(e) => setEmail(e.target.value)}
              ></TextField>
            </ListItem>
            <ListItem>
              <TextField
                fullWidth
                label='Pasword'
                id='password'
                variant='outlined'
                inputProps={{ type: 'password' }}
                onChange={(e) => setPassword(e.target.value)}
              />
            </ListItem>
            <ListItem>
              <TextField
                fullWidth
                label='confirm Password'
                id='confirmPassword'
                variant='outlined'
                inputProps={{ type: 'password' }}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
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
