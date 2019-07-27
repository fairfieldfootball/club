import { makesSliceReducer } from '@makes-apps/lib';

import { YahooState } from '../../types';

import * as actions from './actions';

export default makesSliceReducer(YahooState.NAMESPACE, new YahooState(), actions);
