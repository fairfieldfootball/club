import { makesSliceReducer } from '@makes-apps/lib';

import { MatchupsState } from '../../types';

import * as actions from './actions';

export default makesSliceReducer(MatchupsState.NAMESPACE, new MatchupsState(), actions);
