import React from "react";
import { useRecording } from "../RecordingContext";
import InfoBox from "../components/InfoBox";

const ThankYou = () => {
  const { stopRecording } = useRecording();

  const handleStopRecording = () => {
    stopRecording();
  };

  return (
    <div className="bg-[#F4F4F4] min-h-screen flex flex-col items-center">
      <div className="flex-grow flex items-center justify-center">
        <InfoBox>
          <h1 className="text-2xl font-bold">Thank You!</h1>
          <p className="mt-4">You have finished the experiment! Please, click the button below to stop the screen recording.<br />
            Then leave the room, so we can finish off with a few questions.</p>
        </InfoBox>
      </div>
      <div className="mb-10">
        <button onClick={handleStopRecording} className="btn btn-danger mt-4">
          Stop Recording
        </button>
      </div>
    </div>
  );
};

export default ThankYou;