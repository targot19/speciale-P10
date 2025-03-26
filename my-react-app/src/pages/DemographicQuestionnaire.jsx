import React from "react";
import RadioButtonsGroup from "../components/PreSurveyQuestionBox/RadioButtonsGroup";
import ButtonContainer from "../components/ButtonContainer";
import NextButton from "../components/NextButton";
import { Link } from "react-router-dom";

const DemographicQuestionnaire = () => {
    return (
        <div className="p-4 flex flex-col items-center">
            <h1 className="text-2xl font-bold mb-4">Demographic Questionnaire</h1>
            <div className="bg-gray-200 p-4 mb-4 rounded-lg shadow-md w-full max-w-md">
                <RadioButtonsGroup
                    question="What is your age?"
                    options={["18-24", "25-34", "35-44", "45-54", "55-64", "65+"]}
                />
            </div>
            <div className="bg-gray-200 p-4 mb-4 rounded-lg shadow-md w-full max-w-md">
                <RadioButtonsGroup
                    question="What is your gender?"
                    options={["Female", "Male", "Non-binary", "Other", "Prefer not to say"]}
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
                />
            </div>
            <div className="bg-gray-200 p-4 mb-4 rounded-lg shadow-md w-full max-w-md">
                <RadioButtonsGroup
                    question="In which region do you live?"
                    options={[
                        "North Jutland (Nordjylland)",
                        "Central Jutland (Midtjylland)",
                        "Southern Jutland (Syddanmark)",
                        "Zealand (Sjælland)",
                        "Capital (Hovedstaden)"
                    ]}
                />
            </div>
            <div className="bg-gray-200 p-4 mb-4 rounded-lg shadow-md w-full max-w-md">
                <RadioButtonsGroup
                    question="How would you rate your overall comfort with using digital technologies?"
                    options={["Very high", "Slightly high", "Neutral", "Slightly low", "Very low"]}
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
                />
            </div>
            <ButtonContainer>
            <Link to="/GAAIS" rel="noopener noreferrer"><NextButton>Next</NextButton></Link>
            </ButtonContainer>
        </div>
    );
}

export default DemographicQuestionnaire;