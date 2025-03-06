import { NextButton } from "../components/Nextbutton"
import { Link } from "react-router-dom"

const Task1 = () => {
    return (
        <><div>
            <h1>Task 1</h1>
        </div><Link to="/Task2" target="_blank" rel="noopener noreferrer"><NextButton>hey</NextButton></Link></>
    )
}

export default Task1;