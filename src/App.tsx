import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import { getConferences } from "./api";
import "./App.css";
import ConferenceCard from "./Components/ConferenceCard";
import { Conference } from "./interfaces";

const App = () => {
  const [conferences, setConferences] = useState<Conference[]>([]);

  useEffect(() => {
    getConferences().then((conferencesData) => setConferences(conferencesData));
  }, []);

  return (
    <div className="App">
      <header className="App-header">College Football Stats</header>
      <Container fluid>
        <Row>
          {conferences.map((conf) => (
            <Col xs="6" md="4" lg="2">
              <ConferenceCard conference={conf} />
            </Col>
          ))}
          <Col></Col>
        </Row>
      </Container>
    </div>
  );
};

export default App;
