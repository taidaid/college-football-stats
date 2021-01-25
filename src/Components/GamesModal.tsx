import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { getTeamGameStats } from "../api";
import { DetailedStats, Game } from "../interfaces";
import { displayGamesStats } from "../utils/utils";
import DetailedStatsModal from "./DetailedStatsModal";

interface Props {
  games: Game[];
  year: string;
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const GamesModal = ({ games, year, showModal, setShowModal }: Props) => {
  const [showDetailedStats, setShowDetailedStats] = useState<boolean>(false);
  const [teamGameStats, setTeamGameStats] = useState<DetailedStats>();

  const handleCloseGamesModal = () => setShowModal(false);
  const handleCloseDetailedStatsModal = () => setShowDetailedStats(false);

  const handleShowDetailedStats = (gameId: number) => {
    setShowDetailedStats(true);
    getTeamGameStats(gameId).then((teamGameStats) => {
      setTeamGameStats(teamGameStats[0]);
    });
  };
  return (
    <>
      <Modal show={showModal} onHide={handleCloseGamesModal} scrollable>
        <Modal.Header closeButton>
          <Modal.Title>{year} Season</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {displayGamesStats(games, year, handleShowDetailedStats)}
        </Modal.Body>
      </Modal>

      {teamGameStats && (
        <DetailedStatsModal
          showModal={showDetailedStats}
          detailedStats={teamGameStats}
          handleClose={handleCloseDetailedStatsModal}
        />
      )}
    </>
  );
};

export default GamesModal;
