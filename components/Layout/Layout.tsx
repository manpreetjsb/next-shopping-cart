import React, { useContext, useState } from 'react'
import Head from 'next/head'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Link from 'next/link'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Badge from '@mui/material/Badge'
import { AppBarStyle, ContainerStyle, FooterStyle, Logo } from './Layout.styles'
import { Store } from '../../utils/store'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Router from 'next/router'
import { Switch } from '@mui/material'
import { ActionType } from '../../utils/store'
import Cookies from 'js-cookie'

interface props {
  title: string
  description?: string
  children?: JSX.Element | JSX.Element[]
}

const Layout: React.FC<props> = ({ title, description, children }) => {
  const { state, dispatch } = useContext(Store)
  const { cart, userInfo, darkMode } = state

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const loginClickHandler = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const loginMenuCloseHandler = () => {
    setAnchorEl(null)
  }

  const logoutClickHandler = () => {
    dispatch({ type: 'USER_LOGOUT' })
    setAnchorEl(null)
    Router.push('/')
  }
  const changeThemeHandler = () => {
    dispatch({
      mode: darkMode ? ActionType.DARK_MODE_OFF : ActionType.DARK_MODE_ON,
    })
    const newDarkMode = !darkMode

    Cookies.set('darMode', newDarkMode ? 'ON' : 'OFF')
  }

  return (
    <>
      <Head>
        <title>{title ? `${title} - Flying Money` : 'Flying Money'}</title>
        {description && <meta name='description' content={description}></meta>}
      </Head>
      <AppBarStyle position='static'>
        <Toolbar>
          <Grid
            container
            direction='row'
            justifyContent='space-between'
            alignItems='center'
          >
            <Grid item>
              <Link href='/'>
                <a>
                  <Logo>Flying Money</Logo>
                </a>
              </Link>
            </Grid>
            <Grid item display='flex' alignItems='center'>
              <Switch checked={darkMode} onChange={changeThemeHandler}></Switch>
              <Box pr={2}>
                <Link href='/cartScreen'>
                  <a>
                    {cart.cartItems.length > 0 ? (
                      <Badge
                        color='secondary'
                        badgeContent={cart.cartItems.length}
                      >
                        Cart
                      </Badge>
                    ) : (
                      'Cart'
                    )}
                  </a>
                </Link>
              </Box>
              <Box>
                {userInfo ? (
                  <>
                    <Button
                      aria-controls={open ? 'demo-positioned-menu' : undefined}
                      aria-haspopup='true'
                      aria-expanded={open ? 'true' : undefined}
                      onClick={loginClickHandler}
                      color='primary'
                      size='small'
                    >
                      {userInfo.name}
                    </Button>
                    <Menu
                      id='demo-positioned-menu'
                      anchorEl={anchorEl}
                      open={open}
                      onClose={loginMenuCloseHandler}
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                      }}
                    >
                      <MenuItem onClick={loginMenuCloseHandler}>
                        Profile
                      </MenuItem>
                      <MenuItem onClick={loginMenuCloseHandler}>
                        My account
                      </MenuItem>
                      <MenuItem onClick={logoutClickHandler}>Logout</MenuItem>
                    </Menu>
                  </>
                ) : (
                  <Link href='/login'>
                    <a>Login</a>
                  </Link>
                )}
              </Box>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBarStyle>
      <ContainerStyle>{children}</ContainerStyle>
      <FooterStyle>
        <Box m={5}>
          <Typography>All rights reserved. © 2022.</Typography>
        </Box>
      </FooterStyle>
    </>
  )
}
export default Layout
