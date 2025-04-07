import InfoBox from "../components/InfoBox";
import NextButton from "../components/NextButton";
import { Link } from "react-router-dom";


const Landing = () => {
        
    return (
        <div className="min-h-screen flex flex-col items-center">
            <div className="flex-grow flex items-center justify-center">
                <InfoBox>
                    <h1 className="text-2xl font-bold">Welcome!</h1>
                    <p className="mt-4 text-align">
                        <b>Thank you</b> for participating in this experiment.<br /><br />
                        Before the experiment begins, we want to know a bit more about you.<br /><br />
                        When you click "Next", you will be redirected to the <b>first part</b> of the questionnaire.
                            This involves a few demographic questions about your age, gender, level of education,
                            comfort with digital technologies, and how often you use AI systems.<br /><br />
                        The <b>second part</b> of the questionnaire concerns your attitude towards AI systems in general.<br /><br />
                        <i>You need to answer all questions in each part, before you are able to proceed.</i><br /><br />
                        When you have finished the two-part questionnaire, the experiment will soon begin. You are able to see a short briefing before being able to proceed,
                            so you get an idea about what the experiment is about.<br /><br />
                        Click "<b>Next</b>” to start the questionnaire.</p>
                </InfoBox>
            </div>
            <div className="mb-10">
                <NextButton to="/demographics">Next</NextButton>
            </div>
        </div>
    );
};

export default Landing;