import AppBar from '@mui/material/AppBar'
import Container from '@mui/material/Container'
import { styled } from '@mui/material/styles'
import { Typography } from '@mui/material'

export const AppBarStyle = styled(AppBar)`
  background-color: #203040;
  color: #ffffff;
  :hover {
    color: #ffffff;
  }
`
export const ContainerStyle = styled(Container)`
  min-height: 80vh;
`

export const FooterStyle = styled('footer')`
  text-align: center;
`
export const Logo = styled(Typography)`
  color: white;
  font-size: 1.5rm;
`
