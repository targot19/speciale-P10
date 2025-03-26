import NextButton from "../components/NextButton"
import BackButton from "../components/BackButton"
import TaskContainer from "../components/TaskContainer"
import { Link } from "react-router-dom"
import ButtonContainer from "../components/ButtonContainer"

const Music = () => {
    return (
        <>
            <TaskContainer>
                <h1>Task 1</h1>
            </TaskContainer>
            <ButtonContainer>
            <Link to="/" rel="noopener noreferrer"><BackButton>Back</BackButton></Link>
            <Link to="/Task2" rel="noopener noreferrer"><NextButton>Next</NextButton></Link>
            </ButtonContainer>
        </>
    )
}

export default Music;