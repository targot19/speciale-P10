/* Used this link: https://www.tutkit.com/en/text-tutorials/1313-basic-ui-in-react-with-openai-api*/
import { useState } from "react";
import { PaperAirplaneIcon } from '@heroicons/react/24/outline';


// To do: 
// Add prompt instructions to the input
// Get Question to show up on the screen

const ChatInputField = ({ onSend, isLoading, isActive }) => {
    const [chatInput, setChatInput] = useState(""); // Local state for storing user input

    // Function that takes input from UI, and passing it on to the proper functions
    const handleSubmit = async (e) => {
        if (e) e.preventDefault();

        if (!chatInput.trim()) return; // Skip if input is empty
        onSend(chatInput) // Call function passed from ChatWindow (HandleSendMessage)
        setChatInput("") // Clear input field
    };

    // Handles chat submit for pressing enter key
    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault(); // Prevent default behavior of adding a new line
            handleSubmit(); // Call the submit function
        }
    };

    return (
        <form onSubmit={handleSubmit} className={`w-full flex items-end ${
            isActive ? "h-1/5" : "h-[60px]"
          }`}>
            <div className="relative w-full h-full">
                <textarea
                    className={`w-full h-full px-2 py-2 border rounded-lg bg-[#2e3b4e] text-white resize-none focus:outline-none ${
                        isLoading ? "cursor-not-allowed" : ""
                    }`}
                    style={{ resize: "none" }} // attempt to forcing disable of resizing
                    placeholder="Ask your question here..."
                    value={chatInput} // Connect to state
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={handleKeyDown} // Checks for enter
                    disabled={!isActive || isLoading}
                />
                <button
                    type="submit"
                    disabled={!isActive || isLoading}
                    className="absolute bottom-2 right-2 text-white px-1 py-1 rounded cursor-pointer"
                >
                    <PaperAirplaneIcon className="w-5 h-5" />
                </button>
            </div>
        </form>
    )
}

export default ChatInputField;