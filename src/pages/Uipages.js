import React from 'react'
import ThemeProvider from '../Reuse/ThemeProvider'
import { CssBaseline } from '@mui/material'
import Header from '../Comp/Header'
import AdminPanel from './AdminPanel'

const Uipages = () => {
  return (
    <ThemeProvider>
    <CssBaseline />
    <Header />
    <AdminPanel />
  </ThemeProvider>
  )
}

export default Uipages
