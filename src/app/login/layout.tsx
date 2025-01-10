import React from 'react'
import { AuthProvider } from '../context/AuthContext';
const layout = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
  return (
    <AuthProvider>{children}</AuthProvider>
  )
}

export default layout