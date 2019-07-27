import { makesSliceReducer } from '@makes-apps/lib';

import { FranchisesState } from '../../types';

import * as actions from './actions';

export default makesSliceReducer(FranchisesState.NAMESPACE, new FranchisesState(), actions);
