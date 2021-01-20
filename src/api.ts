import { Team } from "./interfaces";

const httpRequest = (url: string, options?: any) =>
  fetch(url, options)
    .then((response) => response.json())
    .catch((error) => console.error(error));

const getTeams = (): Promise<Team[]> =>
  httpRequest(`https://api.collegefootballdata.com/teams`);

export { getTeams };
