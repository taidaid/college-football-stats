import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import Login from "./Login/Login";
import { getConferences } from "./api";
import "./App.css";
import ConferenceCard from "./Components/ConferenceCard";
import { Conference } from "./interfaces";

const App = () => {
  const [conferences, setConferences] = useState<Conference[]>([]);
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);

  useEffect(() => {
    getConferences().then((conferencesData) => setConferences(conferencesData));
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
            conferences.map((conf, i) => (
              <Col xs="6" md="4" lg="2" key={`${conf.abbreviation}-${i}`}>
                <ConferenceCard conference={conf} />
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
