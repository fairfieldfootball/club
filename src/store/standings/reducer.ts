import { makesSliceReducer } from '@makes-apps/lib';

import { StandingsState } from '../../types';

import * as actions from './actions';

export default makesSliceReducer(StandingsState.NAMESPACE, new StandingsState(), actions);
