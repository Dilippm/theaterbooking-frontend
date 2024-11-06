import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import useConversation from "../../zustand/useConversation";
import './MessageContainer.css'; // Import the CSS file
import { TiMessages } from "react-icons/ti";

const MessageContainer = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();

  useEffect(() => {
    // Cleanup function to reset selected conversation on unmount
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);

  return (
    <div className="message-container">
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          <div className="header">
            <span className="label-text">To:</span> <span className="recipient-name">{selectedConversation.fullName}</span>
          </div>
          <Messages />
          <MessageInput />
        </>
      )}
    </div>
  );
};

const NoChatSelected = () => {
	const name = useSelector((state) => state.user?.user?.username);
	return (
	  <div className="no-chat-container">
		<div className="message-box">
		  <p className="welcome-message">Welcome 👋 {name} ❄</p>
		  <p className="select-chat-message">Select a chat to start messaging</p>
		  <TiMessages className="message-icon" />
		</div>
	  </div>
	);
  };

export default MessageContainer;
