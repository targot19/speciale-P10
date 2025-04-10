import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RadioButtonsGroup from '../components/RadioButtonsGroup';
import NextButton from '../components/NextBtn';
import BackButton from '../components/BackBtn';
import ButtonContainer from '../components/ButtonContainer';
import { useSession } from "../context/SessionContext";

const GAAISQuestionnaire = () => {
    const { addSurveyAnswers } = useSession();
    
    const [responses, setResponses] = useState({
        "I think artificially intelligent systems make many errors.": "",
        "I am interested in using artificially intelligent systems in my daily life.": "",
        "I think Artificial Intelligence is dangerous.": "",
        "Artificial Intelligence can have positive impacts on people’s wellbeing.": "",
        "Artificial Intelligence is exciting.": "",
        "I shiver with discomfort when I think about future uses of Artificial Intelligence.": "",
        "Much of society will benefit from a future full of Artificial Intelligence.": "",
        "People like me will suffer if Artificial Intelligence is used more and more.": "",
    });

    const options = [
        { value: "Strongly agree", label: "Strongly agree" },
        { value: "Agree", label: "Agree" },
        { value: "Neither agree nor disagree", label: "Neither agree nor disagree" },
        { value: "Disagree", label: "Disagree" },
        { value: "Strongly disagree", label: "Strongly disagree" },
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
            addSurveyAnswers(responses);
            navigate("/briefing1");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="pt-0">
            <div className="p-4 flex flex-col items-center">
            <h1 className="text-2xl font-bold mb-4">Questionnaire: Second Part</h1>
                {Object.keys(responses).map((question, index) => (
                <div
                    key={index}
                    className="bg-gray-200 p-2 mb-3 rounded-lg shadow-md w-full"
                    style={{ maxWidth: "600px" }}
                >
                <RadioButtonsGroup
                    question={question}
                    options={options}
                    onChange={(answer) => handleResponses(question, answer)}
                />
                </div>
                ))}
                    <NextButton type="submit" className="flex justify-end">
                        Next
                    </NextButton>
                </div>
        </form>
    );
};

export default GAAISQuestionnaire;