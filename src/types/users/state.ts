import { BaseMongoCrudState } from '@makes-apps/lib';

import { User } from './user';

class UsersState extends BaseMongoCrudState<User> {
  static NAMESPACE = 'users';
}

export default UsersState;
