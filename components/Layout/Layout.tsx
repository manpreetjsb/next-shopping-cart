import React from 'react'
import Head from 'next/head'
import { Box } from '@mui/system'
import { Grid, Link, Toolbar, Typography } from '@mui/material'
import NextLink from 'next/link'
import { AppBarStyle, ContainerStyle, FooterStyle, Logo } from './Layout.styles'

export default function Layout({ title, description, children }) {
  return (
    <div>
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
                <NextLink href='/cart' passHref>
                  <Link>Cart</Link>
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
    </div>
  )
}
