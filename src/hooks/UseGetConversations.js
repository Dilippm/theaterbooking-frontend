import { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { getChatUsers } from "../api/ChatApi";
const useGetConversations = () => {
	const [loading, setLoading] = useState(false);
	const [conversations, setConversations] = useState([]);
    const token = useSelector((state) => state.user?.token);
	useEffect(() => {
		const getConversations = async () => {
			setLoading(true);
			try {
				
				const data = await getChatUsers(token)
				if (data.error) {
					throw new Error(data.error);
				}
				setConversations(data);
			} catch (error) {
				console.error(error.message);
			} finally {
				setLoading(false);
			}
		};

		getConversations();
	}, []);

	return { loading, conversations };
};
export default useGetConversations;