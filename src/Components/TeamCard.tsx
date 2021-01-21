import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  FormControl,
  InputGroup,
  Row,
} from "react-bootstrap";
import { getGames } from "../api";
import { Game, Team } from "../interfaces";
import GamesModal from "./GamesModal";

interface Props {
  team: Team;
}

const TeamCard = ({ team }: Props) => {
  const [games, setGames] = useState<Game[]>([]);
  const [fetched, setFetched] = useState<boolean>(false);
  const [year, setYear] = useState<number>(new Date().getFullYear() - 1);
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = (
    event:
      | React.FormEvent<HTMLInputElement>
      | React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    event.preventDefault();
    getGames(year, team.school).then((gamesData) => {
      if (gamesData.length) {
        setShowModal(true);
        setGames(gamesData);
      }
      setFetched(true);
    });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const newValue = parseInt(event.currentTarget.value);

    if (Number.isFinite(newValue)) {
      setYear(newValue);
    }
  };

  const gamesModalComponent = showModal ? (
    <GamesModal
      games={games}
      year={year}
      showModal={showModal}
      setShowModal={setShowModal}
    ></GamesModal>
  ) : (
    ""
  );

  useEffect(() => {
    if (!games.length && fetched && year) {
      window.alert(`There are no games for the year ${year}.`);
      console.log("ALERT");
      setFetched(false);
    }
  }, [games, fetched, year]);

  return (
    <Card>
      <Card.Body>
        <Card.Title>{team.school}</Card.Title>
        <InputGroup className="xs-3">
          <FormControl
            aria-label="Year"
            placeholder="Enter a Year"
            value={year}
            onChange={handleChange}
            onSubmit={handleSubmit}
          />
        </InputGroup>
        <Row>
          <Col xs={{ offset: 1, span: 10 }} className="text-center">
            <Button variant="primary" onClick={handleSubmit}>
              View Games
            </Button>
          </Col>
        </Row>
        {gamesModalComponent}
      </Card.Body>
    </Card>
  );
};

export default TeamCard;
