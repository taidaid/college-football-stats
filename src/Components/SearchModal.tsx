import React from "react";
import { Modal, Row } from "react-bootstrap";
import { Team } from "../interfaces";
import { displaySearchedTeams } from "../utils";

interface Props {
  showSearchModal: boolean;
  searchValue: string;
  setShowSearchModal: React.Dispatch<React.SetStateAction<boolean>>;
  teams: Team[];
}

const SearchModal = ({
  showSearchModal,
  searchValue,
  setShowSearchModal,
  teams,
}: Props) => {
  const handleClose = () => setShowSearchModal(false);

  // avoids searching teams if they won't be diplayed anyway
  const searchedTeams = showSearchModal
    ? displaySearchedTeams(searchValue, teams)
    : "";

  return (
    <>
      <Modal show={showSearchModal} onHide={handleClose} scrollable>
        <Modal.Header closeButton>
          <Modal.Title>Search All Schools</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>{searchedTeams}</Row>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default SearchModal;
