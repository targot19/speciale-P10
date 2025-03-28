import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import RadioButtonsGroup from "../components/PreSurveyQuestionBox/RadioButtonsGroup";
import ButtonContainer from "../components/ButtonContainer";
import NextButton from "../components/NextButton";
import { Link } from "react-router-dom";

const DemographicQuestionnaire = () => {
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
            navigate("/GAAIS");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="p-4 flex flex-col items-center">
            <h1 className="text-2xl font-bold mb-4">Demographic Questionnaire</h1>
            <div className="bg-gray-200 p-4 mb-4 rounded-lg shadow-md w-full max-w-md">
                <RadioButtonsGroup
                    question="What is your age?"
                    options={["18-24", "25-34", "35-44", "45-54", "55-64", "65+"]}
                    onChange={(answer) => handleResponses("age", answer)}
                />
            </div>
            <div className="bg-gray-200 p-4 mb-4 rounded-lg shadow-md w-full max-w-md">
                <RadioButtonsGroup
                    question="What is your gender?"
                    options={["Female", "Male", "Non-binary", "Other", "Prefer not to say"]}
                    onChange={(answer) => handleResponses("gender", answer)}
                />
            </div>
            <div className="bg-gray-200 p-4 mb-4 rounded-lg shadow-md w-full max-w-md">
                <RadioButtonsGroup
                    question="What is your highest level of education?"
                    options={[
                        "Primary and lower secondary education (Grundskole)",
                        "Upper secondary / high school or vocational education (Gymnasiale og erhvervsfaglige uddannelser)",
                        "Short-cycle higher education (Erhvervsakademi) - 1-2 years",
                        "Medium-cycle higher education (Bachelor, professionsbachelor) - 3-3.5 years",
                        "Long-cycle higher education (Kandidat) 5 years or more",
                        "PhD and research education"
                    ]}
                    onChange={(answer) => handleResponses("education", answer)}
                />
            </div>
            <div className="bg-gray-200 p-4 mb-4 rounded-lg shadow-md w-full max-w-md">
                <RadioButtonsGroup
                    question="How would you rate your overall comfort with using digital technologies?"
                    options={["Very high", "Slightly high", "Neutral", "Slightly low", "Very low"]}
                    onChange={(answer) => handleResponses("comfort", answer)}
                />
            </div>
            <div className="bg-gray-200 p-4 mb-4 rounded-lg shadow-md w-full max-w-md">
                <RadioButtonsGroup
                    question="I have used or currently use AI systems (e.g. ChatGPT, Copilot, Gemini, etc.) in my day-to-day life."
                    options={[
                        "Strongly agree",
                        "Slightly agree",
                        "Neither agree nor disagree",
                        "Slightly disagree",
                        "Strongly disagree"
                    ]}
                    onChange={(answer) => handleResponses("aiUsage", answer)}
                />
            </div>
            <ButtonContainer>
                <button type="submit">
                    Next
                </button>
            </ButtonContainer>
        </div>
        </form>
    );
}

export default DemographicQuestionnaire;

/** <Link to="/GAAIS" rel="noopener noreferrer"><NextButton>Next</NextButton></Link> */