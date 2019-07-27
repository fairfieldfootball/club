import { BaseMongoCrudState } from '@makes-apps/lib';

import { Manager } from './manager';

export default class extends BaseMongoCrudState<Manager> {
  static NAMESPACE = 'managers';
}
