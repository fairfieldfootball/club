import { BaseDocument } from '@makes-apps/lib';

import { Manager } from '../managers';

interface PointInTime {
  year: number;
  week: number;
}

export interface Franchise extends BaseDocument {
  seasons: number[];
  winnings: number;
  championships: number;
  wins: number;
  losses: number;
  ties: number;
  pct: number;
  current_name: string;
  current_manager: Manager;
  names: {
    name: string;
    start: PointInTime;
    end: PointInTime;
  };
  managers: {
    manager: Manager;
    start: PointInTime;
    end: PointInTime;
  }[];
}
