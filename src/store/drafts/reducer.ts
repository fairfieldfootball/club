import { makesSliceReducer } from '@makes-apps/lib';

import { DraftsState } from '../../types';

import * as actions from './actions';

export default makesSliceReducer(DraftsState.NAMESPACE, new DraftsState(), actions);
