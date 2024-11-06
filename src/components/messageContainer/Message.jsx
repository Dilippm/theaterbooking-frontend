
 import { extractTime } from "../../utils/extractTime";

import { useSelector } from "react-redux";
import useConversation from "../../zustand/useConversation";
import './Message.css'; // Import the CSS file

const Message = ({ message }) => {

	const user = useSelector((state) => state.user);
	const { selectedConversation } = useConversation();


	const fromMe = message.senderId === user.user.id;

	const formattedTime = extractTime(message.createdAt);
	const chatClassName = fromMe ? "chat chat-end" : "chat chat-start"; // Dynamic class names
	const profilePic = fromMe ? user.user.userimage : selectedConversation.userimage;
	const bubbleBgColor = fromMe ? "bubble-sent" : "bubble-received"; // Class for background color

	return (
		<div className={chatClassName}>
			<div className='chat-image avatar'>
				<div className='avatar-img'>
					<img alt='User avatar' src={profilePic} />
				</div>
			</div>
			<div className={`chat-bubble ${bubbleBgColor}`}>
			{message.message}
			</div>
			<div className='chat-footer'>
				{formattedTime}
			</div>
		</div>
	);
};

export default Message;
