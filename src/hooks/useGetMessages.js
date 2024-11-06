import { useEffect, useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import useConversation from "../zustand/useConversation";
import { getChatMessages } from "../api/ChatApi";
import { setMessages } from "../redux/userSlice";

const useGetMessages = () => {
    const dispatch = useDispatch();
	const [loading, setLoading] = useState(false);
	const { messages, setMessages, selectedConversation } = useConversation();
    // const [messages, setMessages] = useState([]);
    const token = useSelector((state) => state.user?.token);
  
	const selectedId = selectedConversation?._id
	// const { messages, setMessages, selectedConversation } = useConversation();

	useEffect(() => {
		const getMessages = async () => {
			setLoading(true);
			try {
                const data = await getChatMessages(token,selectedId)
               
				if (data.error) {
					throw new Error(data.error);
				}
				setMessages(data);
				
			} finally {
				setLoading(false);
			}
		};

	
       if (selectedId) getMessages();
	}, [selectedId,setMessages]);

	return { messages, loading };
};
export default useGetMessages;