import NextButton from "../components/NextButton"
import BackButton from "../components/BackButton"
import TaskContainer from "../components/TaskContainer"
import { Link } from "react-router-dom"
import ButtonContainer from "../components/ButtonContainer"
import ChatWindow from "../components/chat/ChatWindow"


// prompts: topic, question, stage...
const ExperimentSectionPage = ({ category, questionNumber }) => {
    return (
        <div className="w-screen h-screen border-pink-700 border-2 flex p-15 justify-between gap-10">
            <ChatWindow />
            <div className="flex flex-col justify-between">
                <p>THIS IS WHERE THE QUESTION WILL GO</p>
                <div className="flex gap-10 items-center justify-center border-1 border-black-500 rounded-lg">
                    <Link to="/" rel="noopener noreferrer"><BackButton>Back</BackButton></Link>
                    <Link to="/Task2" rel="noopener noreferrer"><NextButton>Next</NextButton></Link>
                </div>
            </div>
        </div>
    )
}

export default ExperimentSectionPage;