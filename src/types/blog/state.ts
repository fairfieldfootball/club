import { BaseMongoCrudState } from '@makes-apps/lib';

import { Blog } from './blog';

export default class extends BaseMongoCrudState<Blog> {
  static NAMESPACE = 'blogs';
}
