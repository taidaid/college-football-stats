import React, { useState } from "react";
import { Row, Col, Nav } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import "./TeamsView.css";

import SearchForm from "../Components/SearchForm";
import SearchModal from "../Components/SearchModal";
import { Team } from "../interfaces";
import ncaaHeaderLogo from "../assets/ncaa-4-logo-png-transparent-150-75-rect.png";
import { displayTeams } from "../utils/utils";

interface Props {
  teams: Team[];
}

const TeamsView = ({ teams }: Props) => {
  const { id } = useParams<{ id: string }>();
  const [showSearchModal, setShowSearchModal] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const [showSearchError, setShowSearchError] = useState<boolean>(false);

  // removes duplicates from array and sorts
  const linkOptions = [...new Set(teams.map((team) => team.school[0]))].sort();

  const links = linkOptions.map((link) => (
    <Link key={link} to={`/${link}`} className="nav__link">
      {link}
    </Link>
  ));

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const newSearchValue = event.currentTarget.value;
    setSearchValue(newSearchValue);
    setShowSearchError(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (searchValue === "") {
      setShowSearchError(true);
      return;
    }
    setShowSearchModal(true);
  };

  return (
    <>
      <Row>
        <Col xs={{ span: 3 }} md={{ offset: 1, span: 1 }}>
          <img src={ncaaHeaderLogo} className="w-100" alt="ncaa logo"></img>
        </Col>
        <Col xs={{ span: 6 }} md={{ offset: 1, span: 6 }}>
          <header className="text-center mt-2">
            <h2 className="app-title">College Football Stats</h2>
          </header>
        </Col>
        <Col className="text-center ">
          <SearchForm
            searchValue={searchValue}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            showSearchError={showSearchError}
          />
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Nav>{links}</Nav>
      </Row>
      <Row className="teams-view__teams-row">{displayTeams(id, teams)}</Row>
      <SearchModal
        showSearchModal={showSearchModal}
        searchValue={searchValue}
        setShowSearchModal={setShowSearchModal}
        teams={teams}
      />
    </>
  );
};

export default TeamsView;
