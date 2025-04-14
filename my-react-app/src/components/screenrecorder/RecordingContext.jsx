import React, { createContext, useState, useContext } from "react";
import RecordRTC from "recordrtc";
import * as FFmpegWASM from "@ffmpeg/ffmpeg"; // Import everything

const ffmpeg = new FFmpegWASM.FFmpeg(); // Access FFmpeg class
const fetchFile = FFmpegWASM.fetchFile;  // Access fetchFile function

const RecordingContext = createContext();

export const useRecording = () => useContext(RecordingContext);

export const RecordingProvider = ({ children }) => {
  const [recorder, setRecorder] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedVideoUrl, setRecordedVideoUrl] = useState(null);
  const [recordedBlob, setRecordedBlob] = useState(null); // new state

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
  
        setRecordedBlob(blob); // store blob here
        setRecordedVideoUrl(videoUrl);
        setRecorder(null); // now it's safe to clear
        setIsRecording(false);
      });
    }
  };

  const convertToMp4 = async (webmBlob) => {
    try {
      if (!ffmpeg.isLoaded()) {
        console.log("Loading FFmpeg...");
        await ffmpeg.load();
        console.log("FFmpeg loaded.");
      }
  
      const webmData = await fetchFile(webmBlob);
      console.log("WEBM file fetched, writing to FFmpeg FS...");
      ffmpeg.FS("writeFile", "input.webm", webmData);
  
      console.log("Running FFmpeg conversion...");
      await ffmpeg.run("-i", "input.webm", "output.mp4");
  
      console.log("Reading output.mp4...");
      const mp4Data = ffmpeg.FS("readFile", "output.mp4");
  
      const mp4Blob = new Blob([mp4Data.buffer], { type: "video/mp4" });
      return mp4Blob;
    } catch (err) {
      console.error("Error inside convertToMp4:", err);
      throw err;
    }
  };
  

  const downloadRecordedVideo = async () => {
    if (!recordedVideoUrl || !recordedBlob) {
      alert("No recorded video available to download.");
      return;
    }
  
    try {
      const mp4Blob = await convertToMp4(recordedBlob);
  
      const link = document.createElement("a");
      link.href = URL.createObjectURL(mp4Blob);
      link.download = "screen-recording.mp4";
      link.click();
    } catch (error) {
      console.error("Error converting or downloading video:", error);
      alert("An error occurred while converting or downloading the video.");
    }
  };

  return (
    <RecordingContext.Provider
      value={{
        startRecording,
        stopRecording,
        isRecording,
        recordedVideoUrl,
        downloadRecordedVideo,
      }}
    >
      {children}
    </RecordingContext.Provider>
  );
};
