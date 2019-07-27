import { BaseDocument } from '@makes-apps/lib';

export type PlayerPositionType = 'QB' | 'RB' | 'WR' | 'TE' | 'D/ST' | 'K';

export interface Player extends BaseDocument {
  name: string;
}
