import { RemoteInsertOneResult, RemoteUpdateResult } from 'mongodb-stitch-browser-sdk';

import appActions from '../../actions';

import { Matchup, MatchupsState } from '../../types';

const factory = appActions.app().forNamespace<MatchupsState>(MatchupsState.NAMESPACE);

export const {
  list: listMatchups,
  get: getMatchup,
  create: createMatchup,
  createBatch: createMatchups,
  update: updateMatchup,
  clear: clearMatchups,
  remove: removeMatchup,
} = appActions.crud<MatchupsState, Matchup>(factory)(dbs => dbs.app().matchups());

const isRemoteInsertOneResult = (result: any): result is RemoteInsertOneResult => 'insertedId' in result;

export const saveMatchup = factory
  .withType('save')
  .asThunk<[Matchup], RemoteInsertOneResult | RemoteUpdateResult>(matchup => (_dispatch, _getState, stitch) => {
    const coll = stitch
      .clients()
      .db('ffc', 'app')
      .collection<Matchup>('matchups');
    return matchup._id ? coll.updateOne({ _id: matchup._id }, matchup) : coll.insertOne(matchup);
  })
  .withReducer((state, action) => {
    if (action.status === 'success') {
      if (isRemoteInsertOneResult(action.payload)) {
        const _id = action.payload.insertedId;
        const matchup = action.meta.args[0];
        return {
          ...state,
          db: {
            ...state.db,
            [_id.toHexString()]: { _id, ...matchup },
          },
        };
      }
      if (action.payload.modifiedCount) {
        const matchup = action.meta.args[0];
        return {
          ...state,
          db: {
            ...state.db,
            [matchup._id.toHexString()]: matchup,
          },
        };
      }
    }
    return state;
  });
