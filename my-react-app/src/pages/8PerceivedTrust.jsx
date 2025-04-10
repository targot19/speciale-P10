import NextButton from "../components/NextBtn";
import BackButton from "../components/BackBtn";
import { Link } from "react-router-dom";
import ChatWindow from "../components/chat/ChatWindow";
import PerceivedTrust from "../components/PerceivedTrust";

const PerceivedTrustPage = ({ category, onNext, chatHistory }) => {
    return (
        <div className="w-screen h-screen flex flex-col px-10 py-5">
            <div className="h-[10%] flex justify-between items-center">
                <h2 className="text-3xl font-semibold">{category || "CATEGORY"}</h2>
            </div>
            <div className="flex justify-between h-7/8 items-start">
                <div style={{ opacity: 0.5 }} className="w-[40%] h-full">
                    <ChatWindow messageHistory={chatHistory} isActive={false}/>
                </div>
                <div className="h-full flex flex-col gap-16 justify-start w-[60%]">
                    <PerceivedTrust onNext={onNext} />
                </div>
            </div>
        </div>
    );
};

export default PerceivedTrustPage;