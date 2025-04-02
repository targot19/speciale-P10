import { useState } from "react";
import ChatHistory from "./ChatHistory";
import ChatInputField from "./ChatInputField";

// Should call ChatHistory + ChatInputField
const ChatWindow = ({ messageHistory }) => {

    // We'll need to get the chat history dynamically, from somewhere (context, local store...)
    // const [messageHistory, SetMessageHistory] = useState([]) // This will set whatever history we want to show, at this point - current or for the category.

    return (
        <div className="flex flex-col justify-between h-full w-[70%] p-5 pt-0 bg-[#d9d9d9] rounded-lg">
            <ChatHistory messageHistory={messageHistory} />
            <ChatInputField />
        </div>
    )
}

export default ChatWindow