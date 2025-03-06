import { Link } from "react-router-dom";
import BackButton from "../components/Backbutton";
import NextButton from "../components/Nextbutton";

const Task3 = () => {
    return (
        <>
        <div>
            <h1>Task 3</h1>
        </div>
        <Link to="/Task2" rel="noopener noreferrer"><BackButton>Back</BackButton></Link>
        <Link to="/Task4" rel="noopener noreferrer"><NextButton>Next</NextButton></Link>
        </>
    )
}

export default Task3;