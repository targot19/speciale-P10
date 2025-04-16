import React, { useEffect, useRef } from "react";
import { useRecording } from "../components/screenrecorder/RecordingContext";
import InfoBox from "../components/InfoBox";
import { useSession } from "../context/SessionContext";
import { resetFirebaseUser } from "../firebase/anonAuth";

const ThankYou = () => {
  const { isRecording, stopRecording, downloadRecordedVideo, recordedVideoUrl, uploadRecordedVideo, recordedBlob } = useRecording();
  const { exportSessionHistory, setSessionEnd, saveSessionToFirebase } = useSession();
  const isSavingRef = useRef(false);
  const hasSavedRef = useRef(false);

  const handleStopRecording = () => {
    setSessionEnd();
    stopRecording(); // Stop the recording
  };

  // Download video + data as json.
  useEffect(() => {
    if (recordedVideoUrl) {
      exportSessionHistory(); // Download the session history
      downloadRecordedVideo(); // Download the recorded video
    }
  }, [recordedVideoUrl]); // Trigger when recordedVideoUrl changes

  // Save data + video to database
  useEffect(() => {
    const saveAndReset = async () => {
      if(hasSavedRef.current || isSavingRef.current || !recordedBlob) return // If hasSaved or isSaving is true OR video doesn't exist, don't run
      
      isSavingRef.current = true; // Saving in process

      try {
        // REMOVE COMMENTS TO UPLOAD VIDEO
        //const videoURL = await uploadRecordedVideo(); // get video as recordedBlob
        //console.log("Download URL:", videoURL); // Check to see if there's access to URL


        await saveSessionToFirebase(videoURL);
        hasSavedRef.current = true; // Save successful
        await resetFirebaseUser();
        console.log("Session saved and user reset ✅");
      } catch (error) {
        console.error("Error inside saveAndReset:", error);
      } finally {
        isSavingRef.current = false; // Saving process done
      }
    };
  
    saveAndReset();
  }, [recordedBlob]); // Wait until video is ready before saving/uploading

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