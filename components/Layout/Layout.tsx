import React from 'react'
import Head from 'next/head'
import { Toolbar, Typography } from '@mui/material'

import { AppBarStyle, ContainerStyle, FooterStyle } from './Layout.styles'

export default function Layout({ children }) {
  return (
    <div>
      <Head>
        <title>Flying Money</title>
      </Head>
      <AppBarStyle position='static'>
        <Toolbar>
          <Typography>Flying Money</Typography>
        </Toolbar>
      </AppBarStyle>
      <ContainerStyle>{children}</ContainerStyle>
      <FooterStyle>
        <Typography>All rights reserved. © 2022.</Typography>
      </FooterStyle>
    </div>
  )
}
