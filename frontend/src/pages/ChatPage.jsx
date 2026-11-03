import React from 'react'
import useAuthStore from '../store/useAuthStore.js';

const ChatPage = () => {
    const { authUser, isLoggedIn, logging} = useAuthStore();

  return (
    <div>
      <h1> Hello from chatpage </h1>
    </div>
  )
}

export default ChatPage;



