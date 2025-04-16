import React, { createContext, useState, useContext } from "react";
import RecordRTC from "recordrtc";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth, storage } from "../../firebase/firebase"

const RecordingContext = createContext();

export const useRecording = () => useContext(RecordingContext);

export const RecordingProvider = ({ children }) => {
  const [recorder, setRecorder] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedVideoUrl, setRecordedVideoUrl] = useState(null);
  const [recordedBlob, setRecordedBlob] = useState(null);


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
        setRecordedBlob(blob); // store blob (for DB)
        setRecorder(null);
        setIsRecording(false);
      });
    }
  };

  const downloadRecordedVideo = () => {
    if (!recordedVideoUrl) {
      alert("No recorded video available to download.");
      return;
    }

    const link = document.createElement("a");
    link.href = recordedVideoUrl;
    link.download = "screen-recording.webm";
    link.click();
  };

  const uploadRecordedVideo = async () => {
    if (!recordedBlob) {
      console.warn("No recorded video blob to upload.");
      return null;
    }
  
    const uid = auth.currentUser?.uid;
    if (!uid) {
      console.warn("User not authenticated.");
      return null;
    }
  
    const filename = `experiment_${Date.now()}.webm`;
    const storageRef = ref(storage, `videos/${uid}/${filename}`);
  
    try {
      const snapshot = await uploadBytes(storageRef, recordedBlob, {
        contentType: "video/webm",
      });
      const downloadURL = await getDownloadURL(snapshot.ref);
      console.log("🎥 Video uploaded successfully:", downloadURL);
      return downloadURL;
    } catch (error) {
      console.error("Error uploading video:", error);
      return null;
    }
  };
  

  return (
    <RecordingContext.Provider
      value={{
        startRecording,
        stopRecording,
        isRecording,
        recordedVideoUrl,
        recordedBlob,
        downloadRecordedVideo,
        uploadRecordedVideo
      }}
    >
      {children}
    </RecordingContext.Provider>
  );
};