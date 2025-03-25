import InfoBox from "../components/InfoBox";
import NextButton from "../components/NextButton";

const Landing = () => {
    return (
        <div className="bg-[#F4F4F4] min-h-screen flex flex-col items-center">
            <div className="flex-grow flex items-center justify-center">
                <InfoBox>
                    <h1 className="text-2xl font-bold">Welcome</h1>
                    <p className="mt-4">Thank you for participating in this experiment. Firstly, we want to know a bit more about you.<br />
                    Click “Next” to start the questionnaire.</p>
                </InfoBox>
            </div>
            <div className="mb-10">
                <NextButton />
            </div>
        </div>
    );
};

export default Landing;