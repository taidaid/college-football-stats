import React from "react";
import { Col, Row } from "react-bootstrap";
import { DetailedStatsTeamStat, DetailedStats } from "../interfaces";

// DetailedStatsModal dependecy
const splitCamelCase = (s: string) => {
  return s
    .replace(/([A-Z][a-z]|[A-Z]+(?=[A-Z]|$))/g, " $1")
    .replace(/./, (m: string) => m.toUpperCase())
    .replace("T D", "TD")
    .trim();
};

// DetailedStatsModal dependecy
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

// DetailedStatsModal
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
