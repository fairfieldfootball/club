import { makesAuthReducer } from '@makes-apps/lib';

import { User } from '../../types';

import actions from './actions';

export default makesAuthReducer<User>(actions);
