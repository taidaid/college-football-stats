import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import Login from "./Login/Login";
import { getTeams } from "./api";
import "./App.css";
import TeamCard from "./Components/TeamCard";
import { Team } from "./interfaces";

const App = () => {
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const [teams, setTeams] = useState<Team[]>([]);

  useEffect(() => {
    getTeams().then((teamsData) => setTeams(teamsData));
  }, []);

  return (
    <div className="App">
      <Container fluid>
        <Row className="justify-content-md-center">
          <Col xs="6">
            <header className="text-center">College Football Stats</header>
          </Col>
        </Row>
        <Row>
          {isSignedIn ? (
            teams.map((team, i) => (
              <Col xs="6" md="4" lg="2" key={`${team.school}-${i}`}>
                <TeamCard team={team} />
              </Col>
            ))
          ) : (
            <Login setIsSignedIn={setIsSignedIn} />
          )}
        </Row>
      </Container>
    </div>
  );
};

export default App;
