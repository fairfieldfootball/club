import appActions from '../../actions';
import { User, UsersState } from '../../types';

const factory = appActions.app().forNamespace<UsersState>(UsersState.NAMESPACE);

export const {
  list: listUsers,
  get: getUser,
  create: createUser,
  createBatch: createUsers,
  update: updateUser,
  clear: clearUsers,
  remove: removeUser,
} = appActions.crud<UsersState, User>(factory)(dbs => dbs.auth().users());
