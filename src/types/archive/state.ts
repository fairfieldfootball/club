import { BaseMongoCrudState } from '@makes-apps/lib';

import { Franchise } from './franchise';

export default class extends BaseMongoCrudState<Franchise> {
  static NAMESPACE = 'franchises';
}
