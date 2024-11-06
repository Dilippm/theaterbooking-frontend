import Conversation from "./Conversation";
import { getRandomEmoji } from "../../utils/emojis";
import './sideBar.css'
import useGetConversations from "../../hooks/UseGetConversations";
const Conversations = () => {
	const { loading, conversations } = useGetConversations();

	return (
        <div className="conversation-container">
			{conversations.map((conversation, idx) => (
				<Conversation
					key={conversation._id}
					conversation={conversation}
					emoji={getRandomEmoji()}
					lastIdx={idx === conversations.length - 1}
				/>
			))}

{loading ? <span className="loading-spinner"></span> : null}

		</div>
	);
};
export default Conversations;