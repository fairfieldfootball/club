import { RemoteInsertOneResult, RemoteUpdateResult } from 'mongodb-stitch-browser-sdk';

import appActions from '../../actions';
import { Manager, ManagersState } from '../../types';

const factory = appActions.app().forNamespace<ManagersState>(ManagersState.NAMESPACE);

export const {
  list: listManagers,
  get: getManager,
  create: createManager,
  createBatch: createManagers,
  update: updateManager,
  clear: clearManagers,
  remove: removeManager,
} = appActions.crud<ManagersState, Manager>(factory)(dbs => dbs.app().managers());

const isRemoteInsertOneResult = (result: any): result is RemoteInsertOneResult => 'insertedId' in result;

export const saveManager = factory
  .withType('save')
  .asThunk<[Manager], RemoteInsertOneResult | RemoteUpdateResult>(manager => (_dispatch, _getState, stitch) => {
    const coll = stitch
      .clients()
      .db('ffc', 'app')
      .collection<Manager>('managers');
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
