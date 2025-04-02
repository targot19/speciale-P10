/** SRC: https://www.dosystemsinc.com/blog/screen-recording-in-reactjs/ */

import React from "react";
import { Modal, ModalBody, ModalHeader, Button, Row } from "reactstrap";
import RecordRTC from "recordrtc";

const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

export default class ScreenRecordPreviewModal extends React.Component {
  downloadScreenRecordVideo = () => {
    const { recorder } = this.props;
    if (!recorder) return;

    if (isSafari && recorder.getDataURL) {
      recorder.getDataURL((dataURL) => {
        RecordRTC.SaveToDisk(dataURL, this.getFileName("mp4"));
      });
      return;
    }

    const blob = recorder;
    const file = new File([blob], this.getFileName("mp4"), { type: "video/mp4" });
    RecordRTC.invokeSaveAsDialog(file);
  };

  getFileName = (extension) => {
    const date = new Date();
    const randomString = Math.random().toString(36).substring(2, 15);
    return `ScreenRecord-${date.toISOString().split("T")[0]}-${randomString}.${extension}`;
  };

  render() {
    const { isOpenVideoModal, videoModalClose, recordedVideoUrl } = this.props;

    return (
      <Modal isOpen={isOpenVideoModal} toggle={videoModalClose}>
        <ModalHeader toggle={videoModalClose}>Preview Screen Record</ModalHeader>
        <ModalBody>
          <Row className="text-center">
            <Button color="primary" outline onClick={this.downloadScreenRecordVideo}>
              Download
            </Button>
          </Row>
          <video
            id="videorecord"
            controls
            autoPlay
            playsInline
            width="100%"
            height="100%"
            src={recordedVideoUrl}
          />
        </ModalBody>
      </Modal>
    );
  }
}