import React from "react";
import { Modal } from "react-bootstrap";
import { DetailedStats } from "../interfaces";
import { displayDetailedStats } from "../utils/utils";

interface Props {
  showModal: boolean;
  detailedStats: DetailedStats;
  handleClose: () => void;
}

const DetailedStatsModal = ({
  showModal,
  detailedStats,
  handleClose,
}: Props) => {
  return (
    <Modal show={showModal} onHide={handleClose} scrollable>
      <Modal.Header closeButton>
        <Modal.Title>Detailed Game Stats</Modal.Title>
      </Modal.Header>
      <Modal.Body>{displayDetailedStats(detailedStats)}</Modal.Body>
    </Modal>
  );
};

export default DetailedStatsModal;
