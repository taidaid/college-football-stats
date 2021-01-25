import React, { useState } from "react";
import { Button, Card, Col, Form } from "react-bootstrap";
import { getGames } from "../../api";
import { Game, Team } from "../../interfaces";
import { isNumberString } from "../../utils/utils";
import GamesModal from "../GamesModal";
import TeamLogo from "../TeamLogo/TeamLogo";
import "./TeamCard.css";

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
    const yearIsNumberString = isNumberString(year);
    if (!yearIsNumberString) {
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

  const inputError = showInputError ? (
    <Form.Row className="text-center text-danger">
      <Col>Please enter a valid year</Col>
    </Form.Row>
  ) : (
    ""
  );

  return (
    <Card className="my-3 team-card">
      <Card.Header>
        <TeamLogo logos={team.logos} dark />
        <Card.Title className="text-center team-card__title">
          {team.school}
        </Card.Title>
      </Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Row className="align-items-center my-2">
              <Col>
                <Form.Label srOnly>Search by Year</Form.Label>
                <Form.Control
                  aria-label="Year"
                  placeholder="Enter a Year"
                  value={year}
                  onChange={handleChange}
                />
              </Col>
            </Form.Row>
            {inputError}
            <Form.Row className="justify-content-md-center">
              <Col className="text-center mt-3">
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
