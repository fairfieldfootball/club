import { AuthState, LocalAppState, makesAppState } from '@makes-apps/lib';

import {
  BlogsState,
  DraftsState,
  ManagersState,
  MatchupsState,
  SeasonsState,
  StandingsState,
  UsersState,
  YahooState,
} from '../types';

import APP_LOCAL_KEY from './local_key';

const initialState = LocalAppState.read(APP_LOCAL_KEY);

const AppState = makesAppState({
  auth: new AuthState(initialState.user),
  blog: new BlogsState(),
  drafts: new DraftsState(),
  managers: new ManagersState(),
  matchups: new MatchupsState(),
  seasons: new SeasonsState(),
  standings: new StandingsState(),
  users: new UsersState(),
  yahoo: new YahooState(),
});
interface AppState extends ReturnType<typeof AppState> {}

export default AppState;
