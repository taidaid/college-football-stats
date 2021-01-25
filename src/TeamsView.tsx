import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import SearchForm from "./Components/SearchForm";
import SearchModal from "./Components/SearchModal";
import { Team } from "./interfaces";
import ncaaHeaderLogo from "./assets/ncaa-4-logo-png-transparent-150-150.png";
import { displayTeams } from "./utils";

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
  const linkStyles = {
    padding: "10px",
  };
  const links = linkOptions.map((link) => (
    <Link key={link} to={`/${link}`} style={linkStyles}>
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
        <Col
          xs={{ offset: 1, span: 2 }}
          style={{ maxHeight: "80px", marginTop: "-40px" }}
        >
          <img src={ncaaHeaderLogo} alt="ncaa logo"></img>
        </Col>
        <Col xs="6">
          <header
            className="text-center mt-2"
            style={{ fontFamily: "Old Sport Athletic" }}
          >
            <h1>College Football Stats</h1>
          </header>
        </Col>
        <Col>
          <SearchForm
            searchValue={searchValue}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            showSearchError={showSearchError}
          />
        </Col>
      </Row>
      <Row>
        <Col className="text-center">{links}</Col>
      </Row>
      <Row style={{ margin: "0 8.33%" }}>{displayTeams(id, teams)}</Row>
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
