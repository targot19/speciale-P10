import NextButton from "../components/NextButton"
import BackButton from "../components/BackButton"
import TaskContainer from "../components/TaskContainer"
import { Link } from "react-router-dom"
import ButtonContainer from "../components/ButtonContainer"
import ChatWindow from "../components/chat/ChatWindow"
import { useState } from "react"

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
const ExperimentSectionPage = ({ category, questionNumber, question, promptInstruction, onNext }) => {


    //state variable for storing a temporary history of the current conversation, to pass to the chat along with new inputs (to create a sense of a continuous conversation).
    const [currentChatHistory, setCurrentChatHistory] = useState({});

    // For testing purposes

    return (
        <div className="w-screen h-screen flex flex-col px-10 py-5">
            <div className="h-1/8 flex justify-between items-center">
                <h2 className="text-3xl font-semibold">{category}</h2> {/* Make dynamic - category prop */}
                <p className="text-lg font-medium text-gray-600">{questionNumber}/20</p> {/* Make dynamic - question number prop */}
            </div>
            <div className="flex justify-between gap-10 h-7/8">
                    <ChatWindow questionNumber={questionNumber} promptInstruction={promptInstruction}/>
                    <div className="flex flex-col justify-between w-[30%]">
                        <p className="bg-[#2E3B4E] text-white p-6 text-lg">
                            {/* Make dynamic - question prop */}
                            {question}
                            </p>
                        <div className="flex gap-10 items-center justify-center">
                            <NextButton onClick={onNext}>Next</NextButton>
                        </div>
                    </div>
            </div>
        </div>
    )
}

export default ExperimentSectionPage;