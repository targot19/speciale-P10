import { useState } from "react";
import ChatHistory from "./ChatHistory";
import ChatInputField from "./ChatInputField";
import { useSession } from "../../context/SessionContext";
import { fetchChatGPTResponse } from "../../api/openai";


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

const ChatWindow = ({ questionNumber, promptInstruction, chatInput, setChatInput, messageHistory: overrideHistory, isActive = true, onChatbotReply }) => {
    const { sessionHistory, addChatMessage  } = useSession(); // Session-wide history. Changes to sessionHistory = automatic re-render
    const [currentChatHistory, setCurrentChatHistory] = useState([]); // Temporary history for current conversation
    const [isLoading, setIsLoading] = useState(false); // Loader, w. start value "false"

    const messageHistory = overrideHistory ?? (sessionHistory.chatHistory[questionNumber] || []);
    // If a history is passed as prop, use this. If not, use find sessionHistory through question number. If nothing is returned, return an empty array.


    // Function responsible for sending message to API + updating sessionHistory
    const handleSendMessage = async(inputText) => {
        if (!inputText.trim()) return; // Ignore empty input

        setIsLoading(true); // Start loader in UI

        try {
            // 1. Log user message in session-wide history (SessionHistory):
            const userMessage = { type: "message", role: "user", text: inputText }; // Format input
            addChatMessage(questionNumber, userMessage); // Adds user input to SessionHistory

            // 2. Prepare and send userMessage + currentChatHistory + promptInstruction to API history
            const messages = [
                { role: "system", content: promptInstruction },
                ...currentChatHistory, // Insert items from the currentHistory array.
                { role: "user", content: inputText }
            ]

            //console.log("PromptInstruction:", promptInstruction);
            //console.log("ChatInput:", inputText);
            //console.log("Sendt til chatten: ", messages)

            // Fetch a response from API
            const chatbotReply = await fetchChatGPTResponse(messages);

            // 3. Log chatBot message in session-wide history
            const chatbotMessage = { type: "message", role: "bot", text: chatbotReply } // Format response for chatHistory
            addChatMessage(questionNumber, chatbotMessage); // Add to chatHistory

            // 4. Update temporary currentChatHistory (with user input + bot response formatted for OpenAI)
            setCurrentChatHistory(prev => [...prev, { role: "user", content: inputText }, { role: "assistant", content: chatbotReply }]);

            // Notify parent component that the chatbot has replied
            if (onChatbotReply) {
                console.log("Chatbot replied. Triggering onChatbotReply callback."); // Debugging, we can remove
                onChatbotReply();
            }

        } catch {
            console.error("💥 Error:", err);
        } finally {
            setIsLoading(false); // Done loading
        }

    }


    return (
        <div className="flex flex-col justify-between h-full w-[100%] p-3 pt-0 bg-[#d9d9d9] rounded-lg">
            <ChatHistory 
                messageHistory={messageHistory} 
                isLoading={isLoading}
            />
            <ChatInputField  
                onSend={handleSendMessage} /* Pass function that handles API call + logging to session history */
                isLoading={isLoading}
                isActive={isActive}
                chatInput={chatInput}
                setChatInput={setChatInput}
            />
        </div>
    );
};

export default ChatWindow;

// tried to make styling below, but it went across experiment section as well
// <div style={{ opacity: 0.5 }} className="flex flex-col justify-between h-full w-[70%] p-5 pt-0 bg-[#d9d9d9] rounded-lg">