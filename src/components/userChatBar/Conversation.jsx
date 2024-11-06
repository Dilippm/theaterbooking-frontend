import { useSelector, useDispatch } from "react-redux";
import useConversation from "../../zustand/useConversation";
import { useSocketContext } from "../../context/socketContext.jsx";
import './conversation.css';

const Conversation = ({ conversation, lastIdx, emoji }) => {
  const dispatch = useDispatch();
  const { selectedConversation, setSelectedConversation } = useConversation();
  const { onlineUsers } = useSocketContext();
  console.log("users:",onlineUsers)
  console.log(conversation)
  const isOnline = onlineUsers.includes(conversation._id);
  console.log("ison:",isOnline)
  const isSelected = selectedConversation?._id === conversation._id;

  // Handle selecting a conversation
  const handleSelectConversation = () => {
    setSelectedConversation(conversation);
  };

  return (
    <>
      <div
        className={`conversation-item ${isSelected ? 'selected' : ''}`}
        onClick={handleSelectConversation}
      >
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className='avatar-image'>
            <img src={conversation.userimage} alt='user avatar' />
           
          </div>
        </div>

        <div className='conversation-details'>
          <div className='conversation-header'>
            <p className={`username ${isSelected ? 'selected' : ''}`}>{conversation.username}</p>
            <span className='emoji'>{emoji}</span>
          </div>
        </div>
      </div>

      {!lastIdx && <div className='divider' />}
    </>
  );
};

export default Conversation;
