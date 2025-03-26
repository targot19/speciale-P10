import ChatbotMessage from "./ChatbotMessage"
import UserMessage from "./UserMessage"

// Takes a message history as it's prompt
const ChatHistory = ({ messageHistory }) => {

    return (
        <div className="flex flex-col gap-3 p-4 overflow-y-auto h-3/4 bg-white rounded border border-gray-200">
            {/* map over message history to create components based on item type (usermessage, chatbotmessage, button...) */}
            {messageHistory.map((msg, index) => {
                if(msg.type === "message" && msg.role === "user") {
                    return (<ChatbotMessage key={index}>{msg.text}</ChatbotMessage>)
                }
                if(msg.type === "message" && msg.role === "bot") {
                    return (<UserMessage key={index}>{msg.text}</UserMessage>)
                }
                if(msg.type === "answerCheck1") {
                    return (<p key={index}>3 buttons</p>)
                }
                if(msg.type === "answerCheck2") {
                    return (<p key={index}>2 buttons</p>)
                }
                return null;
            })}
        </div>)
}

export default ChatHistory;