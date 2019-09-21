import 'core-js';
import 'flatpickr/dist/themes/light.css';

import { AppFactory, debounce, LocalAppState, registerAuthListener } from '@makes-apps/lib';
import App from './app';
import { makesRootReducer, RootContext, RootState, LOCAL_KEY } from './root';
import { authActions, usersActions } from './store';
import { User } from './types';

const factory = new AppFactory(RootState());

const history = factory.createHistory();
const store = factory.createStore(makesRootReducer(history), RootContext('ffc-sihao'));

store.subscribe(
  debounce(() => {
    const { auth } = store.getState();
    LocalAppState.write(LOCAL_KEY, { user: auth.user });
  }, 500)
);

const renderApp = factory.createRenderer(history, store, 'root');

registerAuthListener(auth =>
  auth.user
    ? store
        .dispatch<any>(usersActions.getUser.creator.worker({ email: auth.user.profile.email }))
        .then((user: User | undefined) => store.dispatch(authActions.setUser.creator.action(user)))
    : store.dispatch(authActions.setUser.creator.action(undefined))
);

renderApp(App);

if (module.hot) {
  module.hot.accept('./app/app', () => {
    const app = require('./app/app');
    renderApp(app);
  });
}
