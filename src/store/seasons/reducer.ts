import { makesSliceReducer } from '@makes-apps/lib';

import { SeasonsState } from '../../types';

import * as actions from './actions';

export default makesSliceReducer(SeasonsState.NAMESPACE, new SeasonsState(), actions);
