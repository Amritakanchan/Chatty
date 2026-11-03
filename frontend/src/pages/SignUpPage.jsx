import React from 'react'
import useAuthStore from '../store/useAuthStore.js';

const SignUpPage = () => {
    const { authUser, isLoggedIn, logging} = useAuthStore();
  return (
    <div>
      <h1>Hello from signup</h1>
    </div>
  )
}

export default SignUpPage
