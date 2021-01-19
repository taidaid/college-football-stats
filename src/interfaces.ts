export interface Conference {
  abbreviation: string;
  id: number;
  name: string;
  short_name: string;
}

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
