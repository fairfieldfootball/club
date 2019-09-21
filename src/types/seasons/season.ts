import { BaseDocument } from '@makes-apps/lib';
import { BSON } from 'mongodb-stitch-browser-sdk';

export interface Season extends BaseDocument {
  year: number;
  start_date: Date;
  end_date: Date;
  recent_week: number;
  commissioner: BSON.ObjectId;
  draft_date: Date;
  managers: SeasonManager[];
  settings: SeasonSettings;
  scoring: SeasonStatCategory[];
  rosters: SeasonRosterPosition[];
  divisions: SeasonDivision[];
  schedule?: SeasonMatchup[];
  playoffs?: SeasonPlayoffsMatchup[];
  standings_id?: BSON.ObjectId;
  yahoo_data: SeasonYahooData;
}

export interface SeasonDivision {
  index: number;
  name: string;
  manager_indexes: number[];
}

export interface SeasonManager {
  manager_id: BSON.ObjectId;
  index: number;
  team_name: string;
}

export interface SeasonSettings {
  scoring: SeasonScoringSettings;
  draft: SeasonDraftSettings;
  waivers: SeasonWaiverSettings;
  trade: SeasonTradeSettings;
  players: SeasonPlayersSettings;
  playoffs: SeasonPlayoffsSettings;
}

export interface SeasonScoringSettings {
  type: string;
  fraction_points: boolean;
  negative_points: boolean;
}

export interface SeasonDraftSettings {
  type: string;
  auction: boolean;
  pick_time: number;
}

export interface SeasonWaiverSettings {
  type: string;
  rule: string;
  time: number;
  faab: boolean;
}

export interface SeasonTradeSettings {
  deadline: Date;
  ratify_type: string;
  reject_time: number;
  draft_picks: boolean;
}

export interface SeasonPlayersSettings {
  pool: string;
  cant_cut_list: string;
  post_draft: string;
}

export interface SeasonPlayoffsSettings {
  start_week: number;
  size: number;
  consolation_size: number;
  reseed: boolean;
  lock_eliminated_teams: boolean;
}

export interface SeasonStatCategory {
  id: number;
  sort: number;
  enabled: boolean;
  value: number;
  type: string;
  name: string;
  display: string;
}

export interface SeasonRosterPosition {
  position: string;
  type?: string;
  count: number;
}

export interface SeasonMatchup {
  matchup_id?: BSON.ObjectId;
  week: number;
  index: number;
  away_team_index: number;
  away_team_score: number;
  home_team_index: number;
  home_team_score: number;
}

export interface SeasonPlayoffsMatchup extends SeasonMatchup {
  label: string;
  consolation?: boolean;
  away_team_seed: number;
  home_team_seed: number;
}

export interface SeasonYahooData {
  key: string;
  id: string;
  url: string;
}
