import React, { useContext } from 'react'
import Head from 'next/head'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import NextLink from 'next/link'
import Badge from '@mui/material/Badge'
import { AppBarStyle, ContainerStyle, FooterStyle, Logo } from './Layout.styles'
import { Store } from '../../utils/store'

interface props {
  title: string
  description?: string
  children?: JSX.Element | JSX.Element[]
}

const Layout: React.FC<props> = ({ title, description, children }) => {
  const { state, dispatch } = useContext(Store)
  const { cart } = state
  console.log(state)
  return (
    <>
      <Head>
        <title>{title ? `${title} - Flying Money` : 'Flying Money'}</title>
        {description && <meta name='description' content={description}></meta>}
      </Head>
      <AppBarStyle position='static'>
        <Toolbar>
          <Grid container direction='row' justifyContent='space-between'>
            <Grid item>
              <Link href='/'>
                <Logo>Flying Money</Logo>
              </Link>
            </Grid>
            <Grid item display='flex'>
              <Box pr={2}>
                <NextLink href='/cartscreen' passHref>
                  <Link>
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
                  </Link>
                </NextLink>
              </Box>
              <Box>
                <Link href='/login'>Login</Link>
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
