import InfoBox from "../components/InfoBox";
import NextButton from "../components/NextBtn";
import { Link } from "react-router-dom";
import { useSession } from "../context/SessionContext";
import { useEffect } from "react";

const Landing = () => {
    const { setSessionId } = useSession();

    useEffect(() => {
      setSessionId();
    }, []);
        
    return (
        <div className="min-h-screen flex flex-col items-center">
            <div className="flex-grow flex items-center justify-center">
                <InfoBox>
                    <h1 className="text-2xl font-bold">Welcome!</h1>
                    <p className="mt-4 text-align">
                        <b>Thank you</b> for participating in this experiment.<br />

                        Before the experiment begins, we want to know a bit more about you.<br /><br />

                        When you click "Next", you will be redirected to the <b>first part</b> of the questionnaire.
                            This involves a few demographic questions about your age, gender, level of education,
                            comfort with digital technologies, and how often you use AI systems.<br /><br />

                        The <b>second part</b> of the questionnaire concerns your attitude towards AI systems in general.
                            By AI systems we mean devices that can perform tasks that would usually require human intelligence.
                            Note that these can be computers, robots or other hardware devices, possibly augmented with sensors or cameras, etc.<br />
                            <b>There are no right or wrong answers.</b> We are interested in your personal views.<br /><br />

                        <i>You need to answer all questions in each part before you are able to proceed.</i><br /><br />

                        When you have finished the two-part questionnaire, the experiment will begin soonly.
                            You are able to see a short briefing before being able to proceed,
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