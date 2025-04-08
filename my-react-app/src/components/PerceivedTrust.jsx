import ConditionQuestionBox from "../components/ConditionQuestionBox";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ButtonContainer from "../components/ButtonContainer";
import NextButton from "../components/NextButton";
import { useSession } from "../context/SessionContext";

const PerceivedTrust = ({ onNext }) => {
    const { addSurveyAnswers } = useSession();
    
    const [responses, setResponses] = useState({
        "I am confident in the AI. I feel that it works well.": "",
        "The outputs of the AI are very predictable.": "",
        "The AI is very reliable. I can count on it to be correct all the time.": "",
        "I feel safe that when I rely on the AI I will get the right answers.": "",
        "The AI is effcient in that it works very quickly.": "",
        "The AI can perform the task better than a novice human user.": "",
        "I like using the AI for decision making.": "",
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
        //console.log(`Updated responses:`, { ...responses, [question]: answer });
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
            if (onNext) onNext();
            //navigate("/thankyou");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="pt-0">
          <div className="flex items-center justify-center overflow-auto">
            <div className="flex flex-col gap-2 w-full max-w-3xl items-center">
              {Object.keys(responses).map((question, index) => (
                <div
                  key={index}
                  className="bg-gray-200 p-2 mb-3 rounded-lg shadow-md w-full"
                  style={{ maxWidth: "600px" }}
                >
                  <ConditionQuestionBox
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
          </div>
        </form>
      );
    };
    
export default PerceivedTrust;