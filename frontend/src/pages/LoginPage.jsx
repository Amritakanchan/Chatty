import React from 'react'
import useAuthStore from '../store/useAuthStore.js';

const LoginPage = () => {
  const { authUser, isLoggedIn, logging} = useAuthStore();

  return (
    <>
     <h1>Hello from login</h1>
    </>
  )
}

export default LoginPage
