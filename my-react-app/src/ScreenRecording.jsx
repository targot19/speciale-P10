import React from "react";
import RecordRTC from "recordrtc";
import ScreenRecordPreviewModal from "./ScreenRecordPreviewModal";
import { Button, Row, Col, Container, Card, CardBody } from "reactstrap";
import Topbar from "./components/Topbar";

let recorder;

class ScreenRecording extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recordedVideoUrl: null,
      isOpenVideoModal: false,
      screen: null,
      camera: null,
      startDisable: false,
      stopDisable: true,
    };
  }

  captureCamera = (cb) => {
    navigator.mediaDevices
      .getUserMedia({ audio: true, video: false })
      .then(cb)
      .catch((error) => {
        console.error("Error capturing camera:", error);
        alert("Unable to access camera. Please check permissions.");
      });
  };

  startScreenRecord = async () => {
    this.setState({ stopDisable: false, startDisable: true });
    this.captureScreen((screen) => {
      this.captureCamera((camera) => {
        this.setState({ screen, camera });

        recorder = RecordRTC([screen, camera], { type: "video" });
        recorder.startRecording();
        recorder.screen = screen;
      });
    });
  };

  captureScreen = (callback) => {
    navigator.mediaDevices
      .getDisplayMedia({ video: true, audio: true })
      .then(callback)
      .catch((error) => {
        console.error("Error capturing screen:", error);
        alert("Unable to capture your screen. Please check console logs.");
        this.setState({ stopDisable: true, startDisable: false });
      });
  };

  stop = async () => {
    this.setState({ startDisable: true });
    recorder.stopRecording(() => {
      const recordedVideoUrl = URL.createObjectURL(recorder.getBlob());
      this.setState({
        recordedVideoUrl,
        isOpenVideoModal: true,
        startDisable: false,
        stopDisable: true,
      });

      // Stop the screen stream but do not destroy the recorder immediately
      if (recorder.screen) {
        recorder.screen.getTracks().forEach((track) => track.stop());
      }

      // Keep the recorder instance intact for preview purposes
      recorder = null;
    });
  };

  videoModalClose = () => {
    this.setState({ isOpenVideoModal: false });
  };

  render() {
    return (
      <div>
        <Topbar sr={true} />
        <Container className="pt-3">
          <Card className="shadow">
            <CardBody>
              <Row>
                <Col sm={12}>
                  <h3 className="text-dark pb-2 text-center">Screen Recording</h3>
                  <p>* Click "Start Recording" to begin.</p>
                  <p>* Select the screen to share and confirm.</p>
                  <p>* Click "Stop Recording" to end.</p>
                </Col>
              </Row>
              <Row>
                <Col sm={12} className="text-center">
                  <Button
                    color="primary"
                    outline
                    onClick={this.startScreenRecord}
                    disabled={this.state.startDisable}
                  >
                    Start Recording
                  </Button>
                  <Button
                    color="primary"
                    onClick={this.stop}
                    disabled={this.state.stopDisable}
                  >
                    Stop Recording
                  </Button>
                  {this.state.startDisable && (
                    <h3 className="text-success pt-2">Recording...</h3>
                  )}
                </Col>
              </Row>
            </CardBody>
          </Card>
          <ScreenRecordPreviewModal
            isOpenVideoModal={this.state.isOpenVideoModal}
            videoModalClose={this.videoModalClose}
            recordedVideoUrl={this.state.recordedVideoUrl}
          />
        </Container>
      </div>
    );
  }
}

export default ScreenRecording;