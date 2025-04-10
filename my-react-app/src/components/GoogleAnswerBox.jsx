import { useState, useEffect } from "react";

const GoogleAnswerBox = ({ lifeline, resetTrigger }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(false);
  }, [resetTrigger]);

  const handleShowAnswer = () => {
    setIsVisible(true);
  };

  return (
    <div className="bg-gray-200 p-3 rounded-lg shadow-md mt-1">
      {/* Adds the icon on the left, we can replace it later if we want */}
      

      <div className="flex-1">
        {!isVisible ? (
          <button
            onClick={handleShowAnswer}
            className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500 transition text-xs flex items-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20 10 10 0 000-20z"
              />
            </svg>
            See Answer from Google
          </button>
        ) : (
          lifeline && (
            <div className="mt-2">
                <div className="text-xs text-gray-700 bg-white p-4 rounded border border-gray-300 overflow-y-auto"
                style={{ maxHeight: "100px" }}>
                {lifeline.text}
                </div>

                <h3 className="!text-base font-bold mt-2">{lifeline.title}</h3>

                <p className="text-gray-500 mt-2 text-xs">
                {lifeline.link.length > 30
                ? `${lifeline.link.slice(0, 40)}...`
                : lifeline.link}
                </p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default GoogleAnswerBox;