import { useState } from "react";
import { BsSend } from "react-icons/bs";
import './MessageInput.css'; // Import the CSS file
import useSendMessage from "../../hooks/useSendMessage";


const MessageInput = () => {
	const [message, setMessage] = useState("");
	const { loading, sendMessage } = useSendMessage();
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!message) return;
		await sendMessage(message);
		setMessage("");
		
	};
	return (
		<form className='message-input-form' onSubmit={handleSubmit}>
			<div className='input-container'>
				<input
					type='text'
					className='message-input'
					placeholder='Send a message'
					value={message}
					onChange={(e) => setMessage(e.target.value)}
				/>
				<button type='submit' className='send-button'>
					<BsSend />
				</button>
			</div>
		</form>
	);
};

export default MessageInput;
