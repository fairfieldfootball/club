import { BaseMongoCrudState } from '@makes-apps/lib';

import { Draft } from './draft';

export default class extends BaseMongoCrudState<Draft> {
  static NAMESPACE = 'draft';
}
