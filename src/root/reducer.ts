import { makesRootReducer } from '@makes-apps/lib';

import {
  authReducer,
  blogsReducer,
  draftsReducer,
  managersReducer,
  matchupsReducer,
  seasonsReducer,
  standingsReducer,
  usersReducer,
  yahooReducer,
} from '../store';

export default makesRootReducer({
  auth: authReducer,
  blog: blogsReducer,
  drafts: draftsReducer,
  yahoo: yahooReducer,
  managers: managersReducer,
  matchups: matchupsReducer,
  seasons: seasonsReducer,
  standings: standingsReducer,
  users: usersReducer,
});
