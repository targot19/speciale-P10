import ChatbotMessage from "./ChatbotMessage"
import UserMessage from "./UserMessage"
import TypingDots from "./TypingDots"
import { useRef, useEffect } from "react"

// Takes a message history as it's prop (default value is an empty array)
const ChatHistory = ({ isLoading, messageHistory = [] }) => {

    const scrollRef = useRef(null);

    // Change scroll direction to always be bottom - up
    useEffect(() => {
        const container = scrollRef.current;
        if (!container) return; // If it's not available (e.g., not mounted yet), exit early
    
    setTimeout(() => {
            container.scrollTop = container.scrollHeight; // Scroll to the bottom of the chat
        }, 0);
    }, [messageHistory]);

    return (
        <div ref={scrollRef} className="flex flex-col gap-2 p-3 pb-6 overflow-y-auto h-3/4 rounded">
            {/* map over message history to create components based on item type (usermessage, chatbotmessage, button...) */}
            {messageHistory.map((msg, index) => {
                if(msg.type === "message" && msg.role === "bot") {
                    return (<ChatbotMessage key={index}>{msg.text}</ChatbotMessage>)
                }
                if(msg.type === "message" && msg.role === "user") {
                    return (<UserMessage key={index}>{msg.text}</UserMessage>)
                }
                if(msg.type === "answerCheck1") {
                    return (
                        <form key={index} className="flex flex-col pl-10 gap-2 w-full">
                            <label className="flex items-center gap-2">
                                <input type="radio" name={`answer-${index}`} value="option1" />
                                I would like to use this answer
                            </label>
                            <label className="flex items-center gap-2">
                                <input type="radio" name={`answer-${index}`} value="option2" />
                                I would like to ask a follow-up question
                            </label>
                            <label className="flex items-center gap-2">
                                <input type="radio" name={`answer-${index}`} value="option3" />
                                I would look at other sources to answer this question
                            </label>
                        </form>
                    )
                }
                if(msg.type === "answerCheck2") {
                    return (                        
                        <form key={index} className="flex flex-col pl-10 gap-2 w-full">
                            <label className="flex items-center gap-2">
                                <input type="radio" name={`answer-${index}`} value="option1" />
                                I would like to use this answer
                            </label>
                            <label className="flex items-center gap-2 ">
                                <input type="radio" name={`answer-${index}`} value="option2" />
                                I would look at other sources to answer this question
                            </label>
                        </form>
                    )
                }
                return null;
            })}

            {/* Typing/loading indicator */}
            {isLoading && (
                <ChatbotMessage>
                    <TypingDots />
                </ChatbotMessage>
            )}
        </div>
    )
}

export default ChatHistory;