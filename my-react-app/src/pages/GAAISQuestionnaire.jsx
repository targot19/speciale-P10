import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RadioButtonsGroup from '../components/PreSurveyQuestionBox/RadioButtonsGroup';
import ButtonContainer from '../components/ButtonContainer';
import NextButton from '../components/NextButton';
import { Link } from 'react-router-dom';

const GAAISQuestionnaire = () => {
    const [responses, setResponses] = useState({
        neg6: "",
        pos7: "",
        neg10: "",
        pos11: "",
        pos12: "",
        neg15: "",
        pos17: "",
        neg19: "",
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
            navigate("/");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="p-4 flex flex-col items-center">
            <h1 className="text-2xl font-bold mb-4">GAAIS</h1>
            <div className="bg-gray-200 p-4 mb-4 rounded-lg shadow-md w-full max-w-md">
                <RadioButtonsGroup
                    question="I think artificially intelligent systems make many errors."
                    options={[
                        "Strongly agree",
                        "Slightly agree",
                        "Neither agree nor disagree",
                        "Slightly disagree",
                        "Strongly disagree"
                    ]}
                    onChange={(answer) => handleResponses("neg6", answer)}
                />
            </div>
            <div className="bg-gray-200 p-4 mb-4 rounded-lg shadow-md w-full max-w-md">
                <RadioButtonsGroup
                    question="I am interested in using artificially intelligent systems in my daily life."
                    options={[
                        "Strongly agree",
                        "Slightly agree",
                        "Neither agree nor disagree",
                        "Slightly disagree",
                        "Strongly disagree"
                    ]}
                    onChange={(answer) => handleResponses("pos7", answer)}
                />
            </div>
            <div className="bg-gray-200 p-4 mb-4 rounded-lg shadow-md w-full max-w-md">
                <RadioButtonsGroup
                    question="I think Artificial Intelligence is dangerous."
                    options={[
                        "Strongly agree",
                        "Slightly agree",
                        "Neither agree nor disagree",
                        "Slightly disagree",
                        "Strongly disagree"
                    ]}
                    onChange={(answer) => handleResponses("neg10", answer)}
                />
            </div>
            <div className="bg-gray-200 p-4 mb-4 rounded-lg shadow-md w-full max-w-md">
                <RadioButtonsGroup
                    question="Artificial Intelligence can have positive impacts on people’s wellbeing."
                    options={[
                        "Strongly agree",
                        "Slightly agree",
                        "Neither agree nor disagree",
                        "Slightly disagree",
                        "Strongly disagree"
                    ]}
                    onChange={(answer) => handleResponses("pos11", answer)}
                />
            </div>
            <div className="bg-gray-200 p-4 mb-4 rounded-lg shadow-md w-full max-w-md">
                <RadioButtonsGroup
                    question="Artificial Intelligence is exciting."
                    options={[
                        "Strongly agree",
                        "Slightly agree",
                        "Neither agree nor disagree",
                        "Slightly disagree",
                        "Strongly disagree"
                    ]}
                    onChange={(answer) => handleResponses("pos12", answer)}
                />
            </div>
            <div className="bg-gray-200 p-4 mb-4 rounded-lg shadow-md w-full max-w-md">
                <RadioButtonsGroup
                    question="I shiver with discomfort when I think about future uses of Artificial Intelligence."
                    options={[
                        "Strongly agree",
                        "Slightly agree",
                        "Neither agree nor disagree",
                        "Slightly disagree",
                        "Strongly disagree"
                    ]}
                    onChange={(answer) => handleResponses("neg15", answer)}
                />
            </div>
            <div className="bg-gray-200 p-4 mb-4 rounded-lg shadow-md w-full max-w-md">
                <RadioButtonsGroup
                    question="Much of society will benefit from a future full of Artificial Intelligence."
                    options={[
                        "Strongly agree",
                        "Slightly agree",
                        "Neither agree nor disagree",
                        "Slightly disagree",
                        "Strongly disagree"
                    ]}
                    onChange={(answer) => handleResponses("pos17", answer)}
                />
            </div>
            <div className="bg-gray-200 p-4 mb-4 rounded-lg shadow-md w-full max-w-md">
                <RadioButtonsGroup
                    question="People like me will suffer if Artificial Intelligence is used more and more."
                    options={[
                        "Strongly agree",
                        "Slightly agree",
                        "Neither agree nor disagree",
                        "Slightly disagree",
                        "Strongly disagree"
                    ]}
                    onChange={(answer) => handleResponses("neg19", answer)}
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

export default GAAISQuestionnaire;