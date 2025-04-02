/* Used this link: https://www.tutkit.com/en/text-tutorials/1313-basic-ui-in-react-with-openai-api*/
import { useEffect, useRef, useState } from "react";
import { fetchChatGPTResponse } from "../../api/openai";
import { PaperAirplaneIcon } from '@heroicons/react/24/outline';


// Should be a input field, hooked up to send a call to the API.

const ChatInputField = () => {

    return (
        <div className="h-1/4 w-full flex items-end">
            <div className="relative w-full h-full">
                <textarea
                    className="w-full h-full px-2 py-2 border rounded-lg bg-[#2e3b4e] text-white resize-none focus:outline-none"
                    placeholder="Ask your question here..."
                />
                <button
                    type="submit"
                    className="absolute bottom-2 right-2 text-white px-1 py-1 rounded cursor-pointer"
                >
                    <PaperAirplaneIcon className="w-5 h-5" />
                </button>
            </div>
        </div>
    )
}

export default ChatInputField;


/*
        <div className="h-1/4 w-full flex flex-col items-end">
            <textarea
                className="h-4/5 w-full px-4 py-2 border rounded-lg bg-[#2e3b4e] text-white resize-none focus:outline-none"
                placeholder="Ask your question here..."
            />
            <button className="bg-[#2e3b4e] text-white mt-3 px-3 py-1 rounded">
                Send
            </button>
        </div>
*/

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