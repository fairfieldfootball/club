import { BaseDocument } from '@makes-apps/lib';
import { BSON } from 'mongodb-stitch-browser-sdk';

import { PlayerPositionType } from '../players';

export interface Matchup extends BaseDocument {
  season_id: BSON.ObjectId;
  week: number;
  index: number;
  start_date: Date;
  end_date: Date;
  playoffs: boolean;
  consolation: boolean;
  away_team: MatchupTeam;
  home_team: MatchupTeam;
  home_team_wins: boolean;
  tied: boolean;
  recap?: MatchupRecap;
}

interface MatchupTeam {
  manager_id: BSON.ObjectId;
  team_key: string;
  name: string;
  wins: number;
  losses: number;
  ties: number;
  initial_win_probability: number;
  initial_projected_score: number;
  final_score: number;
  active_players: MatchupPlayer[];
  bench_players: MatchupPlayer[];
}

interface MatchupPlayer {
  player_id: BSON.ObjectId;
  player_key: string;
  player_name: string;
  position?: PlayerPositionType;
  positions: PlayerPositionType[];
  current_team?: string;
  opposing_team?: string;
  game_start?: Date;
  initial_projected_score: number;
  final_score: number;
  stats: MatchupPlayerStat[];
}

interface MatchupPlayerStat {
  id: number;
  value: number;
}

interface MatchupRecap {
  url?: string;
  title?: string;
}
