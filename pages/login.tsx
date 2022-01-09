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
import { useState } from 'react'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post('/api/users/login', {
        email,
        password,
      })
      alert('succss login')
    } catch (err) {
      alert(err.response.data ? err.response.data.message : err.message)
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

        <form onSubmit={submitHandler}>
          <List>
            <ListItem>
              <TextField
                fullWidth
                label='Email'
                id='email'
                variant='outlined'
                inputProps={{ type: 'email' }}
                onChange={(e) => setEmail(e.target.value)}
              />
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
              <Link href='/register'>
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
