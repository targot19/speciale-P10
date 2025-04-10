import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import RadioButtonsGroup from "../components/RadioButtonsGroup";
import ButtonContainer from "../components/ButtonContainer";
import NextButton from "../components/NextBtn"
import { Link } from "react-router-dom";
import BackButton from "../components/BackBtn";
import { useSession } from "../context/SessionContext";

const DemographicQuestionnaire = () => {
    const { addSurveyAnswers } = useSession();
    
    const [responses, setResponses] = useState({
        age: "",
        gender: "",
        education: "",
        comfort: "",
        aiUsage: "",
    });

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
            addSurveyAnswers(responses);
            navigate("/gaais");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="pt-0">
        <div className="p-4 flex flex-col items-center">
            <h1 className="text-2xl font-bold mb-4">Questionnaire: First Part</h1>
            <div className="min-w-[600px] bg-gray-200 p-4 mb-4 rounded-lg shadow-md w-full max-w-md">
                <RadioButtonsGroup
                    question="What is your age?"
                    options={["18-24", "25-34", "35-44", "45-54", "55-64", "65+"]}
                    value={responses.age}
                    onChange={(answer) => handleResponses("age", answer)}
                />
            </div>
            <div className="min-w-[600px] bg-gray-200 p-4 mb-4 rounded-lg shadow-md w-full max-w-md">
                <RadioButtonsGroup
                    question="What is your gender?"
                    options={["Female", "Male", "Non-binary", "Other", "Prefer not to say"]}
                    value={responses.gender}
                    onChange={(answer) => handleResponses("gender", answer)}
                />
            </div>
            <div className="min-w-[600px] bg-gray-200 p-4 mb-4 rounded-lg shadow-md w-full max-w-md">
                <RadioButtonsGroup
                    question="What is your highest level of education?"
                    options={[
                        "Primary and lower secondary education (Grundskole)",
                        "Upper secondary / high school or vocational education (Gymnasiale og erhvervsfaglige uddannelser)",
                        "Short-cycle higher education (Erhvervsakademi) - 1-2 years",
                        "Medium-cycle higher education (Bachelor, professionsbachelor) - 3-3,5 years",
                        "Long-cycle higher education (Kandidat) - 5 years or more",
                        "PhD and research education"
                    ]}
                    value={responses.education}
                    onChange={(answer) => handleResponses("education", answer)}
                />
            </div>
            <div className="min-w-[600px] bg-gray-200 p-4 mb-4 rounded-lg shadow-md w-full max-w-md">
                <RadioButtonsGroup
                    question="How would you rate your overall comfort with using digital technologies?"
                    options={["Very high", "Slightly high", "Neutral", "Slightly low", "Very low"]}
                    value={responses.comfort}
                    onChange={(answer) => handleResponses("comfort", answer)}
                />
            </div>
            <div className="min-w-[600px] bg-gray-200 p-4 mb-4 rounded-lg shadow-md w-full max-w-md">
                <RadioButtonsGroup
                    question="How often do you use AI systems (e.g. ChatGPT, Copilot, Gemini, etc.)?"
                    options={[
                        "Daily",
                        "Weekly",
                        "Monthly",
                        "Rarely",
                        "Never"
                    ]}
                    value={responses.aiUsage}
                    onChange={(answer) => handleResponses("aiUsage", answer)}
                />
            </div>
                    <ButtonContainer>
                        <BackButton to="/" />
                        <NextButton type="submit">Next</NextButton>
                    </ButtonContainer>
            </div>
        </form>
    );
}

export default DemographicQuestionnaire;

/** <Link to="/GAAIS" rel="noopener noreferrer"><NextButton>Next</NextButton></Link> */