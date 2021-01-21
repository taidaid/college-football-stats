export interface Team {
  abbreviation: string;
  alt_color: string;
  color: string;
  conference: string;
  division: string;
  logos: string[];
  mascot: string;
  school: string;
}

export interface Game {
  attendance: number;
  away_conference: string;
  away_line_scores: number[];
  away_points: number;
  away_team: string;
  conference_game: boolean;
  home_conference: string;
  home_line_scores: number[];
  home_points: number;
  home_team: string;
  id: number;
  neutral_site: boolean;
  season: number;
  season_type: string;
  start_date: string;
  venue: string;
  venue_id: number;
  week: number;
}
