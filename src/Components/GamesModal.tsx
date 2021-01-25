import React from "react";
import { Modal } from "react-bootstrap";
import { Game } from "../interfaces";
import { displayGamesStats } from "../utils/utils";

interface Props {
  games: Game[];
  year: string;
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const GamesModal = ({ games, year, showModal, setShowModal }: Props) => {
  const handleClose = () => setShowModal(false);
  return (
    <>
      <Modal show={showModal} onHide={handleClose} scrollable>
        <Modal.Header closeButton>
          <Modal.Title>{year} Season</Modal.Title>
        </Modal.Header>
        <Modal.Body>{displayGamesStats(games, year)}</Modal.Body>
      </Modal>
    </>
  );
};

export default GamesModal;
