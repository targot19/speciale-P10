import NextButton from "../components/NextButton"
import BackButton from "../components/BackButton"
import Chatinput from "../components/ChatInput"
import TaskContainer from "../components/TaskContainer"
import { Link } from "react-router-dom"
import ButtonContainer from "../components/ButtonContainer"

const Task1 = () => {
    return (
        <>
            <TaskContainer>
                <h1>Task 1</h1>
                <Chatinput />
            </TaskContainer>
            <ButtonContainer>
            <Link to="/" rel="noopener noreferrer"><BackButton>Back</BackButton></Link>
            <Link to="/Task2" rel="noopener noreferrer"><NextButton>Next</NextButton></Link>
            </ButtonContainer>
        </>
    )
}

export default Task1;