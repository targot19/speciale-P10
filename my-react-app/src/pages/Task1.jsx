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

const MoreButton = styled.button`
    // background: #2d2b2b;
    // color: #E4EDED;
    color: #2d2b2b;
    border: #2d2b2b 2px solid;
    //background: #BDB153;
    background: #E4EDED;
    border-radius: 10px;
    font-size: 1.2rem;
    padding: 15px 25px;
    font-weight: bold;
    cursor: pointer;
    //border: none;
    transition: border 0.2s ease-in-out;
    font-family: "Poppins", serif;
    display: flex;
    align-items: center;
    gap: 12px;


    &:hover {
        //border-right: 3px solid #2d2b2b;
        //border-bottom: 4px solid #2d2b2b;
        border: 3px solid #2d2b2b;
    }
`