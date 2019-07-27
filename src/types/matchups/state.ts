import { BaseMongoCrudState } from '@makes-apps/lib';

import { Matchup } from './matchup';

export default class extends BaseMongoCrudState<Matchup> {
  static NAMESPACE = 'matchups';
}
