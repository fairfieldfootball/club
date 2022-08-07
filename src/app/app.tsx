import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';
import { adminActions, findUser, Alert, AppProvider, RouterActions } from '@makes-apps/lib';

import { LongLogo, StackedLogo } from '../components';
import { authActions } from '../store';
import { User } from '../types';
import urls from '../urls';

import AppRoutes from './routes';
import { RootState } from '../root';

import Mantra from './mantra';

interface StateProps {
  alerts: Alert[];
  userEmail?: string;
  users?: { [key: string]: User };
  working: number;
}

interface DispatchProps {
  ackAlert: () => void;
  goto: (url: string) => void;
  login: (email: string, password: string) => Promise<any>;
  logout: () => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  sendEmailConfirmation: (email: string) => Promise<void>;
  sendPasswordReset: (email: string) => Promise<void>;
  confirmEmail: (token: string, tokenId: string) => Promise<void>;
  resetPassword: (token: string, tokenId: string, password: string) => Promise<void>;
}

type Props = StateProps & DispatchProps & RouteComponentProps;

class AppLayout extends React.Component<Props> {
  render() {
    const {
      ackAlert,
      goto,
      location: { pathname: currentRoute },
      login,
      logout,
      register,
      sendEmailConfirmation,
      sendPasswordReset,
      confirmEmail,
      resetPassword,
      userEmail,
      users = {},
      alerts,
      working,
    } = this.props;
    const user = findUser(userEmail, users);

    const isMe = user && user.type === 'me';
    const isAdmin = user && user.type === 'admin';

    const nav: { [key: string]: string } = {};
    if (isMe) {
      nav[urls.me] = 'me';
    }

    if (isMe || isAdmin) {
      nav[urls.admin] = 'admin';
    }

    nav[urls.home] = 'home';
    nav[urls.archive.home] = 'archive';
    nav[urls.blogs.list] = 'blogs';
    nav[urls.constitution] = 'constitution';

    return (
      <AppProvider
        name="makes-apps"
        options={{
          primaryColor: 'blue',
          secondaryColor: 'gray',
          logoFont: 'Coming Soon, sans-serif',
          headingFont: 'Permanent Marker, sans-serif',
          bodyFont: 'Gaegu, serif',
        }}
      >
        {LayoutProvider => (
          <LayoutProvider>
            {({ StackedLayout }) => (
              <StackedLayout
                ackAlert={ackAlert}
                alerts={alerts}
                credits={[
                  { icon: 'GithubIcon', href: 'https://github.com/fairfieldfootball/club', text: 'Github' },
                  { icon: 'MongodbIcon', href: 'https://cloud.mongodb.com', text: 'MongoDB' },
                ]}
                currentRoute={currentRoute}
                emailConfirmationlUrl={urls.confirmation}
                loginUrl={urls.login}
                logo={{
                  to: urls.welcome,
                  render: ({ atLeastMega }) => (atLeastMega ? <StackedLogo /> : <LongLogo />),
                }}
                logout={logout}
                mantra={<Mantra />}
                navbar={nav}
                passwordResetUrl={urls.passwordReset}
                profileUrl={urls.profile}
                registerUrl={urls.register}
                user={user}
                working={working > 0}
              >
                <AppRoutes
                  redirects={{ standard: urls.login, reverse: urls.home }}
                  userEmail={userEmail}
                  users={users}
                  goto={goto}
                  login={login}
                  register={register}
                  sendConfirmationEmail={sendEmailConfirmation}
                  sendPasswordResetEmail={sendPasswordReset}
                  confirmEmail={confirmEmail}
                  resetPassword={resetPassword}
                />
              </StackedLayout>
            )}
          </LayoutProvider>
        )}
      </AppProvider>
    );
  }
}

const mapStateToProps = ({ admin, auth, users }: RootState) => ({
  alerts: admin.alerts,
  userEmail: auth.userEmail,
  users: users.db,
  working: admin.working,
});

const dispatchProps = {
  ackAlert: adminActions.ackAlert.creator.action,
  goto: RouterActions.goto.creator.worker,
  login: authActions.login.creator.worker,
  logout: authActions.logout.creator.worker,
  register: authActions.register.creator.worker,
  sendEmailConfirmation: authActions.sendConfirmationEmail.creator.worker,
  sendPasswordReset: authActions.sendPasswordResetEmail.creator.worker,
  confirmEmail: authActions.confirmEmail.creator.worker,
  resetPassword: authActions.resetPassword.creator.worker,
};

export default withRouter(
  connect(
    mapStateToProps,
    dispatchProps
  )(AppLayout)
);
