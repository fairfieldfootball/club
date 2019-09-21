export interface LeagueScoreboard {
  week: number;
  matchups: { [key: string]: LeagueScoreboardMatchup }
}

interface LeagueScoreboardMatchup {
  is_playoffs: boolean;
  is_consolation: boolean;
  away_team: LeagueScoreboardMatchupTeam;
  home_team: LeagueScoreboardMatchupTeam;
}

interface LeagueScoreboardMatchupTeam {
  team_key: string;
  team_id: string;
  name: string;
  win_probability: number;
  projected_total: number;
  total: number;
}
