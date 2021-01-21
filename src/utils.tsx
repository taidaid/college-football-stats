import React from "react";
import { Col, Row } from "react-bootstrap";
import { Game } from "./interfaces";

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

export const displayGamesStats = (games: Game[]) => {
  return games.map((game) => (
    <React.Fragment key={`${game.id}`}>
      <Row>{formatGameStats(game)}</Row>
      <hr />
    </React.Fragment>
  ));
};
