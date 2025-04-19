import NextButton from "../components/NextBtn"
import ChatWindow from "../components/chat/ChatWindow"
import lifelinesByCategory from "../data/lifelines";
import GoogleAnswerBox from "../components/GoogleAnswerBox";
import { useState, useEffect, useRef } from "react"
import UserAnswer from "../components/userinput/UserAnswer"
import musicIcon from "../assets/music.png";
import healthIcon from "../assets/health.png";
import geographyIcon from "../assets/geography.png";
import physicsIcon from "../assets/physics.png"

// Bare for testing purposes - tænker den skal opbevares et andet sted, evt. i 
const testHistory =
[
    { type: "message", role: "user", text: "What's the capital of Peru?" },
    { type: "message", role: "bot", text: "The capital of Peru is Lima." },
    { type: "answerCheck1" },
    { type: "message", role: "user", text: "Are you sure?" },
    { type: "message", role: "bot", text: "Yes, Lima is the capital of Peru." },
    { type: "answerCheck2" }
  ]

// prompts: topic, question, stage...
const ExperimentSectionPage = ({ category, questionNumber, question, promptInstruction, lifeline, onNext, googleShouldAnswerFalsely, chatShouldAnswerFalsely }) => {
    const categoryIcons = {
        health: healthIcon,
        music: musicIcon,
        geography: geographyIcon,
        physics: physicsIcon,
      };

    // state variable for storing a temporary history of the current conversation, to pass to the chat along with new inputs (to create a sense of a continuous conversation).
    const [currentChatHistory, setCurrentChatHistory] = useState({});

    // state variable for storing whether the user has interacted with the chat
    const [hasInteractedWithChat, setHasInteractedWithChat] = useState(false);

    const [chatInput, setChatInput] = useState("");

    // Logging the relevant info for the current quetion:
    const hasLogged = useRef(null);
    useEffect(() => {
      if (hasLogged.current === questionNumber) return;
      hasLogged.current = questionNumber;
    
      console.log(`Debug info for question ${questionNumber}`);
      console.log("→ condition:", promptInstruction);
      console.log("→ chatShouldAnswerFalsely:", chatShouldAnswerFalsely);
      console.log("→ googleShouldAnswerFalsely:", googleShouldAnswerFalsely);
    }, [questionNumber, promptInstruction, chatShouldAnswerFalsely, googleShouldAnswerFalsely]);

    // Reset `hasInteractedWithChat` when the question changes
    useEffect(() => {
        setHasInteractedWithChat(false);
    }, [questionNumber]);

    const handleChatbotReply = () => {
        setHasInteractedWithChat(true);
    };

    // Reset chat input whenever the question changes
    useEffect(() => {
        setChatInput(""); // Clear the input field
    }, [question]);

    return (
        <div className="w-screen h-screen flex flex-col px-6 py-4">
            <div className="h-1/8 flex justify-between items-center">
                <div className="flex gap-2 items-center justify-center">
                    <img
                        src={categoryIcons[category.toLowerCase()]}
                        alt={`${category} icon`}
                        className="w-[35px] h-[35px]"
                    />
                    <h2 className="text-3xl font-semibold">{category}</h2> {/* Make dynamic - category prop */}
                </div>
                <p className="text-lg font-medium text-gray-600">{questionNumber}/20</p> {/* Make dynamic - question number prop */}
            </div>
            <div className="flex justify-between gap-8 h-7/8">
                <div className="w-[60%] h-full">
                    <p
                        className="bg-[#2E3B4E] text-white text-center p-6 text-base mb-1 cursor-pointer"
                        onClick={() => setChatInput(question)}
                    >
                        {/* Make dynamic - question prop */}
                        {question}
                    </p>
                    <ChatWindow 
                    questionNumber={questionNumber} 
                    promptInstruction={promptInstruction}
                    chatInput={chatInput}
                    setChatInput={setChatInput}
                    onChatbotReply={handleChatbotReply}
                    />
                </div>
                <div className="flex flex-col justify-between h-full w-[40%]">
                    <div>
                        {hasInteractedWithChat && (
                            <GoogleAnswerBox
                                lifeline={lifeline}
                                resetTrigger={questionNumber}
                                questionNumber={questionNumber}
                                googleShouldAnswerFalsely={googleShouldAnswerFalsely}
                            />
                        )}
                    </div>
                    <div className="flex items-center justify-center">
                        <UserAnswer question={question} questionNumber={questionNumber} chatShouldAnswerFalsely={chatShouldAnswerFalsely} onNext={onNext} googleShouldAnswerFalsely={googleShouldAnswerFalsely} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ExperimentSectionPage;