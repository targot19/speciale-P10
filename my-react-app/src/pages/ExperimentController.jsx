import { useParams, useNavigate, Navigate } from "react-router-dom";
import { useMemo } from "react"; // Helps avoid unnecessary re-renders
import { useSession } from "../context/SessionContext";
import CategoryPage from "./6CategoryPage";
import ExperimentSectionPage from "./7ExperimentSectionPage";
import PerceivedTrustPage from "./8PerceivedTrust";
import questionsByCategory from "../data/questions";
import lifelinesByCategory from "../data/lifelines";

/* 
Controller is responsible for:
- Reading current step (from URL /experiment/:step)
- Get chosen conditionOrder from SessionContext.
- Build step-by-step experiment sequence (according to conditionOrder)
- Dynamically render CategoryPage, ExperimentsectionPage and PerceivedTrustPage
- Navigate to next page: Use onNext() to move to the next step of experiment.


/experiment/1 will be the entry point to the experimet flow.

*/
const ExperimentController = () => {
    // Access chat history (for perceived trust page)
    const { sessionHistory } = useSession();
    const { chatHistory, conditionOrder } = sessionHistory;
    //console.log(conditionOrder)

    //console.log("From sessionStorage:", sessionStorage.getItem("sessionHistory"));

    // 1. Get step number from url
    const { step } = useParams(); // Access url value (/experiment/:step)
    const navigate = useNavigate();
    const stepIndex = parseInt(step, 10) - 1; // Convert step (1-based) to 0-based index

    // Validate that /:step is a valid number
    if (isNaN(stepIndex) || stepIndex < 0) {
        return <Navigate to="/start" />;
      }

    // 3. Setup categories, in order
    const categories = ["music", "health", "geography", "physics"];

    // Don't proceed if conditionOrder isn't available (e.g. refresh before selection)
    if (!conditionOrder || !Array.isArray(conditionOrder)) {
        return <Navigate to="/start" />;
    }

    // 4. Build a sequence for the experiment (only re-run again if input changes - avoid unneccessary rerenders)
    const experimentSequence = useMemo(() => {
        return buildExperimentSequence(conditionOrder, questionsByCategory, categories);
      }, [conditionOrder, questionsByCategory]);
    
      //console.log("🧠 stepIndex:", stepIndex);
      //console.log("📋 Total steps:", experimentSequence.length);
      //console.log("🔎 currentStep:", experimentSequence[stepIndex]);
    
    // 5. Keep track of what step we're currently on
    const currentStep = experimentSequence[stepIndex]

    // 6. Access chat history for category of current step (for perceived trust page)
    // Prepare combined chat history for the current category
    let combinedHistory = [];

    if (currentStep.type === "survey") {
    const categoryIndex = categories.indexOf(currentStep.category);
    const startQ = categoryIndex * 5 + 1;
    const endQ = startQ + 4;

    for (let i = startQ; i <= endQ; i++) {
        const key = i.toString();
        if (chatHistory[key]) {
        combinedHistory.push(...chatHistory[i]);
        }
    }
    }
    //console.log("🧾 Full chat history keys:", Object.keys(chatHistory));



    // Function to navigate to next page
    const handleNext = () => {
        const nextStep = stepIndex + 2; // Go to the next step (1-based for URL)
      
        //console.log("🧭 Navigating from:", stepIndex + 1);
        //console.log("➡️ Attempting to go to:", nextStep);
        //console.log("🧮 Sequence length:", experimentSequence.length);

        // Navigate to next step of the sequence, Or /thankyou
        if (nextStep <= experimentSequence.length) {
        navigate(`/experiment/${nextStep}`);
        } else {
        navigate("/thankyou");
        }
    };

      if (!currentStep) return <Navigate to="/" />;


  // Dynamically render the correct page
  switch (currentStep.type) {
    case "category":
      return <CategoryPage category={capitalizeFirstLetter(currentStep.category)} onNext={handleNext} />;

    case "question":
      const lifeline = lifelinesByCategory[currentStep.category]?.find(
        (item) => item.number === currentStep.questionIndex
      );

      return (
        <ExperimentSectionPage
          category={capitalizeFirstLetter(currentStep.category)}
          questionNumber={currentStep.questionIndex}
          question={currentStep.question.text}
          promptInstruction={getPromptInstruction(currentStep.condition, currentStep.chatShouldAnswerFalsely)}
          lifeline={lifeline}
          chatShouldAnswerFalsely={currentStep.chatShouldAnswerFalsely}
          googleShouldAnswerFalsely={currentStep.googleShouldAnswerFalsely}
          onNext={handleNext}
        />
      );

    case "survey":
      return (
        <PerceivedTrustPage
          category={capitalizeFirstLetter(currentStep.category)}
          questionNumber={currentStep.questionIndex}
          onNext={handleNext}
          chatHistory={combinedHistory}
        />
      );

    default:
      return <div>Unknown step type.</div>;

    }
}

