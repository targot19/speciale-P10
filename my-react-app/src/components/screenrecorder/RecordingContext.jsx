import React, { createContext, useState, useContext } from "react";
import RecordRTC from "recordrtc";

const RecordingContext = createContext();

export const useRecording = () => useContext(RecordingContext);

export const RecordingProvider = ({ children }) => {
  const [recorder, setRecorder] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedVideoUrl, setRecordedVideoUrl] = useState(null);

  const startRecording = async () => {
    try {
      const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
      const newRecorder = new RecordRTC(screenStream, { type: "video" });
      newRecorder.startRecording();

      setRecorder(newRecorder);
      setIsRecording(true);
    } catch (error) {
      console.error("Error starting screen recording:", error);
      alert("Unable to start screen recording. Please check permissions.");
    }
  };

  const stopRecording = () => {
    if (recorder) {
      recorder.stopRecording(() => {
        const blob = recorder.getBlob();
        const videoUrl = URL.createObjectURL(blob);

        setRecordedVideoUrl(videoUrl);
        setRecorder(null);
        setIsRecording(false);
      });
    }
  };

  return (
    <RecordingContext.Provider
      value={{
        startRecording,
        stopRecording,
        isRecording,
        recordedVideoUrl,
      }}
    >
      {children}
    </RecordingContext.Provider>
  );
};