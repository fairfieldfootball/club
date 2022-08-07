import { BaseMongoCrudState } from '@makes-apps/lib';

import { User } from './user';

class State extends BaseMongoCrudState<User> {
  static NAMESPACE = 'users';
}

export default State;
