import React from 'react'; // Missing import statement
import RadioButtonsGroup from '../components/PreSurveyQuestionBox/RadioButtonsGroup';
import ButtonContainer from '../components/ButtonContainer';
import NextButton from '../components/NextButton';
import { Link } from 'react-router-dom';

const GAAISQuestionnaire = () => {
    return (
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
                />
            </div>
            <ButtonContainer>
                <Link to="/" rel="noopener noreferrer"><NextButton>Next</NextButton></Link>
            </ButtonContainer>
        </div>
    );
}

export default GAAISQuestionnaire;