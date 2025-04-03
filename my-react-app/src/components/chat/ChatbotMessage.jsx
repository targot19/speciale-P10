const ChatbotMessage = ({ children }) => {

    return (
        <div className="p-2 flex flex-row justify-start w-full">
            <p className="bg-[#8b6f00] text-white rounded max-w-4/6 p-5">{children}</p>
        </div>
    )
}

export default ChatbotMessage;
