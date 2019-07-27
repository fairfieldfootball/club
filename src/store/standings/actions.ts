import { RemoteInsertOneResult, RemoteUpdateResult } from 'mongodb-stitch-browser-sdk';

import appActions from '../../actions';
import { Standings, StandingsState } from '../../types';

const factory = appActions.app().forNamespace<StandingsState>(StandingsState.NAMESPACE);

export const {
  list: listStandings,
  get: getStandings,
  create: createStandings,
  createBatch: createManyStandings,
  update: updateStandings,
  clear: clearAllStandings,
  remove: removeStandings,
} = appActions.crud<StandingsState, Standings>(factory)(dbs => dbs.app().standings());

const isRemoteInsertOneResult = (result: any): result is RemoteInsertOneResult => 'insertedId' in result;

export const saveStandings = factory
  .withType('save')
  .asThunk<[Standings], RemoteInsertOneResult | RemoteUpdateResult>(standings => (_dispatch, _getState, stitch) => {
    const coll = stitch
      .clients()
      .db('ffc', 'app')
      .collection<Standings>('standings');
    return standings._id ? coll.updateOne({ _id: standings._id }, standings) : coll.insertOne(standings);
  })
  .withReducer((state, action) => {
    if (action.status === 'success') {
      if (isRemoteInsertOneResult(action.payload)) {
        const _id = action.payload.insertedId;
        const standings = action.meta.args[0];
        return {
          ...state,
          db: {
            ...state.db,
            [_id.toHexString()]: { _id, ...standings },
          },
        };
      }
      if (action.payload.modifiedCount) {
        const standings = action.meta.args[0];
        return {
          ...state,
          db: {
            ...state.db,
            [standings._id.toHexString()]: standings,
          },
        };
      }
    }
    return state;
  });
