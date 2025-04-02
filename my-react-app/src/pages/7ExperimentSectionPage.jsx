import NextButton from "../components/NextButton"
import BackButton from "../components/BackButton"
import TaskContainer from "../components/TaskContainer"
import { Link } from "react-router-dom"
import ButtonContainer from "../components/ButtonContainer"
import ChatWindow from "../components/chat/ChatWindow"


// prompts: topic, question, stage...
const ExperimentSectionPage = ({ category, questionNumber, question }) => {
    return (
        <div className="w-screen h-screen border-green-400 border flex flex-col px-10 py-5">
            <div className="h-1/8 flex justify-between items-center">
                <h2 className="text-3xl font-semibold">CATEGORY</h2> {/* Make dynamic - category prop */}
                <p className="text-lg font-medium text-gray-600">?/20</p> {/* Make dynamic - question number prop */}
            </div>
            <div className="flex justify-between gap-10 h-7/8">
                    <ChatWindow/>
                    <div className="flex flex-col justify-between w-[30%]">
                        <p className="bg-[#2E3B4E] text-white p-6 text-lg">
                            {/* Make dynamic - question prop */}
                            This is where the question will go. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi sit amet imperdiet nulla. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi sit amet imperdiet nulla.?
                            </p>
                        <div className="flex gap-10 items-center justify-center border-1 border-black-500 rounded-lg">
                            <Link to="/briefing2" rel="noopener noreferrer"><BackButton>Back</BackButton></Link>
                            <Link to="/perceivedtrust" rel="noopener noreferrer"><NextButton>Next</NextButton></Link>
                        </div>
                    </div>
            </div>
        </div>
    )
}

export default ExperimentSectionPage;