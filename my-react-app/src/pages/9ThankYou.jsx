import React from "react";
import { useRecording } from "../components/screenrecorder/RecordingContext";
import InfoBox from "../components/InfoBox";

const ThankYou = () => {
  const { isRecording, stopRecording, recordedVideoUrl } = useRecording();

  const handleStopRecording = () => {
    stopRecording();
  };

    return (
      <div className="bg-[#F4F4F4] min-h-screen flex flex-col items-center justify-center">
        <div className="flex-col flex items-center justify-center">
          <InfoBox>
            <h2 className="text-2xl font-bold">Thank You!</h2>
            <p className="mt-4">
                You have finished the experiment.<br /><br />
                <b>1)</b> Click "Stop Recording" below to stop the screen recording.<br />
                <b>2)</b> Click "Download", so we can save the recording to the computer.<br />
                <b>3)</b> Leave the room, so we can ask you some final questions.
            </p>
            <div className="mt-2">
              {isRecording ? (
                  <button onClick={handleStopRecording} className="btn btn-primary">
                  Stop Recording
                  </button>
              ) : (
                    <a href={recordedVideoUrl} download="screen-recording.webm" className="btn btn-primary mt-2">
                        Download
                    </a>
                        
                )}
              </div>
          </InfoBox>
          </div>
        </div>
    );
  };

export default ThankYou;