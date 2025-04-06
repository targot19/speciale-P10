import NextButton from "../components/NextButton";
import BackButton from "../components/BackButton";
import { Link } from "react-router-dom";
import ChatWindow from "../components/chat/ChatWindow";
import PerceivedTrust from "../components/PerceivedTrust";

const PerceivedTrustPage = ({ category, questionNumber }) => {
    return (
        <div className="w-screen h-screen flex flex-col px-10 py-5">
            <div className="h-[10%] flex justify-between items-center">
                <h2 className="text-3xl font-semibold">{category || "CATEGORY"}</h2>
                <p className="text-lg font-medium text-gray-600">{questionNumber || "2/20"}</p>
            </div>
            <div className="flex justify-center h-[100%] items-start">
                <div style={{ opacity: 0.5 }} className="flex flex-col flex-grow justify-start h-full w-full items-start">
                    <ChatWindow />
                </div>
                <div className="h-[100%] flex-col flex-grow justify-start w-[100%]">
                    <PerceivedTrust />
                </div>
            </div>
        </div>
    );
};

export default PerceivedTrustPage;