import React from "react";
import { Col, Row } from "react-bootstrap";
import TeamCard from "./Components/TeamCard";
import { Game, Team } from "./interfaces";

export const displaySearchedTeams = (filter: string, teams: Team[]) => {
  const regex = new RegExp(filter, "gi");
  const teamsToDisplay = teams.filter((team) => team.school.match(regex));
  return teamsToDisplay.length ? (
    teamsToDisplay.map((team, i) => (
      <Col xs="12" key={`${team.school}-${i}`}>
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
      <Col xs="6" md="4" lg="2" key={`${team.school}-${i}`}>
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
  "season",
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

export const toTitleCase = (str: string) => {
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
        <Col xs="6">{key}: </Col>
        <Col xs="6" className="text-right">
          {value ?? "N/A"}
        </Col>
      </React.Fragment>
    );
  });
};

/** displays the stats for a given array of games */
export const displayGamesStats = (games: Game[], year: string) => {
  if (games.length) {
    return games.map((game) => (
      <React.Fragment key={`${game.id}`}>
        <Row>{formatGameStats(game)}</Row>
        <hr />
      </React.Fragment>
    ));
  } else if (parseInt(year) < 1875) {
    return "American football wasn't even invented yet!";
  } else {
    return "No games to display for this year";
  }
};

/** verifies that a given string is a number */
export const isNumberString = (input: string) => {
  const value = parseInt(input);
  return typeof value === "number" && isFinite(value);
};
