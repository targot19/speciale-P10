import ConditionQuestionBox from "../components/ConditionQuestionBox";

const PerceivedTrust = () => {
    const options = [
        { value: "1", label: "Strongly agree" },
        { value: "2", label: "Agree" },
        { value: "3", label: "Neither agree nor disagree" },
        { value: "4", label: "Disagree" },
        { value: "5", label: "Strongly disagree" },
    ];

    return (
        <div className="flex items-center justify-center">
            <div className="flex flex-col gap-6 w-full max-w-3xl items-center">
            <div className="bg-gray-200 p-4 mb-4 rounded-lg shadow-md w-full" style={{ maxWidth: "600px" }}>
                <ConditionQuestionBox
                    question="I believe that the chatbot would act in my best interest."
                    options={options}
                />
                </div>
                <div className="bg-gray-200 p-4 mb-4 rounded-lg shadow-md w-full" style={{ maxWidth: "600px" }}>
                <ConditionQuestionBox
                    question="I would characterize the chatbot as honest."
                    options={options}
                />
                </div>
                <div className="bg-gray-200 p-4 mb-4 rounded-lg shadow-md w-full" style={{ maxWidth: "600px" }}>
                <ConditionQuestionBox
                    question="The chatbot is competent and effective in providing answers."
                    options={options}
                />
                </div>
            </div>
        </div>
    )
};

export default PerceivedTrust;