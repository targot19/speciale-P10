import { useState } from "react";
import ChatHistory from "./ChatHistory";
import ChatInputField from "./ChatInputField";
import { styled } from "@mui/material";
import { useSession } from "../../context/SessionContext";

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
    );
};

export default ChatWindow;

// tried to make styling below, but it went across experiment section as well
// <div style={{ opacity: 0.5 }} className="flex flex-col justify-between h-full w-[70%] p-5 pt-0 bg-[#d9d9d9] rounded-lg">