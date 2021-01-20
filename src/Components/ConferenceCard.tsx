import React from "react";
import { Button, Card } from "react-bootstrap";
import { Conference } from "../interfaces";

interface Props {
  conference: Conference;
}

const ConferenceCard = ({ conference }: Props) => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>{conference.short_name}</Card.Title>
        <Button variant="primary">View Teams</Button>
      </Card.Body>
    </Card>
  );
};

export default ConferenceCard;
