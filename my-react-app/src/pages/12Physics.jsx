import { Link } from "react-router-dom";
import BackButton from "../components/BackButton";

const Physics = () => {
    return (
        <>
        <div>
            <h1>Physics</h1>
        </div>
        <Link to="/Task3" rel="noopener noreferrer"><BackButton>Back</BackButton></Link>
        </>
    )
}

export default Physics;