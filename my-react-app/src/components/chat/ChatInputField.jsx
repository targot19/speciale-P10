/* Used this link: https://www.tutkit.com/en/text-tutorials/1313-basic-ui-in-react-with-openai-api*/
import { useEffect, useRef, useState } from "react";
import { fetchChatGPTResponse } from "../../api/openai";
import { useSession } from "../../context/SessionContext";
import { PaperAirplaneIcon } from '@heroicons/react/24/outline';


// To do: 
// Add prompt instructions to the input
// Get Question to show up on the screen


const ChatInputField = ({ questionNumber, promptInstruction }) => {
    const [chatInput, setChatInput] = useState("");
    const { addChatMessage } = useSession(); //Access necessary functions from context

    // Function that sends user user input (+ promptInstructions) to the history + API
    const handleSubmit = async (e) => {
        if (e) e.preventDefault();
        if (!chatInput.trim()) return; //Make sure there's an input before running

        // 1. Log message in SessionHistory:
        const userMessage = { type: "message", role: "user", text: chatInput }
        addChatMessage(questionNumber, userMessage); // Adds user input to SessionHistory
        setChatInput(""); // reset input

        // 2. Send userMessage + promptInstruction to API
        const messages = [
            { role: "system", content: promptInstruction },
            { role: "user", content: chatInput }
        ]

        console.log("🧠 PromptInstruction:", promptInstruction);
        console.log("📝 ChatInput:", chatInput);

        const chatbotReply = await fetchChatGPTResponse(messages); // Fetch a response from API
        const chatbotMessage = { type: "message", role: "bot", text: chatbotReply } // Format response for chatHitory
        addChatMessage(questionNumber, chatbotMessage); // Add to chatHistory
    };

    // Handles chat submit for pressing enter key
    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault(); // Prevent default behavior of adding a new line
            handleSubmit(); // Call the submit function
        }
    };

    return (
        <form onSubmit={handleSubmit} className="h-1/4 w-full flex items-end">
            <div className="relative w-full h-full">
                <textarea
                    className="w-full h-full px-2 py-2 border rounded-lg bg-[#2e3b4e] text-white resize-none focus:outline-none"
                    placeholder="Ask your question here..."
                    value={chatInput} // Connect to state
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={handleKeyDown} // Checks for enter
                />
                <button
                    type="submit"
                    className="absolute bottom-2 right-2 text-white px-1 py-1 rounded cursor-pointer"
                >
                    <PaperAirplaneIcon className="w-5 h-5" />
                </button>
            </div>
        </form>
    )
}

export default ChatInputField;