export default ExperimentController;


/* HELPER FUNCTIONS */

const buildExperimentSequence = (conditionOrder, questionsByCategory, categories) => {
    
    const sequence = [];

    categories.forEach((category, catIndex) => {
        const condition = conditionOrder[catIndex];
        const questions = questionsByCategory[category];
    
        // 1. Add category-page before category
        sequence.push({ type: "category", category });
    
        // 2. Add 5 questions
        questions.forEach((question, qIndex) => {

          const chatShouldAnswerFalsely = Math.random() < 0.5; // 50% chance of giving a false answer
          const googleShouldAnswerFalsely = Math.random() < 0.5;

          sequence.push({
            type: "question",
            category,
            condition,
            question,
            questionIndex: catIndex * 5 + qIndex + 1,
            chatShouldAnswerFalsely,
            googleShouldAnswerFalsely
          });
        });
    
        // 3. Add survey after each category (except the last)
        sequence.push({ type: "survey", category, condition });
      });

      console.log("🧱 Full Experiment Sequence:", sequence);
    
      return sequence;

}

const buildShortExperimentSequence = (conditionOrder, questionsByCategory, categories) => {
  const sequence = [];

  const category = categories[0]; // just the first category
  const condition = conditionOrder[0];
  const questions = questionsByCategory[category].slice(0, 2); // only 2 questions

  // 1. Category intro
  sequence.push({ type: "category", category });

  // 2. Two short questions
  questions.forEach((question, qIndex) => {
    sequence.push({
      type: "question",
      category,
      condition,
      question,
      questionIndex: qIndex + 1,
    });
  });

  // 3. One survey
  sequence.push({ type: "survey", category, condition });

  return sequence;
};

const getPromptInstruction = (condition, chatShouldAnswerFalsely) => {

    let basePrompt;

    // Switch case, matching a base-prompt to A, B, C D.
    switch (condition) {
        case "A":
            basePrompt = "Respond to this prompt referring to yourself as 'I' when speaking. Respond to this prompt using expressions of certainty and confidence, like 'I am certain', 'I am sure', etc. Answer in only one sentence.";
            break;
        case "B":
            basePrompt = "Respond to this prompt referring to yourself as 'I' when speaking. Respond to this prompt using expressions of uncertainty and doubt. Use terms like 'i think' or 'i believe it might be' or 'it could perhaps be' in all sentences, even if you are sure. Answer in only one sentence.";
            break;
        case "C":
            basePrompt = "Start your response with 'the system has found that...'. Refer to yourself as 'the system' in all of your responses. Respond to this prompt using expressions of certainty and confidence. Answer in only one sentence.";
            break;
        case "D": 
            basePrompt = "Start your response with 'the system has found that...'. Refer to yourself as 'the system' in all of your responses. Use terms like 'The system has found that it might be' or 'the answer may be' or 'it could perhaps be' in all sentences, even if you are sure. Answer in only one sentence.";
            break;
        default:
          console.warn("⚠️ Unknown condition received:", condition);
          return "";
    }

    if (chatShouldAnswerFalsely) {
      return basePrompt + " Answer this question incorrectly, and be consistent with the incorrect answer."
    } else {
      return basePrompt
    }
};

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};