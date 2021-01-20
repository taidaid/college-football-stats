import React from "react";
import { Button, Card } from "react-bootstrap";
import { Team } from "../interfaces";

interface Props {
  team: Team;
}

const TeamCard = ({ team }: Props) => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>{team.school}</Card.Title>
        <Button variant="primary">View Games</Button>
      </Card.Body>
    </Card>
  );
};

export default TeamCard;
