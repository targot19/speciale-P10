import { Link } from "react-router-dom";
import BackButton from "../components/Backbutton";
import NextButton from "../components/Nextbutton";

const Task2 = () => {
    return (
        <>
        <div>
            <h1>Task 2</h1>
        </div>
        <Link to="/Task1" rel="noopener noreferrer"><BackButton>Back</BackButton></Link>
        <Link to="/Task3" rel="noopener noreferrer"><NextButton>Next</NextButton></Link>
        </>
    )
}

export default Task2;