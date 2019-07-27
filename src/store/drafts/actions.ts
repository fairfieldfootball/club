import { RemoteInsertOneResult, RemoteUpdateResult } from 'mongodb-stitch-browser-sdk';

import appActions from '../../actions';
import { Draft, DraftsState } from '../../types';

const factory = appActions.app().forNamespace<DraftsState>(DraftsState.NAMESPACE);

export const {
  list: listDrafts,
  get: getDraft,
  create: createDraft,
  createBatch: createDrafts,
  update: updateDraft,
  clear: clearDrafts,
  remove: removeDraft,
} = appActions.crud<DraftsState, Draft>(factory)(dbs => dbs.app().drafts());

const isRemoteInsertOneResult = (result: any): result is RemoteInsertOneResult => 'insertedId' in result;

export const saveDraft = factory
  .withType('save')
  .asThunk<[Draft], RemoteInsertOneResult | RemoteUpdateResult>(manager => (_dispatch, _getState, stitch) => {
    const coll = stitch
      .clients()
      .db('ffc', 'app')
      .collection<Draft>('drafts');
    return manager._id ? coll.updateOne({ _id: manager._id }, manager) : coll.insertOne(manager);
  })
  .withReducer((state, action) => {
    if (action.status === 'success') {
      if (isRemoteInsertOneResult(action.payload)) {
        const _id = action.payload.insertedId;
        const manager = action.meta.args[0];
        return {
          ...state,
          db: {
            ...state.db,
            [_id.toHexString()]: { _id, ...manager },
          },
        };
      }
      if (action.payload.modifiedCount) {
        const manager = action.meta.args[0];
        return {
          ...state,
          db: {
            ...state.db,
            [manager._id.toHexString()]: manager,
          },
        };
      }
    }
    return state;
  });
