import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import TeamCard from "../Components/TeamCard/TeamCard";
import {
  DetailedStats,
  DetailedStatsTeamStat,
  Game,
  Team,
} from "../interfaces";
import "./utils.css";

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
  // "season",
  "season_type",
  "start_date",
  "venue",
  "week",
];

/** checks for the word "Date" in a key name and reformats Date to more human-readable style */
export const doesKeyHaveDate = (key: string) => {
  return key.split(" ").some((w) => {
    return w === "Date";
  });
};

/** reformats object keys from lowercase/underscores to title case */
export const formatStatKey = (key: string) =>
  toTitleCase(key.replace(/_/g, " "));
const formatDate = (value: any) => {
  const event = new Date(value);
  value = event.toDateString();
  return value;
};

const toTitleCase = (str: string) => {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
};

/** handles formatting keys and inserting appropriate string when value is boolean, undefined, or null */
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
    if (value === false) {
      value = "No";
    }

    return (
      <React.Fragment key={key}>
        <Col xs="6" className="game-stats__cell">
          <strong>{key}:</strong>{" "}
        </Col>
        <Col xs="6" className="text-right game-stats__cell">
          {value ?? "N/A"}
        </Col>
      </React.Fragment>
    );
  });
};

/** displays the stats for a given array of games */
export const displayGamesStats = (
  games: Game[],
  year: string,
  handleShowDetailedStats: (id: number) => void
) => {
  if (games.length) {
    return games.map((game) => (
      <React.Fragment key={`${game.id}`}>
        <Row>{formatGameStats(game)}</Row>
        <Row className="mt-3">
          <Col>
            <Button onClick={() => handleShowDetailedStats(game.id)}>
              View Detailed Game Stats
            </Button>
          </Col>
        </Row>
        <hr />
      </React.Fragment>
    ));
  } else if (parseInt(year) < 1875) {
    return "American football wasn't even invented yet!";
  } else {
    return "No games to display for this year";
  }
};

const splitCamelCase = (s: string) => {
  return s
    .replace(/([A-Z][a-z]|[A-Z]+(?=[A-Z]|$))/g, " $1")
    .replace(/./, (m: string) => m.toUpperCase())
    .replace("T D", "TD")
    .trim();
};

/** handles formatting detailed game stats */
export const formatDetailedStats = (
  detailedStatsTeamStat: DetailedStatsTeamStat[]
) => {
  return detailedStatsTeamStat.map((statObj) => {
    return (
      <React.Fragment key={statObj.category}>
        <Col xs="6" className="game-stats__cell">
          <strong>{splitCamelCase(statObj.category)}:</strong>{" "}
        </Col>
        <Col xs="6" className="text-right game-stats__cell">
          {statObj.stat ?? "N/A"}
        </Col>
      </React.Fragment>
    );
  });
};

export const displayDetailedStats = (detailedStats: DetailedStats) => {
  return (
    <React.Fragment>
      <Row className="mt-3">
        <Col>
          <strong>School: </strong> {detailedStats.teams[0].school}
        </Col>
        <Col>
          <strong>Conference: </strong> {detailedStats.teams[0].conference}
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <strong>Points: </strong>
          {detailedStats.teams[0].points}
        </Col>
        <Col>
          <strong>Home/Away: </strong>
          {detailedStats.teams[0].homeAway[0].toUpperCase() +
            detailedStats.teams[0].homeAway.substring(
              1,
              detailedStats.teams[0].homeAway.length
            )}
        </Col>
      </Row>
      <Row>{formatDetailedStats(detailedStats.teams[0].stats)}</Row>
      <hr />
      <Row className="mt-3">
        <Col>
          <strong>School: </strong> {detailedStats.teams[1].school}
        </Col>
        <Col>
          <strong>Conference: </strong> {detailedStats.teams[1].conference}
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <strong>Points: </strong>
          {detailedStats.teams[1].points}
        </Col>
        <Col>
          <strong>Home/Away: </strong>
          {detailedStats.teams[1].homeAway[0].toUpperCase() +
            detailedStats.teams[1].homeAway.substring(
              1,
              detailedStats.teams[1].homeAway.length
            )}
        </Col>
      </Row>
      <Row>{formatDetailedStats(detailedStats.teams[1].stats)}</Row>
    </React.Fragment>
  );
};

/** verifies that a given string is a number */
export const isNumberString = (input: string) => {
  const value = parseInt(input);
  return typeof value === "number" && isFinite(value);
};
