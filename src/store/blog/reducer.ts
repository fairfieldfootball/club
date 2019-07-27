import { makesSliceReducer } from '@makes-apps/lib';

import { BlogsState } from '../../types';

import * as actions from './actions';

export default makesSliceReducer(BlogsState.NAMESPACE, new BlogsState(), actions);
