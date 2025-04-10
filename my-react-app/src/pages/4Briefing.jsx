import InfoBox from "../components/InfoBox";
import NextButton from "../components/NextBtn";

const Briefing = () => {
    return (
        <div className="bg-[#F4F4F4] min-h-screen flex flex-col items-center">
            <div className="flex-grow flex items-center justify-center">
                <InfoBox>
                    <h1 className="text-2x2 font-bold">Briefing</h1>
                    <p className="mt-4">Thank you for finishing the questionnaire. Now, <b>the experiment begins!</b><br />
                        <br />
                        You will have to answer <b>five questions</b> within <b>four different categories</b>, which means you will have to answer <b>20 questions</b> in total.<br />
                        <br />
                        The four categories are: <b>Music, Health, Geography, and Physics</b>. In each category section, the five questions will appear continuously;
                        once you've finished a question, the next will appear until you've finished all five questions within that category.
                        You will have to interact with a chatbot in each section who will provide the answer you're looking for.<br /><br />
                        <i>It is important to note that you will not write your answer anywhere. You will simply have to choose whether to use the chatbot's answer or not.</i><br /><br />
                        For the answer it provides, you will have the following choices: <b>1)</b> To use its answer, <b>2)</b> ask a follow-up question, or <b>3)</b> hypothetically use other sources. You can ask a maximum of one follow-up question.
                        Before proceeding to the next category, you will have to answer three questions about the chatbot you've interacted with.<br /><br />
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