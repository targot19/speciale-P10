import { createContext, useContext, useState, useEffect } from "react";

const SessionContext = createContext();

// Provider-component, som kan hente data fra denne context
export const SessionProvider = ({ children }) => {
    const [sessionHistory, setSessionHistory] = useState(() => {
        // Load the session history from localStorage on start
        const savedSession = localStorage.getItem("sessionHistory");
        return savedSession ? JSON.parse(savedSession) : {
            sessionId: "",
            conditionOrder: "",
            surveyHistory: {},
            chatHistory: {}
        };
    });

    // Save sessionHistory to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem("sessionHistory", JSON.stringify(sessionHistory));
    }, [sessionHistory]);

    // Functions to perform different actions w. the session history

    const setSessionId = () => {
        const timestamp = new Date().toISOString(); // Date object, as string
        setSessionHistory(prev => ({
            ...prev,
            sessionId: timestamp
        }));
    };

    const addConditionToHistory = (condition) => {
        setSessionHistory(prev => ({
            ...prev,
            condition
        }));
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
            conditionOrder: "",
            surveyHistory: {},
            chatHistory: {}
        });
        localStorage.removeItem("sessionHistory"); // Clear from localStorage as well
    };

    return (
        <SessionContext.Provider value={{ sessionHistory, setSessionId, addConditionToHistory, addChatMessage, addSurveyAnswers, clearSessionHistory, exportSessionHistory }}>
            {children}
        </SessionContext.Provider>
    )

}

export const useSession = () => useContext(SessionContext);
