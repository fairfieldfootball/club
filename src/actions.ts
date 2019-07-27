import { makesMongoCrudActions, ActionFactory, AppActions, BaseMongoCrudState } from '@makes-apps/lib';
import { RemoteMongoCollection } from 'mongodb-stitch-browser-sdk';

import dbs from './dbs';
import { RootContext, RootState } from './root';

export default {
  app: () => AppActions<RootState, RootContext>(),
  crud: <STATE extends BaseMongoCrudState<DOC>, DOC>(factory: ActionFactory<RootContext, STATE>) => (
    coll: (dbMap: ReturnType<typeof dbs>) => RemoteMongoCollection<DOC>
  ) => makesMongoCrudActions<RootContext, STATE, DOC>(factory, c => coll(dbs(c))),
};
