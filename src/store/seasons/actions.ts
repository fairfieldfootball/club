import { RemoteInsertOneResult, RemoteUpdateResult } from 'mongodb-stitch-browser-sdk';

import appActions from '../../actions';
import { Season, SeasonsState } from '../../types';

const factory = appActions.app().forNamespace<SeasonsState>(SeasonsState.NAMESPACE);

export const {
  list: listSeasons,
  get: getSeason,
  create: createSeason,
  createBatch: createSeasons,
  update: updateSeason,
  clear: clearSeasons,
  remove: removeSeason,
} = appActions.crud<SeasonsState, Season>(factory)(dbs => dbs.app().seasons());

const isRemoteInsertOneResult = (result: any): result is RemoteInsertOneResult => 'insertedId' in result;

export const saveSeason = factory
  .withType('save')
  .asThunk<[Season], RemoteInsertOneResult | RemoteUpdateResult>(season => (_dispatch, _getState, stitch) => {
    const coll = stitch
      .clients()
      .db('ffc', 'app')
      .collection<Season>('seasons');
    return season._id ? coll.updateOne({ _id: season._id }, season) : coll.insertOne(season);
  })
  .withReducer((state, action) => {
    if (action.status === 'success') {
      if (isRemoteInsertOneResult(action.payload)) {
        const _id = action.payload.insertedId;
        const season = action.meta.args[0];
        return {
          ...state,
          db: {
            ...state.db,
            [_id.toHexString()]: { _id, ...season },
          },
        };
      }
      if (action.payload.modifiedCount) {
        const season = action.meta.args[0];
        return {
          ...state,
          db: {
            ...state.db,
            [season._id.toHexString()]: season,
          },
        };
      }
    }
    return state;
  });
