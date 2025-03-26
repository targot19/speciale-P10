/* Used this link: https://www.tutkit.com/en/text-tutorials/1313-basic-ui-in-react-with-openai-api*/
import { useEffect, useRef, useState } from "react";
import { fetchChatGPTResponse } from "../../api/openai";


// Should be a input field, hooked up to send a call to the API.

const ChatInputField = () => {

    return (
        <div className="h-1/4">
            <input
                className="h-4/5 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                type="text"
            />
            <button>
                Send
            </button>
        </div>
    )
}

export default ChatInputField;

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