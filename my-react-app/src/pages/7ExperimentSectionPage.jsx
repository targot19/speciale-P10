import NextButton from "../components/NextBtn"
import BackButton from "../components/BackBtn"
import TaskContainer from "../components/TaskContainer"
import { Link } from "react-router-dom"
import ButtonContainer from "../components/ButtonContainer"
import ChatWindow from "../components/chat/ChatWindow"
import lifelinesByCategory from "../data/lifelines";
import GoogleAnswerBox from "../components/GoogleAnswerBox";
import { useState } from "react"
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
const ExperimentSectionPage = ({ category, questionNumber, question, promptInstruction, lifeline, onNext }) => {
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

    const handleUserInteraction = () => {
        setHasInteractedWithChat(true);
        console.log("Setting hasInteractedWithChat to true."); // Debugging
    };

    // For testing purposes

    return (
        <div className="w-screen h-screen flex flex-col px-6 py-2">
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
                <div className="w-[60%]">
                    <ChatWindow 
                        questionNumber={questionNumber} 
                        promptInstruction={promptInstruction}
                        onUserInteraction={handleUserInteraction} // Pass the callback
                    />
                </div>
                <div className="flex flex-col justify-between w-[40%]">
                    <p className="bg-[#2E3B4E] text-white p-6 text-base mb-2">
                        {question} {/* Make dynamic - question prop */}
                    </p>
                    {console.log("hasInteractedWithChat:", hasInteractedWithChat)}  {/* Debugging */}
                    {hasInteractedWithChat && (
                        <GoogleAnswerBox
                            lifeline={lifeline}
                            resetTrigger={questionNumber}
                            questionNumber={questionNumber}
                        />
                    )}
                        
                    <div className="flex gap-10 items-center justify-center">
                        <UserAnswer question={question} questionNumber={questionNumber} onNext={onNext} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ExperimentSectionPage;