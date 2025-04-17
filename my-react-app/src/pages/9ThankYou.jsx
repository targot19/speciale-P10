import React, { useEffect, useRef, useState } from "react";
import { useRecording } from "../components/screenrecorder/RecordingContext";
import InfoBox from "../components/InfoBox";
import { useSession } from "../context/SessionContext";
import { resetFirebaseUser } from "../firebase/anonAuth";

const ThankYou = () => {

  const {
    isRecording,
    stopRecording,
    downloadRecordedVideo,
    recordedVideoUrl,
    uploadRecordedVideo,
    recordedBlob,
  } = useRecording();

  const {
    exportSessionHistory,
    setSessionEnd,
    saveSessionToFirebase,
  } = useSession();

  // Variable to keep track of progress
  const [submissionStatus, setSubmissionStatus] = useState("idle"); // "idle" | "saving" | "success" | "error"

  // function to control flow for ending experiment / saving to database / exporting files
  const handleEndExperiment = async () => {
    setSubmissionStatus("saving");

    try {
      setSessionEnd(); // Always mark end of session

      // 1. Get recording:
      if (isRecording) stopRecording(); // If recording, stop

      let videoURL = null;

      // Add a little waittime, for video-blob to become available.
      // Wait until recordedBlob is ready (max 3 seconds, polling every 100ms)
      let attempts = 0;
      while (!recordedBlob && attempts < 30) {
        await new Promise((res) => setTimeout(res, 100));
        attempts++;
      }
      if (recordedBlob) {
        videoURL = await uploadRecordedVideo(); // Upload to firebase storage + get url
        downloadRecordedVideo(); // Save to disk
      } else {
        console.warn("recordedBlob was not available after waiting.")
      }

      // 2. Export data / upload data to database
      exportSessionHistory(); // Export session to JSON locally
      await saveSessionToFirebase(videoURL); // Save to Firestore (with or without video)
      await resetFirebaseUser(); // Sign out + prepare for new user
      setSubmissionStatus("success");

    } catch {
      console.error("Submission error:", error);
      setSubmissionStatus("error");
    }

  };

    return (
      <div className="bg-[#F4F4F4] min-h-screen flex flex-col items-center justify-center">
        <div className="flex-col flex items-center justify-center">
          <InfoBox>
            <h2 className="text-2xl font-bold">Thank You!</h2>
            <p className="mt-4">
              You have finished the experiment.
              <br /><br />
              Please click the button below to submit your data and video recording.
            </p>

            <button
              onClick={handleEndExperiment}
              className="btn btn-primary mt-4"
              disabled={submissionStatus === "saving" || submissionStatus === "success"}
            >
              {submissionStatus === "saving"
                ? "Submitting..."
                : "End Experiment and Submit"}
            </button>

            {submissionStatus === "success" && (
              <p className="text-green-600 mt-4 font-semibold">
                ✅ Submission successful. Thank you! Please contact the team.
              </p>
            )}

            {submissionStatus === "error" && (
              <p className="text-red-600 mt-4 font-semibold">
                ❌ Something went wrong. Please try again or contact the team.
              </p>
            )}
          </InfoBox>
        </div>
    </div>
  );
};

export default ThankYou;

/*
const ThankYou = () => {
  const { isRecording, stopRecording, downloadRecordedVideo, recordedVideoUrl, uploadRecordedVideo, recordedBlob } = useRecording();
  const { sessionHistory, exportSessionHistory, setSessionEnd, saveSessionToFirebase } = useSession();
  const isSavingRef = useRef(false);
  const hasSavedRef = useRef(false);

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

  // Download video.
  useEffect(() => {
    if (recordedVideoUrl) {
      downloadRecordedVideo();
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
                <b>2)</b> Leave the room, so we can ask you some final questions.
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
*/