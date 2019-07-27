import { BaseMongoCrudState } from '@makes-apps/lib';

import { Standings } from './standings';

export default class extends BaseMongoCrudState<Standings> {
  static NAMESPACE = 'standings';
}
