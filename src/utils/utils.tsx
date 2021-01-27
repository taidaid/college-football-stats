import React from "react";
import { Col } from "react-bootstrap";
import TeamCard from "../Components/TeamCard/TeamCard";
import { Team } from "../interfaces";
import "./utils.css";

// SearchModal
export const displaySearchedTeams = (filter: string, teams: Team[]) => {
  const regex = new RegExp(filter.trim(), "gi");
  const teamsToDisplay = teams.filter((team) => team.school.match(regex));
  return teamsToDisplay.length ? (
    teamsToDisplay.map((team, i) => (
      <Col xs="6" key={`${team.school}-${i}`}>
        <TeamCard team={team} />
      </Col>
    ))
  ) : (
    <Col className="text-center mt-3">
      <h2>No teams found!</h2>
    </Col>
  );
};

// TeamsView
export const displayTeams = (filter: string | undefined, teams: Team[]) => {
  if (!filter) filter = "a";

  const teamsToDisplay = teams.filter(
    (team) => team.school[0].toUpperCase() === filter!.toUpperCase()
  );

  return teamsToDisplay.length ? (
    teamsToDisplay.map((team, i) => (
      <Col xs="12" md="4" lg="2" key={`${team.school}-${i}`}>
        <TeamCard team={team} />
      </Col>
    ))
  ) : (
    <Col className="text-center mt-3">
      <h2>No teams found!</h2>
    </Col>
  );
};

// TeamCard and Login
/** verifies that a given string is a number */
export const isNumberString = (input: string) => {
  const value = parseInt(input);
  return typeof value === "number" && isFinite(value);
};
