import { BaseDocument } from '@makes-apps/lib';
import { BSON } from 'mongodb-stitch-browser-sdk';

export interface Draft extends BaseDocument {
  season_id: BSON.ObjectId;
  picks: DraftPick[];
}

interface DraftPick {
  index: number;
  round: number;
  player_key: string;
  team_key: string;
  cost: number;
}
