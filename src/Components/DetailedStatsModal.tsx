import React from "react";
import { Modal } from "react-bootstrap";
import { DetailedStats } from "../interfaces";
import { displayDetailedStats } from "../utils/DetailedStatsModalUtils";

interface Props {
  showModal: boolean;
  detailedStats: DetailedStats | undefined;
  handleClose: () => void;
}

const DetailedStatsModal = ({
  showModal,
  detailedStats,
  handleClose,
}: Props) => {
  if (detailedStats) {
    return (
      <Modal show={showModal} onHide={handleClose} scrollable>
        <Modal.Header closeButton>
          <Modal.Title>Detailed Game Stats</Modal.Title>
        </Modal.Header>
        <Modal.Body>{displayDetailedStats(detailedStats)}</Modal.Body>
      </Modal>
    );
  } else {
    return (
      <Modal show={showModal} onHide={handleClose} scrollable>
        <Modal.Header closeButton>
          <Modal.Title>Detailed Game Stats</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="text-danger">
            No Detailed Stats Available For This Game
          </p>
        </Modal.Body>
      </Modal>
    );
  }
};

export default DetailedStatsModal;
