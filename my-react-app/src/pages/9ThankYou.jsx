import React, { useEffect, useRef, useState } from "react";
import { useRecording } from "../components/screenrecorder/RecordingContext";
import InfoBox from "../components/InfoBox";
import { useSession } from "../context/SessionContext";
import { resetFirebaseUser } from "../firebase/anonAuth";


const ThankYou = () => {

  const {
    isRecording,
    stopRecording,
    uploadRecordedVideo,
    recordedBlob,
    wasRecordingInterrupted
  } = useRecording();

  const {
    exportSessionHistory,
    setSessionEnd,
    saveSessionToFirebase,
  } = useSession();

  // Mark session end as soon as this page loads (fires only once)
  useEffect(() => {
    setSessionEnd();
  }, []);
      

  // Variable to keep track of progress
  const [submissionStatus, setSubmissionStatus] = useState("idle"); // "idle" | "saving" | "success" | "error"

  // function to handle submission and control flow for ending experiment / saving to database / exporting files locally
  const handleEndExperiment = async () => {
    setSubmissionStatus("saving");

    try {
      let blob = recordedBlob;
      
      // 1. Skip video handling completely if the recording was interrupted
      if (wasRecordingInterrupted) {
        console.warn("⚠️ Recording was interrupted. Skipping video upload and download.");
        blob = null;
      } else if (isRecording) {
        // If still recording, stop it and get the blob
        console.log("Stopping recording...");
        blob = await stopRecording();
      }

      //if (blob && !(blob instanceof Blob)) {
      //  console.warn("⚠️ Blob is not valid. Skipping upload.");
      //  blob = null;
      //}

      let firebaseVideoURL = null;
  
      // 2. If video exists, download + upload to firebase storage
      if (blob) {
        try {
          // Upload screen recording to Firebase Storage, with 1 min time-limit
          console.log("Uploading video...");
          firebaseVideoURL = await uploadRecordedVideo(blob)

          // Save + download a local copy of the video 
          const blobUrl = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = blobUrl;
          link.download = "screen-recording.webm";
          link.click();
          URL.revokeObjectURL(blobUrl); //clean up memory
        } catch (uploadError) {
          console.warn("⚠️ Video upload failed. Proceeding without it.");
        }
      } else {
        console.warn("⚠️ No recordedBlob available. Skipping video upload.");
      }
      
      // 3. Export session data locally (as .json)
      exportSessionHistory();
      // 4. Save session data + video URL to Firestore (with or without video)
      await saveSessionToFirebase(firebaseVideoURL);
      // 5. Reset user so next participant gets a new Firebase UID
      await resetFirebaseUser();

      setSubmissionStatus("success");
    } catch (err) {
      console.error("❌ Submission failed:", err);
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

            {submissionStatus === "saving" && (
              <p className="text-gray-800 mt-4 font-semibold">
                Submission in progress, this might take a moment. Please do not close the browser.
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