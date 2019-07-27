import { makesSliceReducer } from '@makes-apps/lib';

import { ManagersState } from '../../types';

import * as actions from './actions';

export default makesSliceReducer(ManagersState.NAMESPACE, new ManagersState(), actions);
