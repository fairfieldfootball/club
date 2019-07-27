import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';
import { adminActions, Alert, StackedLayout, StackedPageContext, StackedPageInfo } from '@makes-apps/lib';

import { LongLogo, StackedLogo } from '../components';
import { authActions } from '../store';
import { User } from '../types';
import urls from '../urls';

import AppRoutes from './routes';
import { RootState } from '../root';

interface StateProps {
  alerts: Alert[];
  user?: User;
  working: number;
}

interface DispatchProps {
  ackAlert: () => void;
  login: (email: string, password: string) => Promise<any>;
  logout: () => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  sendEmailConfirmation: (email: string) => Promise<void>;
  sendPasswordReset: (email: string) => Promise<void>;
  confirmEmail: (token: string, tokenId: string) => Promise<void>;
  resetPassword: (token: string, tokenId: string, password: string) => Promise<void>;
}

type Props = StateProps & DispatchProps & RouteComponentProps;

interface State extends StackedPageInfo {}

class AppLayout extends React.Component<Props, State> {
  readonly state: State = {};

  setPageInfo = (pageInfo: StackedPageInfo = { activeMenuKey: undefined, byline: undefined, menu: undefined }) =>
    this.setState(() => pageInfo);

  render() {
    const {
      ackAlert,
      location: { pathname: currentRoute },
      login,
      logout,
      register,
      sendEmailConfirmation,
      sendPasswordReset,
      confirmEmail,
      resetPassword,
      user,
      alerts,
      working,
    } = this.props;
    const { activeMenuKey, byline, menu } = this.state;

    const isMe = user && user.type === 'me';
    const isAdmin = user && user.type === 'admin';

    const nav: { [key: string]: string } = {};
    if (isMe) {
      nav['me'] = urls.me;
    }

    if (isMe || isAdmin) {
      nav['admin'] = urls.admin;
    }

    nav['home'] = urls.home;
    nav['archive'] = urls.archive.home;
    nav['blog'] = urls.blog;
    nav['constitution'] = urls.constitution;

    const pageContext: StackedPageContext = {
      activeMenuKey,
      setPageInfo: this.setPageInfo,
      updateMenuKey: activeMenuKey => this.setPageInfo({ activeMenuKey }),
    };

    return (
      <StackedLayout
        currentRoute={currentRoute}
        logo={{
          to: urls.welcome,
          img: largeDisplay => (largeDisplay ? <StackedLogo /> : <LongLogo />),
        }}
        working={working}
        nav={nav}
        user={user}
        logout={logout}
        alerts={alerts}
        ackAlert={ackAlert}
        byline={byline}
        activeMenuKey={activeMenuKey}
        menu={menu}
        setMenuKey={pageContext.updateMenuKey}
        urls={{ login: urls.login }}
      >
        <AppRoutes
          redirects={{ standard: urls.login, reverse: urls.home }}
          user={user}
          login={login}
          register={register}
          sendConfirmationEmail={sendEmailConfirmation}
          sendPasswordResetEmail={sendPasswordReset}
          confirmEmail={confirmEmail}
          resetPassword={resetPassword}
          pageContext={pageContext}
        />
      </StackedLayout>
    );
  }
}

const mapStateToProps = ({ admin, auth }: RootState) => ({
  alerts: admin.alerts,
  user: auth.user,
  working: admin.working,
});

const dispatchProps = {
  ackAlert: adminActions.ackAlert.creator.action,
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
