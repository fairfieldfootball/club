import { BaseDocument } from '@makes-apps/lib';
import { BSON } from 'mongodb-stitch-browser-sdk';

export interface Standings extends BaseDocument {
  season_id: BSON.ObjectId;
  week: number;
  teams: StandingsTeam[];
}

interface StandingsTeam {
  name: string;
  team_key: string;
  manager_id: BSON.ObjectId;
  season_manager_index: number;
  rank: number;
  record: StandingsTeamRecord;
  playoffs_record: StandingsTeamRecord;
  streak: StandingsTeamStreak;
  waiver: StandingsTeamWaiver;
  moves: number;
}

interface StandingsTeamRecord {
  wins: number;
  losses: number;
  ties: number;
  pct: number;
  points_for: number;
  points_against: number;
}

interface StandingsTeamStreak {
  type: string;
  value: number;
}

interface StandingsTeamWaiver {
  position: number;
  budget: number;
}
