import PreSurveyQuestionBox from "../components/PreSurveyQuestionBox/PreSurveyQuestionBox";

const DemographicQuestionnaire = () => {
    return (
        <div>
            <h1>Demographic Questionnaire</h1>
                <PreSurveyQuestionBox
                    question="What is your age?"
                    options={[
                        "18-24",
                        "25-34",
                        "35-44",
                        "45-54",
                        "55-64",
                        "65+",
                    ]}
                />
        </div>
    );
}

export default DemographicQuestionnaire;