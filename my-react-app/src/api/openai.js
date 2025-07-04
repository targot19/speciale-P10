import axios from "axios";

// For testing: Checking at API key is accessed
//console.log("API key being used:", import.meta.env.VITE_OPENAI_API_KEY);

// Create an instance of axios
const openai = axios.create({
    baseURL: "https://api.openai.com/v1", //base url
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
    },
  });
  
  // Async function that takes a prompt (user input) and fetches a response from OpenAI
  export const fetchChatGPTResponse = async (messages) => {
    try {
      console.log("Sending messages to OpenAI:", messages);

      // Post request
      const response = await openai.post("/chat/completions", {
        model: "gpt-4o-mini",
        messages, // exprects a full list/history of input and prompt-instructions
        max_tokens: 100,
      });

      console.log("✅ OpenAI response:", response.data);
  
      return response.data.choices[0].message.content; // return text generated by ChatGPT
    
    } catch (error) {
        // Error handling:
      console.error("❌ Error fetching response:", error);
      return "Something went wrong!";
    }
  };