import { useState, useEffect } from "react";
import { useSession } from "../context/SessionContext";

const GoogleAnswerBox = ({ lifeline, resetTrigger }) => {
  const [isVisible, setIsVisible] = useState(false);
  const { googleAnswerCounter } = useSession(); // Access the google incrementer

  useEffect(() => {
    setIsVisible(false);
  }, [resetTrigger]);

  const handleShowAnswer = () => {
    setIsVisible(true);
    googleAnswerCounter(); // Increment the counter
  };

  return (
    <div className="bg-gray-200 p-3 rounded-lg shadow-md mt-0">
      <div className="flex flex-1 justify-center items-center">
        {!isVisible ? (
          <button
            onClick={handleShowAnswer}
            className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500 transition text-xs flex justify-center items-center gap-2 font-sans"
            style={{ fontFamily: "'Roboto', sans-serif" }}
          >
          <img
            src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png"
            alt="Google G Logo"
            className="h-4 w-4"
          />
          See a top answer from Google
          </button>
        ) : (
          lifeline && (
            <div className="mt-2">
              {/* Adds the Google logo */}
              <div className="flex items-center gap-2 mb-2">
                <img
                  src="https://www.gstatic.com/images/branding/googlelogo/svg/googlelogo_clr_74x24px.svg"
                  alt="Google Logo"
                  className="h-4"
                />
                <span className="text-xs font-roboto text-gray-600 ml-auto">Top answer from Google</span>
              </div>

              {/* Display the answer text */}
              <div
                className="text-s text-gray-700 bg-white p-4 rounded border border-gray-300 w-lg overflow-y-auto"
                style={{
                  maxHeight: "100px",
                  fontFamily: "'Roboto', sans-serif",
                }}
              >
                {lifeline.text}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default GoogleAnswerBox;