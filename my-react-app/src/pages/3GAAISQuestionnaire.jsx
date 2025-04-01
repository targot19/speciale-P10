import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RadioButtonsGroup from '../components/RadioButtonsGroup';
import NextButton from '../components/NextButton';
import BackButton from '../components/BackButton';

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
            navigate("/briefing");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="pt-0">
        <div className="p-4 flex flex-col items-center">
            <h1 className="text-2xl font-bold mb-4">Questionnaire: Second Part</h1>
            <div className="min-w-[600px] bg-gray-200 p-4 mb-4 rounded-lg shadow-md w-full max-w-md">
                <RadioButtonsGroup
                    question="I think artificially intelligent systems make many errors."
                    options={options}
                    onChange={(answer) => handleResponses("neg6", answer)}
                />
            </div>
            <div className="min-w-[600px] bg-gray-200 p-4 mb-4 rounded-lg shadow-md w-full max-w-md">
                <RadioButtonsGroup
                    question="I am interested in using artificially intelligent systems in my daily life."
                    options={options}
                    onChange={(answer) => handleResponses("pos7", answer)}
                />
            </div>
            <div className="min-w-[600px] bg-gray-200 p-4 mb-4 rounded-lg shadow-md w-full max-w-md">
                <RadioButtonsGroup
                    question="I think Artificial Intelligence is dangerous."
                    options={options}
                    onChange={(answer) => handleResponses("neg10", answer)}
                />
            </div>
            <div className="min-w-[600px] bg-gray-200 p-4 mb-4 rounded-lg shadow-md w-full max-w-md">
                <RadioButtonsGroup
                    question="Artificial Intelligence can have positive impacts on people’s wellbeing."
                    options={options}
                    onChange={(answer) => handleResponses("pos11", answer)}
                />
            </div>
            <div className="min-w-[600px] bg-gray-200 p-4 mb-4 rounded-lg shadow-md w-full max-w-md">
                <RadioButtonsGroup
                    question="Artificial Intelligence is exciting."
                    options={options}
                    onChange={(answer) => handleResponses("pos12", answer)}
                />
            </div>
            <div className="min-w-[600px] bg-gray-200 p-4 mb-4 rounded-lg shadow-md w-full max-w-md">
                <RadioButtonsGroup
                    question="I shiver with discomfort when I think about future uses of Artificial Intelligence."
                    options={options}
                    onChange={(answer) => handleResponses("neg15", answer)}
                />
            </div>
            <div className="min-w-[600px] bg-gray-200 p-4 mb-4 rounded-lg shadow-md w-full max-w-md">
                <RadioButtonsGroup
                    question="Much of society will benefit from a future full of Artificial Intelligence."
                    options={options}
                    onChange={(answer) => handleResponses("pos17", answer)}
                />
            </div>
            <div className="min-w-[600px] bg-gray-200 p-4 mb-4 rounded-lg shadow-md w-full max-w-md">
                <RadioButtonsGroup
                    question="People like me will suffer if Artificial Intelligence is used more and more."
                    options={options}
                    onChange={(answer) => handleResponses("neg19", answer)}
                />
            </div>
                <NextButton type="submit">
                    Next
                </NextButton>
            </div>
        </form>
    );
}

export default GAAISQuestionnaire;