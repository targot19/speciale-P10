import { useState } from "react";
import ChatHistory from "./ChatHistory";
import ChatInputField from "./ChatInputField";


// Bare for testing purposes - tænker den skal opbevares et andet sted, evt. i 
const testHistory =
[
    { type: "message", role: "user", text: "What's the capital of Peru?" },
    { type: "message", role: "bot", text: "The capital of Peru is Lima." },
    { type: "answerCheck1" },
    { type: "message", role: "user", text: "Are you sure?" },
    { type: "message", role: "bot", text: "Yes, Lima is the capital of Peru." },
    { type: "answerCheck2" }
  ]

// Should call ChatHistory + ChatInputField
const ChatWindow = () => {

    // We'll need to get the chat history dynamically, from somewhere (context, local store...)
    // const [messageHistory, SetMessageHistory] = useState([]) // This will set whatever history we want to show, at this point - current or for the category.

    return (
        <div className="flex flex-col justify-between h-full w-[70%] p-5 pt-0 bg-[#d9d9d9] rounded-lg">
            <ChatHistory messageHistory={testHistory} />
            <ChatInputField />
        </div>
    )
}

export default ChatWindow