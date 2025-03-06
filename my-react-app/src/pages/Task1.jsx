import NextButton from "../components/Nextbutton"
import BackButton from "../components/Backbutton"
import { Link } from "react-router-dom"

const Task1 = () => {
    return (
        <>
        <div>
            <h1>Task 1</h1>
        </div>
        <Link to="/" rel="noopener noreferrer"><BackButton>Back</BackButton></Link>
        <Link to="/Task2" rel="noopener noreferrer"><NextButton>Next</NextButton></Link>
        </>
    )
}

export default Task1;