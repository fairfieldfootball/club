import { makesSliceReducer } from '@makes-apps/lib';

import { UsersState } from '../../types/users';

import * as actions from './actions';

export default makesSliceReducer(UsersState.NAMESPACE, new UsersState(), actions);
