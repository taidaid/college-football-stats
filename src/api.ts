import { Conference, Team } from "./interfaces";

const httpRequest = (url: string, options?: any) =>
  fetch(url, options)
    .then((response) => response.json())
    .catch((error) => console.error(error));

const getConferences = (): Promise<Conference[]> =>
  httpRequest("https://api.collegefootballdata.com/conferences");

const getTeams = (conferenceAbbreviation: string): Promise<Team[]> =>
  httpRequest(
    `https://api.collegefootballdata.com/teams?conference=${conferenceAbbreviation}`
  );

export { getConferences, getTeams };
