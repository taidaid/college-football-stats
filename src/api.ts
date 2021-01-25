import { DetailedStats, Game, Team } from "./interfaces";

const httpRequest = (url: string, options?: any) =>
  fetch(url, options)
    .then((response) => response.json())
    .catch((error) => console.error(error));

const getTeams = (): Promise<Team[]> =>
  httpRequest(`https://api.collegefootballdata.com/teams`);

const getGames = (year: string, team: string): Promise<Game[]> =>
  httpRequest(
    `https://api.collegefootballdata.com/games?year=${year}&team=${encodeURIComponent(
      team
    )}`
  );
const getTeamGameStats = (gameId: number): Promise<DetailedStats[]> =>
  httpRequest(
    `https://api.collegefootballdata.com/games/teams?gameId=${gameId}`
  );

export { getTeams, getGames, getTeamGameStats };
