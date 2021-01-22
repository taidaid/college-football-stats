import React from "react";
import { Col, Row } from "react-bootstrap";
import TeamCard from "./Components/TeamCard";
import { Game, Team } from "./interfaces";

export const displaySearchedTeams = (filter: string, teams: Team[]) => {
  const regex = new RegExp(filter, "gi");
  const teamsToDisplay = teams.filter((team) => team.school.match(regex));
  return teamsToDisplay.map((team, i) => (
    <Col xs="12" key={`${team.school}-${i}`}>
      <TeamCard team={team} />
    </Col>
  ));
};

export const displayTeams = (filter: string | undefined, teams: Team[]) => {
  if (!filter) filter = "a";

  const teamsToDisplay = teams.filter(
    (team) => team.school[0].toUpperCase() === filter!.toUpperCase()
  );

  return teamsToDisplay.map((team, i) => (
    <Col xs="6" md="4" lg="2" key={`${team.school}-${i}`}>
      <TeamCard team={team} />
    </Col>
  ));
};

// I can't easily find out what away line and home line scores are, so I don't know how to display them
const statsToShow = [
  "attendance",
  "away_conference",
  //   "away_line_scores",
  "away_points",
  "away_team",
  "conference_game",
  "home_conference",
  //   "home_line_scores",
  "home_points",
  "home_team",
  "neutral_site",
  "season",
  "season_type",
  "start_date",
  "venue",
  "week",
];

export const doesKeyHaveDate = (key: string) => {
  return key.split(" ").some((w) => {
    return w === "Date";
  });
};
export const formatStatKey = (key: string) =>
  toTitleCase(key.replace(/_/g, " "));
const formatDate = (value: any) => {
  const event = new Date(value);
  value = event.toDateString();
  return value;
};
export const toTitleCase = (str: string) => {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
};

export const formatGameStats = (game: Game) => {
  return Object.entries(game).map(([key, value]) => {
    if (!statsToShow.includes(key)) return null;
    key = formatStatKey(key);
    if (doesKeyHaveDate(key)) {
      value = formatDate(value);
    }
    if (value === true) {
      value = "Yes";
    }

    return (
      <React.Fragment key={key}>
        <Col xs="6">{key}: </Col>
        <Col xs="6" className="text-right">
          {value || "N/A"}
        </Col>
      </React.Fragment>
    );
  });
};

export const displayGamesStats = (games: Game[], year: string) => {
  if (games.length) {
    return games.map((game) => (
      <React.Fragment key={`${game.id}`}>
        <Row>{formatGameStats(game)}</Row>
        <hr />
      </React.Fragment>
    ));
  } else if (parseInt(year) > 1875) {
    return "American football wasn't even invented yet!";
  } else {
    return "No games to display for this year";
  }
};
