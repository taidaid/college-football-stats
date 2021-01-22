import React, { useState } from "react";
import { Button, Card, Col, Form } from "react-bootstrap";
import { getGames } from "../api";
import { Game, Team } from "../interfaces";
import GamesModal from "./GamesModal";

interface Props {
  team: Team;
}

const TeamCard = ({ team }: Props) => {
  const [games, setGames] = useState<Game[]>([]);
  const [year, setYear] = useState<string>(
    (new Date().getFullYear() - 1).toString()
  );
  const [showModal, setShowModal] = useState(false);
  const [showInputError, setShowInputError] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const yearIsFiniteNumber = Number.isFinite(parseInt(year));
    if (!yearIsFiniteNumber) {
      setShowInputError(true);
      return;
    }

    getGames(year, team.school).then((gamesData) => {
      setShowModal(true);
      setGames(gamesData);
    });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const { value } = event.currentTarget;
    const valueAsNumber = parseInt(value);

    if (Number.isFinite(valueAsNumber) || value === "") {
      setYear(value);
      setShowInputError(false);
    } else {
      setShowInputError(true);
    }
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>{team.school}</Card.Title>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Row className="align-items-center">
              <Col>
                <Form.Label srOnly>Search</Form.Label>
                <Form.Control
                  aria-label="Year"
                  placeholder="Enter a Year"
                  value={year}
                  onChange={handleChange}
                />
              </Col>
            </Form.Row>
            {showInputError && (
              <Form.Row className="text-center text-danger">
                <Col>Please enter a valid year</Col>
              </Form.Row>
            )}
            <Form.Row>
              <Col xs={{ offset: 1, span: 10 }} className="text-center mt-2">
                <Button variant="primary" type="submit" onSubmit={handleSubmit}>
                  View Games
                </Button>
              </Col>
            </Form.Row>
          </Form.Group>
        </Form>
        <GamesModal
          games={games}
          year={year}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      </Card.Body>
    </Card>
  );
};

export default TeamCard;
