import appActions from '../../actions';
import { User, UsersState } from '../../types/users';

const factory = appActions.app().forNamespace<UsersState>(UsersState.NAMESPACE);

export const { list, get, create, createBatch, update, clear, remove } = appActions.crud<UsersState, User>(factory)(
  dbs => dbs.auth().users()
);
