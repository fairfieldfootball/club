import { BaseMongoCrudState } from '@makes-apps/lib';

import { Season } from './season';

export default class extends BaseMongoCrudState<Season> {
  static NAMESPACE = 'seasons';
}
