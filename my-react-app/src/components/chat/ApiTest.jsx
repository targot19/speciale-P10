/* Used this link: https://www.tutkit.com/en/text-tutorials/1313-basic-ui-in-react-with-openai-api*/
import { useEffect, useRef, useState } from "react";
import { fetchChatGPTResponse } from "../../api/openai";


const ChatInput = () => {
    const [answer, setAnswer] = useState("");
    const messageInput = useRef();
    const [userInput, setUserInput] = useState("");

    const handleSubmit = async () => {
        if (!userInput.trim()) return; // Prevent empty input submission
        
        const prompt = messageInput.current.value;
        try {
            const chatResponse = await fetchChatGPTResponse(prompt);
            setAnswer(chatResponse);
            console.log(chatResponse)
            setUserInput(""); // clear input field
        } catch (error) {
            console.error("API Error:", error);
        }
    }

    return (
        <div>
            <div>
                <input
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    ref={messageInput} 
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                />
                <button onClick={handleSubmit}>
                    Send
                </button>
            </div>
            <div className="break-words">{answer}</div>
        </div>
    );
}

export default ChatInput;

/*
function Chatinput() {
    return(
        <form> 
            <label>
                <input name="Talk to Gippidy here:" />
                <button />
            </label>
        </form>
    )
}

export default Chatinput;*/