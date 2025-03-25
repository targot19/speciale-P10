import PreSurveyQuestionBox from "../components/PreSurveyQuestionBox/PreSurveyQuestionBox";
import RadioButtonsGroup from "../components/PreSurveyQuestionBox/RadioButtonsGroup";

const DemographicQuestionnaire = () => {
    return (
        <div>
            <h1>Demographic Questionnaire</h1>
            <div>
            <RadioButtonsGroup
                question="What is your age?"
                options={["18-24", "25-34", "35-44", "45-54", "55-64", "65+"]}
            />
            </div>
            <div>
                <RadioButtonsGroup
                    question="What is your gender?"
                    options={["Female", "Male", "Non-binary", "Other", "Prefer not to say"]}
                />
            </div>
            <div>
                <RadioButtonsGroup
                    question="What is your highest level of education?"
                    options={["Primary and lower secondary education (Grundskole)",
                        "Upper secondary / high school or vocational education (Gymnasiale og erhvervsfaglige uddannelser)",
                        "Short-cycle higher education (Erhvervsakademi) - 1-2 years",
                        "Medium-cycle higher education (Bachelor, professionsbachelor) - 3-3,5 years",
                        "Long-cycle higher education (Kandidat) 5 years or more",
                        "PhD and research education"]}
                />
            </div>
            <div>
                <RadioButtonsGroup
                    question="In which region do you live?"
                    options={["North Jutland (Nordjylland)",
                        "Central Jutland (Midtjylland)",
                        "Southern Jutland (Syddanmark)",
                        "Zealand (Sjælland)",
                        "Capital (Hovedstaden)"]}
                />
            </div>
            <div>
                <RadioButtonsGroup
                    question="How would you rate your overall comfort with using digital technologies?"
                    options={["Very high", "Slightly high", "Neutral", "Slightly low", "Very low"]}
                />
            </div>
            <div>
                <RadioButtonsGroup
                    question="I have used or currently use AI systems (e.g. ChatGPT, Copilot, Gemini, etc.) in my day-to-day life."
                    options={["Strongly agree", "Slightly agree", "Neither agree nor disagree", "Slightly disagree", "Strongly disagree"]}
                />
            </div>
        </div>
    );
}

export default DemographicQuestionnaire;