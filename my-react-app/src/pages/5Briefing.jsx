import React from "react";
import { useRecording } from "../RecordingContext";
import NextButton from "../components/NextButton";
import { Link } from "react-router-dom";

const Briefing = () => {
  const { startRecording, isRecording } = useRecording();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold">Briefing</h1>
      <p className="mt-4">
        This is the briefing page. You can start the screen recording here.
      </p>
      <div className="mt-4">
        {!isRecording ? (
          <button onClick={startRecording} className="btn btn-primary">
            Start Recording
          </button>
        ) : (
          <p className="text-green-500 font-semibold">Recording in progress...</p>
        )}
      </div>
      <div className="mb-10">
        <Link to="/experimentsection" rel="noopener noreferrer">
          <NextButton>Next</NextButton>
        </Link>
      </div>
    </div>
  );
};

export default Briefing;