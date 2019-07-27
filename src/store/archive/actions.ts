import appActions from '../../actions';
import { Franchise, FranchisesState } from '../../types';

const factory = appActions.app().forNamespace<FranchisesState>(FranchisesState.NAMESPACE);

export const {
  list: listFranchises,
  get: getFranchises,
  create: createFranchise,
  createBatch: createFranchises,
  update: updateFranchise,
  clear: clearFranchises,
  remove: removeFranchise,
} = appActions.crud<FranchisesState, Franchise>(factory)(dbs => dbs.app().franchises());
