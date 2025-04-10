/** SRC from https://codesandbox.io/embed/4hp6wr?module=/src/Demo.tsx&fontsize=12 */

import * as React from 'react';
import RadioButtonsGroup from '../RadioButtonsGroup';
import { useNavigate } from 'react-router-dom';
import { useSession } from '../../context/SessionContext';
import DiscreteSliderMarks from './Slider';
import { useState } from "react"
import NextButton from "../NextBtn"

const UserAnswer = ({ onNext }) => {
    const { addSurveyAnswers } = useSession();
    
    const [responses, setResponses] = useState({
        "": "",
    });

    const [showSlider, setShowSlider] = useState(false); // Control slider visibility

    const options = [
        { value: "Yes", label: "Yes" },
        { value: "No", label: "No" },
    ];

    const navigate = useNavigate();

    /** Handle responses from the RadioButtonsGroup component */
    const handleResponses = (question, answer) => {
        setResponses((prevResponses) => ({
            ...prevResponses,
            [question]: answer,
        }));
        setShowSlider(true);
        //console.log(`Updated responses:`, { ...responses, [question]: answer });
    };

    /** Write responses to console.log as of now */
    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent default form submission behavior

        if (Object.values(responses).some((response) => response === "")) {
            alert("Please answer before proceeding.");
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
                  style={{ maxWidth: "300px" }}
                >
                  <RadioButtonsGroup
                    question={question}
                    options={options}
                    onChange={(answer) => handleResponses(question, answer)}
                  />
                  {showSlider && <DiscreteSliderMarks />}
                </div>
              ))}
              <NextButton type="submit" className="flex justify-end">
                Submit
              </NextButton>
            </div>
          </div>
        </form>
      );
    };
    
export default UserAnswer;