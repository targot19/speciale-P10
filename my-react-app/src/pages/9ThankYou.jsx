import React, { useEffect } from "react";
import { useRecording } from "../components/screenrecorder/RecordingContext";
import InfoBox from "../components/InfoBox";
import { useSession } from "../context/SessionContext";

const ThankYou = () => {
  const { isRecording, stopRecording, downloadRecordedVideo, recordedVideoUrl } = useRecording();
  const { sessionHistory, exportSessionHistory, setSessionEnd } = useSession();

  const handleStopRecording = () => {
    stopRecording();
  };

  // Set session end when the page renders
  useEffect(() => {
    setSessionEnd();
  }, []);

  // Export session history after sessionEnd is updated
  useEffect(() => {
    if (sessionHistory.sessionEnd) {
      exportSessionHistory(); // Export session history after sessionEnd is set
    }
  }, [sessionHistory.sessionEnd]); // Trigger when sessionEnd is updated

  useEffect(() => {
    if (recordedVideoUrl) {
      downloadRecordedVideo();
    }
  }, [recordedVideoUrl]);

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
                  <p className="text-green-500 mt-2">Recording stopped. Files downloaded.</p>   
                )}
              </div>
          </InfoBox>
          </div>
        </div>
    );
  };

export default ThankYou;