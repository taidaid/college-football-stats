import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";

// import "bootstrap/dist/css/bootstrap.min.css";
import "bootswatch/dist/darkly/bootstrap.min.css";

import Login from "./Login/Login";
import { getTeams } from "./api";
import { Team } from "./interfaces";
import TeamsView from "./TeamsView/TeamsView";
import { Route, Switch } from "react-router-dom";

const App = () => {
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const [teams, setTeams] = useState<Team[]>([]);

  // initialize teams with fallback to empty array in case API goes down and returns undefined again
  useEffect(() => {
    getTeams().then((teamsData) => setTeams(teamsData || []));
  }, []);

  return (
    <Container fluid className="min-vh-100">
      {isSignedIn ? (
        <Switch>
          <Route path="/:id?">
            <TeamsView teams={teams} />
          </Route>
        </Switch>
      ) : (
        <Login setIsSignedIn={setIsSignedIn} />
      )}
    </Container>
  );
};

export default App;
