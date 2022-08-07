import React from 'react';
import { Database, Switch, Route, Loadable } from '@makes-apps/lib';

import { User } from '../types';
import urls from '../urls';

const WelcomePage = Loadable(() => import('../pages').then(module => module.WelcomePage));
const HomePage = Loadable(() => import('../pages').then(module => module.HomePage));
const ProfilePage = Loadable(() => import('../pages').then(module => module.ProfilePage));
const MePage = Loadable(() => import('../pages').then(module => module.MePage));
const AdminPage = Loadable(() => import('../pages').then(module => module.AdminPage));
const ArchivePage = Loadable(() => import('../pages').then(module => module.ArchivePage));
const BlogsPage = Loadable(() => import('../pages').then(module => module.BlogsPage));
const ConstitutionPage = Loadable(() => import('../pages').then(module => module.ConstitutionPage));
const LoginPage = Loadable(() => import('@makes-apps/lib').then(module => module.StackedLoginPage));
const RegisterPage = Loadable(() => import('@makes-apps/lib').then(module => module.StackedRegisterPage));
const EmailConfirmationPage = Loadable(() =>
  import('@makes-apps/lib').then(module => module.StackedEmailConfirmationPage)
);
const PasswordResetPage = Loadable(() => import('@makes-apps/lib').then(module => module.StackedPasswordResetPage));
const ConfirmEmailPage = Loadable(() => import('@makes-apps/lib').then(module => module.StackedConfirmEmailPage));
const ResetPasswordPage = Loadable(() => import('@makes-apps/lib').then(module => module.StackedResetPasswordPage));
const NotFoundPage = Loadable(() => import('@makes-apps/lib').then(module => module.NotFoundPage));

interface Props {
  redirects: { standard: string; reverse: string };
  userEmail?: string;
  users: Database<User>;
  goto: (url: string) => void;
  login: (email: string, password: string) => Promise<any>;
  register: (email: string, password: string) => Promise<void>;
  sendConfirmationEmail: (email: string) => Promise<void>;
  sendPasswordResetEmail: (email: string) => Promise<void>;
  confirmEmail: (token: string, tokenId: string) => Promise<void>;
  resetPassword: (token: string, tokenId: string, password: string) => Promise<void>;
}

const AppRoutes = ({
  userEmail,
  users,
  goto,
  login,
  register,
  sendConfirmationEmail,
  sendPasswordResetEmail,
  confirmEmail,
  resetPassword,
}: Props) => (
  <Switch homeUrl={urls.home} loginUrl={urls.login} userEmail={userEmail} users={users}>
    <Route exact access="open" path={urls.welcome} component={WelcomePage} />
    <Route exact path={urls.home} render={props => <HomePage {...props} year={2019} />} />
    <Route path={urls.profile} component={ProfilePage} />} />
    <Route exact path={urls.me} component={MePage} />
    <Route exact path={urls.admin} component={AdminPage} />
    <Route path={urls.archive.home} component={ArchivePage} />} />
    <Route path={urls.blogs.list} render={props => <BlogsPage {...props} />} />
    <Route exact path={urls.constitution} component={ConstitutionPage} />
    {/* auth routes */}
    <Route
      access="reverse"
      redirectTo={urls.welcome}
      path={urls.login}
      render={() => (
        <LoginPage
          goto={goto}
          login={login}
          urls={{ register: urls.register, passwordReset: urls.passwordReset, confirmation: urls.confirmation }}
        />
      )}
    />
    <Route
      access="reverse"
      path={urls.register}
      render={() => (
        <RegisterPage
          register={register}
          urls={{ login: urls.login, passwordReset: urls.passwordReset, confirmation: urls.confirmation }}
        />
      )}
    />
    <Route
      access="reverse"
      path={urls.confirmation}
      render={() => (
        <EmailConfirmationPage
          sendEmailConfirmation={sendConfirmationEmail}
          urls={{ login: urls.login, register: urls.register }}
        />
      )}
    />
    <Route
      access="open"
      path={urls.passwordReset}
      render={() => (
        <PasswordResetPage
          sendPasswordReset={sendPasswordResetEmail}
          urls={{ login: urls.login, register: urls.register }}
          userEmail={userEmail}
        />
      )}
    />
    <Route
      access="open"
      path={urls.confirmEmail}
      render={({ location }) => (
        <ConfirmEmailPage search={location.search} confirmEmail={confirmEmail} urls={{ login: urls.login }} />
      )}
    />
    <Route
      access="open"
      path={urls.resetPassword}
      render={({ location }) => (
        <ResetPasswordPage
          search={location.search}
          resetPassword={resetPassword}
          urls={{ home: urls.welcome, user: urls.profile }}
        />
      )}
    />
    <Route component={NotFoundPage} />
  </Switch>
);

export default AppRoutes;
