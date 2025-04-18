import InfoBox from "../components/InfoBox";
import NextButton from "../components/NextBtn";

const Briefing = () => {
    return (
        <div className="bg-[#F4F4F4] min-h-screen flex flex-col items-center">
            <div className="flex-grow flex items-center justify-center">
                <InfoBox>
                    <h1 className="text-2x2 font-bold">Briefing</h1>
                    <p className="mt-4">Thank you for finishing the questionnaire. Now, <b>the experiment begins!</b><br /><br />

                        You will have to answer <b>five questions</b> within <b>four different categories</b>,
                        which means you will have to answer <b>20 questions</b> in total.
                        With every question, you can make the chatbot assist you in finding the answer. Psst... You can click the question box and transfer it to the input field! 
                            Additionally, you have the opportunity to view a top answer from Google for each question <i>after</i> you've prompted the chatbot <u>at least once.</u><br /><br />

                        Every question has a correct yes-or-no answer.
                            For every question, you'll be asked to rate how confident you are in your answer 
                            and thereafter choose what your primary source was - Chatbot, Google, or prior knowledge. <b>After the experiment, you will receive your total score of correct answers.</b><br /><br />
                        
                        Between each category, you'll have to answer <b>11</b> questions 
                            about the chatbot you've just interacted with.<br /><br />

                        We will record your session for analysis purposes. On the next page, you can start the recording.<br /><br />
                        
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