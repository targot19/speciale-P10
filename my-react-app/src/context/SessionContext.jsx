import { createContext, useContext, useState, useEffect } from "react";
import Conditions from "../pages/0Conditions";

const SessionContext = createContext();

// Provider-component, som kan hente data fra denne context
export const SessionProvider = ({ children }) => {
    const [sessionHistory, setSessionHistory] = useState(() => {
        // Load the session history from sessionStorage on start
        const savedSession = sessionStorage.getItem("sessionHistory");
        return savedSession ? JSON.parse(savedSession) : {
            sessionId: "",
            sessionEnd: "",
            conditionOrder: [],
            surveyHistory: {}, // Pre-survey
            conditionSurveyHistory: {}, // Condition-survey
            chatHistory: {},
            questionAnswerHistory: {}
        };
    });

    // Save sessionHistory to sessionStorage whenever it changes
    useEffect(() => {
        sessionStorage.setItem("sessionHistory", JSON.stringify(sessionHistory));
    }, [sessionHistory]);

    // Functions to perform different actions w. the session history

    const setSessionId = () => {
        const timestamp = new Date().toLocaleString("en-GB", { timeZone: "Europe/Copenhagen" }); // Date object, as string
        setSessionHistory(prev => ({
            ...prev,
            sessionId: timestamp
        }));
    };

    const setSessionEnd = () => {
        const timestamp = new Date().toLocaleString("en-GB", { timeZone: "Europe/Copenhagen" }); // Date object, as string
        setSessionHistory(prev => ({
            ...prev,
            sessionEnd: timestamp
        }));
    };

    const addConditionToHistory = (condition) => {
        const conditionArray = Array.isArray(condition)
          ? condition
          : condition.trim().split(" "); // split string like "A B D C"
      
        setSessionHistory((prev) => ({
          ...prev,
          conditionOrder: conditionArray // This replaces the array
        }));

        console.log("Condition order set to: ", conditionArray); // Debugging line
        
      };

    // For pre-survey
    const addSurveyAnswers = (answers) => {
        setSessionHistory(prev => ({
            ...prev,
            surveyHistory: {
                ...prev.surveyHistory,
                ...answers // merge new answers into the existing ones
            }
        }));
    }; 

    // For condition survey
    const addConditionSurveyAnswers = (category, answers) => {
        setSessionHistory(prev => ({
            ...prev,
            conditionSurveyHistory: {
                ...prev.conditionSurveyHistory,
                [category]: {
                    ...(prev.conditionSurveyHistory?.[category] || {}),
                    ...answers
                }
            }
        }));
    };

    const addChatMessage = (questionNumber, message) => {
        setSessionHistory(prev => ({
            ...prev,
            chatHistory: {
                ...prev.chatHistory,
                [questionNumber]: [
                    ...(prev.chatHistory[questionNumber] || []),
                    message
                ]
            }
        }));
    };

    const addQuestionAnswer = (questionNumber, data) => {
        setSessionHistory(prev => ({
            ...prev,
            questionAnswerHistory: {
                ...prev.questionAnswerHistory,
                [questionNumber]: {
                    ...(prev.questionAnswerHistory?.[questionNumber] || {}),
                    ...data
                }
            }
        }));
    };

    const exportSessionHistory = () => {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(sessionHistory, null, 2));
        const downloadAnchorNode = document.createElement("a");
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", "session_history.json");
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    };

    const clearSessionHistory = () => {
        setSessionHistory({
            sessionId: "",
            sessionEnd: "",
            conditionOrder: [],
            surveyHistory: {},
            chatHistory: {}
        });
        sessionStorage.removeItem("sessionHistory"); // Clear from sessionStorage as well
    };

    return (
        <SessionContext.Provider value={{ sessionHistory, setSessionId, setSessionEnd, addConditionToHistory, addChatMessage, addQuestionAnswer, addSurveyAnswers, addConditionSurveyAnswers, clearSessionHistory, exportSessionHistory }}>
            {children}
        </SessionContext.Provider>
    )

}

export const useSession = () => useContext(SessionContext);
