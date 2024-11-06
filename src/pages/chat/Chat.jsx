import React from 'react';
import './chat.css';
import ChatSideBar from '../../components/userChatBar/ChatSideBar';
import MessageContainer from '../../components/messageContainer/MessageContainer';

const Chat = () => {
  return (
    <div className="chat-container">
<ChatSideBar/>
<MessageContainer/>
    </div>
  );
};

export default Chat;
