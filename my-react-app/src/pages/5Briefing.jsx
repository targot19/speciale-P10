import React from "react";
import { useRecording } from "../components/screenrecorder/RecordingContext";
import NextButton from "../components/NextButton";
import { Link } from "react-router-dom";
import InfoBox from "../components/InfoBox";

const Briefing = () => {
  const { startRecording, isRecording } = useRecording();

  return (
    <div className="bg-[#F4F4F4] min-h-screen flex flex-col items-center justify-center">
      <div className="flex-col flex items-center justify-center">
        <InfoBox>
          <h1 className="text-2xl font-bold">Start Recording</h1>
          <p>You will be able to stop the recording when you finish the experiment.</p>
          <div className="mt-2">
            {!isRecording ? (
                <button onClick={startRecording} className="btn btn-primary">
                Start Recording
                </button>
            ) : (
                <Link to="/experimentsection" rel="noopener noreferrer">
                <NextButton>Next</NextButton>
                </Link>
            )}
            </div>
        </InfoBox>
        </div>
      </div>
  );
};

export default Briefing;