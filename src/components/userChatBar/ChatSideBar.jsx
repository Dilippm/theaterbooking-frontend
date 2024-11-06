import React from 'react'
import Conversations from "./Conversations";
import './sideBar.css'
import SearchInput from "./SearchInput";
const ChatSideBar = () => {
  return (
   <div className="chat-sidebar">
      	<div className='sidebar'>
  <SearchInput />
  <div className='divider'></div>
  <Conversations />
</div>
   </div>

 
  

  )
}

export default ChatSideBar