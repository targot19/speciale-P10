import { useState } from "react";
import ChatHistory from "./ChatHistory";
import ChatInputField from "./ChatInputField";
import { useSession } from "../../context/SessionContext";

// Should call ChatHistory + ChatInputField
const ChatWindow = ({ questionNumber, promptInstruction }) => {

    //Access chatHistory from sessionHistory (Will listen for changes, and automatically re-render)
    const { sessionHistory } = useSession();
    const messageHistory = sessionHistory.chatHistory[questionNumber] || []; // If nothing is returned, return an empty array

    return (
        <div className="flex flex-col justify-between h-full w-[70%] p-5 pt-0 bg-[#d9d9d9] rounded-lg">
            <ChatHistory messageHistory={messageHistory} />
            <ChatInputField  
                questionNumber={questionNumber}
                promptInstruction={promptInstruction}
            />
        </div>
    )
}

export default ChatWindow