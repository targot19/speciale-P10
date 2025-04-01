import NextButton from "../components/NextButton";
import BackButton from "../components/BackButton";
import { Link } from "react-router-dom";
import ChatWindow, { ChatWindow1 } from "../components/chat/ChatWindow";
import PerceivedTrust from "../components/PerceivedTrust";

const PerceivedTrustPage = ({ category, questionNumber }) => {
    return (
        <div className="w-screen h-screen border-green-400 border flex flex-col px-10 py-5">
            <div className="h-1/8 flex justify-between items-center">
                <h2 className="text-3xl font-semibold">{category || "CATEGORY"}</h2>
                <p className="text-lg font-medium text-gray-600">{questionNumber || "2/20"}</p>
            </div>
            <div className="flex justify-between h-7/8 items-start">
                <ChatWindow1/>
                <div className="h-full flex flex-col gap-16 justify-start w-[60%]">
                    <PerceivedTrust />
                    <div className="flex gap-10 items-center justify-center">
                        <Link to="/" rel="noopener noreferrer"><BackButton>Back</BackButton></Link>
                        <Link to="/Task2" rel="noopener noreferrer"><NextButton>Next</NextButton></Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PerceivedTrustPage;