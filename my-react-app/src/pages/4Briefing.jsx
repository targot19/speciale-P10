import InfoBox from "../components/InfoBox";
import NextButton from "../components/NextBtn";
import { Link } from 'react-router-dom';

const Briefing = () => {
    return (
        <div className="bg-[#F4F4F4] min-h-screen flex flex-col items-center">
            <div className="flex-grow flex items-center justify-center">
                <InfoBox>
                    <h1 className="text-2x2 font-bold">Briefing</h1>
                    <p className="mt-4">Thank you for finishing the questionnaire. Now, <b>the experiment begins!</b><br /><br />

                        You will have to answer <b>five questions</b> within <b>four different categories</b>,
                        which means you will have to answer <b>20 questions</b> in total.<br /><br />

                        The four categories are: <b>Music, Health, Geography, and Physics</b>.
                            With every question, you can prompt the chatbot a maximum of three times.
                            Additionally, you have the opportunity to view the top answer from Google for each question 
                            <i>after</i> you've prompted the chatbot <u>at least once.</u><br /><br />

                        Every question has a correct yes-or-no answer,
                            and for every answer you'll be asked to rate your confidence in your answer 
                            and thereafter choose what your primary source was (Chatbot, Google, or Prior knowledge). 
                            <b>After the experiment, you will receive your total score of correct answers.</b><br /><br />
                        
                        Before proceeding to the next category, you will have to answer <b>?</b> questions 
                            about the chatbot you've interacted with.<br /><br />

                        We will record your session for analysing purposes. On the next page, you can start the recording.<br /><br />
                        
                        <b>Good luck!</b>
                    </p>
                </InfoBox>
            </div>
            <div className="mb-10">
                <NextButton to="/briefing2">Next</NextButton>
            </div>
        </div>
    );
};

export default Briefing;