import React from "react";
import { Col, Row, Button } from "react-bootstrap";
import { Game } from "../interfaces";

// GamesModal dependency
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

// GamesModal dependency
/** checks for the word "Date" in a key name and reformats Date to more human-readable style */
export const doesKeyHaveDate = (key: string) => {
  return key.split(" ").some((w) => {
    return w === "Date";
  });
};

// GamesModal dependency
/** reformats object keys from lowercase/underscores to title case */
export const formatStatKey = (key: string) =>
  toTitleCase(key.replace(/_/g, " "));
const formatDate = (value: any) => {
  const event = new Date(value);
  value = event.toDateString();
  return value;
};

// GamesModal dependency
const toTitleCase = (str: string) => {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
};

// GamesModal dependency
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

// GamesModal
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
