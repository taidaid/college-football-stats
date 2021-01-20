import React from "react";
import { Row, Col } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import TeamCard from "./Components/TeamCard";
import { Team } from "./interfaces";

interface Props {
  teams: Team[];
}

const TeamsView = ({ teams }: Props) => {
  const { id } = useParams<{ id: string }>();

  const displayTeams = () => {
    let filter = id;
    if (!filter) filter = "a";

    const teamsToDisplay = teams.filter(
      (team) => team.school[0].toUpperCase() === filter.toUpperCase()
    );

    return teamsToDisplay.map((team, i) => (
      <Col xs="6" md="4" lg="2" key={`${team.school}-${i}`}>
        <TeamCard team={team} />
      </Col>
    ));
  };

  const linkOptions = [...new Set(teams.map((team) => team.school[0]))].sort();
  const linkStyles = {
    padding: "10px",
  };
  const links = linkOptions.map((link) => (
    <Link key={link} to={`/${link}`} style={linkStyles}>
      {link}
    </Link>
  ));

  return (
    <>
      <Row className="justify-content-xs-center">
        <Col xs={{ offset: "3", span: "6" }}>
          <header className="text-center">
            <h1>College Football Stats</h1>
          </header>
        </Col>
      </Row>
      <Row className="justify-content-xs-center">
        <Col xs={{ offset: "3", span: "6" }} className="text-center">
          {links}
        </Col>
      </Row>
      <Row>{displayTeams()}</Row>
    </>
  );
};

export default TeamsView;
