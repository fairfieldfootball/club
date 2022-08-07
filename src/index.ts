import 'core-js';
import 'flatpickr/dist/themes/light.css';

import { AppFactory, debounce, LocalAppState, registerAuthListener } from '@makes-apps/lib';
import App from './app';
import { makesRootReducer, RootContext, RootState, LOCAL_KEY } from './root';
import { authActions, usersActions } from './store';

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

registerAuthListener(auth => {
  let userEmail: string | undefined = undefined;

  if (auth.user) {
    userEmail = auth.user.profile.email;
    store.dispatch<any>(usersActions.list.creator.worker({}));
  }

  store.dispatch(authActions.setUser.creator.action(userEmail));
});

renderApp(App);

if (module.hot) {
  module.hot.accept('./app/app', () => {
    const app = require('./app/app');
    renderApp(app);
  });
}
