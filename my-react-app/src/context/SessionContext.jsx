import { createContext, useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { setDoc, doc, Timestamp } from "firebase/firestore";
import { db, auth } from "../firebase/firebase"; // adjust path if needed

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
            surveyHistory: {}, // Pre-survey
            conditionSurveyHistory: {}, // Condition-survey
            chatHistory: {},
            questionAnswerHistory: {},
            googleAnswerCountTotal: 0,
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

    // Add answers + confidence score + primary source
    const addQuestionAnswer = (questionNumber, data) => {
        setSessionHistory(prev => ({
            ...prev,
            questionAnswerHistory: {
                ...prev.questionAnswerHistory,
                [questionNumber]: {
                    ...(prev.questionAnswerHistory?.[questionNumber] || {}),
                    ...data,
                    shouldAnswerFalsely: data.shouldAnswerFalsely ?? false,
                    googleChecked: prev.questionAnswerHistory?.[questionNumber]?.googleChecked || false, // Default to false if not set
                }
            }
        }));
    };

    const googleAnswerCountTotal = () => {
        setSessionHistory((prev) => ({
            ...prev,
            googleAnswerCountTotal: (prev.googleAnswerCountTotal || 0) + 1, // Increment the count each time
        }));
    };

    const googleAnswerCountQuestion = (questionNumber) => {
        setSessionHistory((prev) => ({
            ...prev,
            questionAnswerHistory: {
                ...prev.questionAnswerHistory,
                [questionNumber]: {
                    ...(prev.questionAnswerHistory?.[questionNumber] || {}),
                    googleChecked: true, // Mark as true when Google answer is checked
                },
            },
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

    const saveSessionToFirebase = async (videoURL = null) => {
        const uid = auth.currentUser?.uid;

        if (!uid) {
          console.warn("User not authenticated. Session not saved.");
          return;
        }
      
        try {
          await setDoc(doc(db, "experiment_results", uid), {
            timestamp: Timestamp.now(),
            videoURL,
            ...sessionHistory, // spread session data into the document
          });
      
          console.log("Session data uploaded to Firebase for UID:", uid);
        } catch (error) {
          console.error("Error saving session to Firebase:", error);
        }
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
        <SessionContext.Provider value={{ sessionHistory, setSessionId, setSessionEnd, addConditionToHistory, addChatMessage, addQuestionAnswer, addSurveyAnswers, addConditionSurveyAnswers, googleAnswerCountTotal, googleAnswerCountQuestion, clearSessionHistory, saveSessionToFirebase, exportSessionHistory }}>
            {children}
        </SessionContext.Provider>
    )

}

export const useSession = () => useContext(SessionContext);
