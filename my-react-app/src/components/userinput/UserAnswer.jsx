import * as React from "react";
import RadioButtonsGroup from "../RadioButtonsGroup";
import { useSession } from "../../context/SessionContext";
import DiscreteSliderMarks from "./Slider";
import { useState, useEffect } from "react";
import NextButton from "../NextBtn";

const UserAnswer = ({ question, questionNumber, chatShouldAnswerFalsely, googleShouldAnswerFalsely, onNext }) => {
  const { addQuestionAnswer } = useSession();

  // State structure to include both survey response and slider value
  const [responses, setResponses] = useState({});
  const [secondSurveyResponse, setSecondSurveyResponse] = useState("");
  const [showSlider, setShowSlider] = useState(false);
  const [showSecondSurvey, setShowSecondSurvey] = useState(false);

  const options = [
    { value: "Yes", label: "Yes" },
    { value: "No", label: "No" },
  ];

  const secondSurveyOptions = [
    { value: "Chatbot", label: "Chatbot" },
    { value: "Google", label: "Google" },
    { value: "Prior knowledge", label: "Prior knowledge" },
  ];

  // Restart survey process with every new question
  useEffect(() => {
    setResponses({
      [question]: { answer: "", confidence: null, source: "" }, // Add "source" for the second survey
    });
    setSecondSurveyResponse("");
    setShowSlider(false);
    setShowSecondSurvey(false);
  }, [question]);

  // Handle first survey responses
  const handleResponses = (question, answer) => {
    setResponses((prevResponses) => {
      const updatedResponses = {
        ...prevResponses,
        [question]: { ...prevResponses[question], answer },
      };
      //console.log(`Updated responses after radio button:`, updatedResponses);
      return updatedResponses;
    });
    setShowSlider(true); // Show slider after answering first survey
  };

  // Log slider value
  const handleSliderChange = (value) => {
    setResponses((prevResponses) => {
      const updatedResponses = {
        ...prevResponses,
        [question]: { ...prevResponses[question], confidence: value },
      };
      //console.log(`Updated confidence:`, updatedResponses);
      return updatedResponses;
    });
  };

  // Handle second survey response
  const handleSecondSurveyResponse = (answer) => {
    setSecondSurveyResponse(answer);
    setResponses((prevResponses) => ({
      ...prevResponses,
      [question]: { ...prevResponses[question], source: answer }, // Add the second survey response to the same question
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const response = responses[question];
    if (response.answer === "" || response.confidence === null) {
      alert("Please choose an option.");
      return;
    }
    console.log("Logging answer with:", {
      ...response,
      chatShouldAnswerFalsely,
      googleShouldAnswerFalsely
    }); // Log final responses
    addQuestionAnswer(questionNumber, {...responses, chatShouldAnswerFalsely, googleShouldAnswerFalsely}); // Save responses to session history
    setShowSecondSurvey(true);
  };

  return (
    <form onSubmit={handleSubmit} className="pt-6 w-full h-full">
        <div className="flex flex-col gap-4 items-center justify-center w-full h-full">
          {/* Conditionally render the first survey */}
          {!showSecondSurvey && (
            <>
              <div className="bg-gray-200 p-8 rounded-lg shadow-md w-full">
                <RadioButtonsGroup
                  question="Please select your answer."
                  options={options}
                  onChange={(answer) => handleResponses(question, answer)}
                />
                {/* Conditionally render the slider for the current question */}
                {showSlider && responses[question]?.answer && (
                  <div className="flex justify-center pt-8 items-end">
                  <DiscreteSliderMarks
                    onChange={(value) => handleSliderChange(value)}
                  />
                </div>
                )}
              </div>
              <NextButton type="submit" className="flex justify-end">
                Submit
              </NextButton>
            </>
          )}

          {/* Conditionally render the second survey */}
          {showSecondSurvey && (
            <>
              <div className="bg-gray-200 p-3 rounded-lg shadow-md w-full">
                <RadioButtonsGroup
                  question="What was your primary source?"
                  options={secondSurveyOptions}
                  onChange={(answer) => handleSecondSurveyResponse(answer)}
                />
              </div>
              <NextButton
                onClick={() => {
                  if (secondSurveyResponse === "") {
                    alert("Please select an option.");
                    return;
                  }
                  if (onNext) onNext();
                }}
                className="flex justify-end"
              >
                Next
              </NextButton>
            </>
          )}
        </div>
      
    </form>
  );
};

export default UserAnswer;