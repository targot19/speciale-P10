import ConditionQuestionBox from "../components/ConditionQuestionBox";

const PerceivedTrust = () => {
    const options = [
        { value: "1", label: "Lort" },
        { value: "2", label: "Pretty shite" },
        { value: "3", label: "Ja okay" },
        { value: "4", label: "Den er fin" },
        { value: "5", label: "Poggers!" },
    ];

    return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-6 p-6">
            <div className="flex flex-col gap-8 w-full max-w-3xl">
                <div className="bg-gray-200 p-4 mb-4 rounded-lg shadow-md w-full max-w-md">
                <ConditionQuestionBox
                    question="I believe that the chatbot would act in my best interest."
                    options={options}
                />
                </div>
                <div className="bg-gray-200 p-4 mb-4 rounded-lg shadow-md w-full max-w-md">
                <ConditionQuestionBox
                    question="I would characterize the chatbot as honest."
                    options={options}
                />
                </div>
                <div className="bg-gray-200 p-4 mb-4 rounded-lg shadow-md w-full max-w-md">
                <ConditionQuestionBox
                    question="The chatbot is competent and effective in providing answers."
                    options={options}
                />
                </div>
            </div>
        </div>
    );
}

export default PerceivedTrust;