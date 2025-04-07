const ChatbotMessage = ({ children }) => {

    return (
        <div className="p-2 flex flex-row justify-start w-full">
            <div className="bg-[#8b6f00] text-white rounded max-w-4/6 p-3">{children}</div>
        </div>
    )
}

export default ChatbotMessage;
