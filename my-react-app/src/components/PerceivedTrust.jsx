import ConditionQuestionBox from "../components/ConditionQuestionBox";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NextButton from "./NextBtn";
import { useSession } from "../context/SessionContext";

const PerceivedTrust = ({ onNext, category }) => {
    const { addConditionSurveyAnswers } = useSession();
    
    const [responses, setResponses] = useState({
        "I believe that the chatbot would act in my best interest.": "",
        "If I required help, the chatbot would do its best to help me.": "",
        "The chatbot is interested in my well-being, not just completing tasks.": "",
        "The chatbot is truthful in its interactions with me.": "",
        "I would characterize the chatbot as honest.": "",
        "The chatbot would keep its commitments.": "",
        "The chatbot is sincere and genuine.": "",
        "The chatbot is competent and effective in providing information or assistance.": "",
        "The chatbot performs its role of assisting users very well.": "",
        "Overall, the chatbot is a capable and proficient digital assistant.": "",
        "In general, the chatbot is very knowledgeable.": "",
    });

    const options = [
        { value: "Strongly disagree", label: "Strongly disagree" },
        { value: "Disagree", label: "Disagree" },
        { value: "Neither agree nor disagree", label: "Neither agree nor disagree" },
        { value: "Agree", label: "Agree" },
        { value: "Strongly agree", label: "Strongly agree" },
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
            addConditionSurveyAnswers(category, responses);
            if (onNext) onNext();
            //navigate("/thankyou");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="pt-0">
          <div className="flex flex-col items-start justify-start overflow-hidden h-screen w-full">
            <div className="flex flex-col gap-1 w-full max-w-3xl items-center overflow-y-auto"
            style={{
              maxHeight: "65vh",
              overflowX: "hidden",
            }}>
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
            </div>
            <div className="flex justify-center w-full mt-4">
              <NextButton type="submit" className="flex justify-center">
                Next
              </NextButton>
            </div>
          </div>
        </form>
      );
    };
    
export default PerceivedTrust;