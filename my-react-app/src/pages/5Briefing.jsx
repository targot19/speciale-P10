import React from "react";
import { useRecording } from "../RecordingContext";
import NextButton from "../components/NextButton";
import { Link } from "react-router-dom";
import InfoBox from "../components/InfoBox";

const Briefing = () => {
  const { startRecording, isRecording } = useRecording();

  return (
    <div className="bg-[#F4F4F4] min-h-screen flex flex-col items-center justify-center">
      <div className="flex-col flex items-center justify-center">
        <InfoBox>
          <h1 className="text-2xl font-bold">Briefing</h1>
          <p className="mt-4">
            Thank you for finishing the questionnaire. Now, <b>the experiment begins!</b>
            <br />
            <br />
            The rest of the experiment goes as follows:
            <br />
            <br />
            There are four sections consisting of questions in these four categories: Music, Health, Geography, and Physics.
            <br />
            <br />
            In each section, you will have to ask the question to a chatbot. For the answer it provides, you will have the following choices: To use its answer, ask a follow-up question, or hypothetically use other sources. You can ask a maximum of one follow-up question.
          </p>
        </InfoBox>
        <div className="mt-4">
          {!isRecording ? (
            <button onClick={startRecording} className="btn btn-primary">
              Start Recording
            </button>
          ) : (
            <p className="text-green-500 font-semibold">Recording in progress...</p>
          )}
          <div className="mb-10 p-4">
            <Link to="/experimentsection" rel="noopener noreferrer">
              <NextButton>Next</NextButton>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Briefing;