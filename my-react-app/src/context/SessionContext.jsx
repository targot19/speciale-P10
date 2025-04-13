import { createContext, useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Conditions from "../pages/0Conditions";

const SessionContext = createContext();

// Provider-component, som kan hente data fra denne context
export const SessionProvider = ({ children }) => {
    const location = useLocation();

    const [sessionHistory, setSessionHistory] = useState(() => {
        // Load the session history from sessionStorage on start
        const savedSession = sessionStorage.getItem("sessionHistory");
        return savedSession ? JSON.parse(savedSession) : {
            sessionId: "",
            sessionEnd: "",
            conditionOrder: [],
            surveyHistory: {},
            chatHistory: {}
        };
    });

    // Save sessionHistory to sessionStorage whenever it changes
    useEffect(() => {
        sessionStorage.setItem("sessionHistory", JSON.stringify(sessionHistory));
    }, [sessionHistory]);

    
    // Assign conditionOrder based on URL /?sq=1–4 (only if it hasn't already been set w. buttons)
    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const squareIndex = urlParams.get("sq");

        const conditionMap = {
        1: ["A", "B", "D", "C"],
        2: ["B", "C", "A", "D"],
        3: ["C", "D", "B", "A"],
        4: ["D", "A", "C", "B"],
        };

        if (
            // Make sure there hasn't already been set a conditionOrder + number matches something in condition map
            squareIndex &&
            sessionHistory.conditionOrder.length === 0 &&
            conditionMap[squareIndex]
        ) {
            const parsedOrder = conditionMap[squareIndex];
            setSessionHistory((prev) => ({
                ...prev,
                conditionOrder: parsedOrder,
        }));
        console.log(`✔️ Condition order set from sq=${squareIndex}:`, parsedOrder);
        }
    }, [location.search, sessionHistory.conditionOrder.length]);
    
    
    // FUNCTIONS TO PERFORM SPECIFIC ACTIONS W. SESSION HISTORY
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

    const addSurveyAnswers = (answers) => {
        setSessionHistory(prev => ({
            ...prev,
            surveyHistory: {
                ...prev.surveyHistory,
                ...answers // merge new answers into the existing ones
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
        <SessionContext.Provider value={{ sessionHistory, setSessionId, setSessionEnd, addConditionToHistory, addChatMessage, addSurveyAnswers, clearSessionHistory, exportSessionHistory }}>
            {children}
        </SessionContext.Provider>
    )

}

export const useSession = () => useContext(SessionContext);
