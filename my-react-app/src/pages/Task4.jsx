import { Link } from "react-router-dom";
import BackButton from "../components/Backbutton";

const Task4 = () => {
    return (
        <>
        <div>
            <h1>Task 4</h1>
        </div>
        <Link to="/Task3" rel="noopener noreferrer"><BackButton>Back</BackButton></Link>
        </>
    )
}

export default Task4;