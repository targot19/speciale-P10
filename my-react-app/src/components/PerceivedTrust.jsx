import ConditionQuestionBox from "../components/ConditionQuestionBox";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ButtonContainer from "../components/ButtonContainer";
import NextButton from "../components/NextButton";

const PerceivedTrust = () => {
    const [responses, setResponses] = useState({
        bestinterest: "",
        honest: "",
        effectivecompetent: "",
    });

    const options = [
        { value: "1", label: "Strongly agree" },
        { value: "2", label: "Agree" },
        { value: "3", label: "Neither agree nor disagree" },
        { value: "4", label: "Disagree" },
        { value: "5", label: "Strongly disagree" },
    ];

    const navigate = useNavigate();

    /** Handle responses from the RadioButtonsGroup component */
    const handleResponses = (question, answer) => {
        setResponses((prevResponses) => ({
            ...prevResponses,
            [question]: answer,
        }));
    };

    /** Write responses to console.log as of now */
    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent default form submission behavior

        if (Object.values(responses).some((response) => response === "")) {
            alert("Please answer all questions before proceeding.");
            return;
        } else {
            console.log({ responses });
            navigate("/thankyou");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="pt-0">
        <div className="flex items-center justify-center">
            <div className="flex flex-col gap-6 w-full max-w-3xl items-center">
            <div className="bg-gray-200 p-4 mb-4 rounded-lg shadow-md w-full" style={{ maxWidth: "600px" }}>
                <ConditionQuestionBox
                    question="I believe that the chatbot would act in my best interest."
                    options={options}
                    onChange={(answer) => handleResponses("bestinterest", answer)}
                />
                </div>
                <div className="bg-gray-200 p-4 mb-4 rounded-lg shadow-md w-full" style={{ maxWidth: "600px" }}>
                <ConditionQuestionBox
                    question="I would characterize the chatbot as honest."
                    options={options}
                    onChange={(answer) => handleResponses("honest", answer)}
                />
                </div>
                <div className="bg-gray-200 p-4 mb-4 rounded-lg shadow-md w-full" style={{ maxWidth: "600px" }}>
                <ConditionQuestionBox
                    question="The chatbot is competent and effective in providing answers."
                    options={options}
                    onChange={(answer) => handleResponses("effectivecompetent", answer)}
                    />
                </div>
                    <NextButton type="submit">
                        Next
                    </NextButton>
                </div>
            </div>
        </form>
        
    );
}
    
export default PerceivedTrust;