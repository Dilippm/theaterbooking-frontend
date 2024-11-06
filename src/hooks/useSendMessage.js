import { useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import useConversation from "../zustand/useConversation";
import { sendChatMessage } from "../api/ChatApi";
import { setMessages } from "../redux/userSlice";
const useSendMessage = () => {
	const [loading, setLoading] = useState(false);
	const { messages, setMessages, selectedConversation } = useConversation();
	const token = useSelector((state) => state.user?.token);
    const selectedId = selectedConversation._id


	const sendMessage = async (message) => {
		setLoading(true);
		try {
			const data = await sendChatMessage(token,selectedId,message)
			console.log(data)
	
			if (data.error) throw new Error(data.error);

			setMessages([...messages, data]);
		} catch (error) {
			
		} finally {
			setLoading(false);
		}
	};

	return { sendMessage, loading };
};
export default useSendMessage;