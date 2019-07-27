import React from 'react';
import Loadable from 'react-loadable';
import { AuthRoutes, AuthRoute, LoadingPage, StackedPageContext } from '@makes-apps/lib';

import { User } from '../types';
import urls from '../urls';

const WelcomePage = Loadable({
  loader: () => import('../pages').then(module => module.WelcomePage),
  loading: LoadingPage,
});
const HomePage = Loadable({
  loader: () => import('../pages').then(module => module.HomePage),
  loading: LoadingPage,
});
const ProfilePage = Loadable({
  loader: () => import('../pages').then(module => module.ProfilePage),
  loading: LoadingPage,
});
const MePage = Loadable({
  loader: () => import('../pages').then(module => module.MePage),
  loading: LoadingPage,
});
const AdminPage = Loadable({
  loader: () => import('../pages').then(module => module.AdminPage),
  loading: LoadingPage,
});
const ArchivePage = Loadable({
  loader: () => import('../pages').then(module => module.ArchivePage),
  loading: LoadingPage,
});
const BlogPage = Loadable({
  loader: () => import('../pages').then(module => module.BlogPage),
  loading: LoadingPage,
});
const ConstitutionPage = Loadable({
  loader: () => import('../pages').then(module => module.ConstitutionPage),
  loading: LoadingPage,
});
const LoginPage = Loadable({
  loader: () => import('@makes-apps/lib').then(module => module.StackedLoginPage),
  loading: LoadingPage,
});
const RegisterPage = Loadable({
  loader: () => import('@makes-apps/lib').then(module => module.StackedRegisterPage),
  loading: LoadingPage,
});
const EmailConfirmationPage = Loadable({
  loader: () => import('@makes-apps/lib').then(module => module.StackedEmailConfirmationPage),
  loading: LoadingPage,
});
const PasswordResetPage = Loadable({
  loader: () => import('@makes-apps/lib').then(module => module.StackedPasswordResetPage),
  loading: LoadingPage,
});
const ConfirmEmailPage = Loadable({
  loader: () => import('@makes-apps/lib').then(module => module.StackedConfirmEmailPage),
  loading: LoadingPage,
});
const ResetPasswordPage = Loadable({
  loader: () => import('@makes-apps/lib').then(module => module.StackedResetPasswordPage),
  loading: LoadingPage,
});

const NotFoundPage = Loadable({
  loader: () => import('@makes-apps/lib').then(module => module.NotFoundPage),
  loading: LoadingPage,
});

interface Props {
  redirects: { standard: string; reverse: string };
  user?: User;
  login: (email: string, password: string) => Promise<any>;
  register: (email: string, password: string) => Promise<void>;
  sendConfirmationEmail: (email: string) => Promise<void>;
  sendPasswordResetEmail: (email: string) => Promise<void>;
  confirmEmail: (token: string, tokenId: string) => Promise<void>;
  pageContext: StackedPageContext;
  resetPassword: (token: string, tokenId: string, password: string) => Promise<void>;
}

const AppRoutes = ({
  redirects,
  user,
  login,
  register,
  sendConfirmationEmail,
  sendPasswordResetEmail,
  confirmEmail,
  resetPassword,
  pageContext,
}: Props) => (
  <AuthRoutes redirects={redirects} user={user}>
    <AuthRoute exact open path={urls.welcome} render={() => <WelcomePage pageContext={pageContext} />} />
    <AuthRoute exact path={urls.home} render={() => <HomePage pageContext={pageContext} year="2019" />} />
    <AuthRoute path={urls.profile} component={ProfilePage} />} />
    <AuthRoute exact path={urls.me} component={MePage} />
    <AuthRoute exact path={urls.admin} render={() => <AdminPage pageContext={pageContext} />} />
    <AuthRoute path={urls.archive.home} component={ArchivePage} />} />
    <AuthRoute path={urls.blog} render={props => <BlogPage {...props} pageContext={pageContext} />} />
    <AuthRoute exact path={urls.constitution} component={ConstitutionPage} />
    {/* auth routes */}
    <AuthRoute
      reverse
      redirectTo={urls.welcome}
      path={urls.login}
      render={() => (
        <LoginPage
          login={login}
          pageContext={pageContext}
          urls={{ register: urls.register, passwordReset: urls.passwordReset, confirmation: urls.confirmation }}
        />
      )}
    />
    <AuthRoute
      reverse
      path={urls.register}
      render={() => (
        <RegisterPage
          register={register}
          pageContext={pageContext}
          urls={{ login: urls.login, passwordReset: urls.passwordReset, confirmation: urls.confirmation }}
        />
      )}
    />
    <AuthRoute
      reverse
      path={urls.confirmation}
      render={() => (
        <EmailConfirmationPage
          sendEmailConfirmation={sendConfirmationEmail}
          pageContext={pageContext}
          urls={{ login: urls.login, register: urls.register }}
        />
      )}
    />
    <AuthRoute
      open
      path={urls.passwordReset}
      render={() => (
        <PasswordResetPage
          sendPasswordReset={sendPasswordResetEmail}
          pageContext={pageContext}
          urls={{ login: urls.login, register: urls.register }}
          user={user}
        />
      )}
    />
    <AuthRoute
      open
      path={urls.confirmEmail}
      render={({ location }) => (
        <ConfirmEmailPage
          search={location.search}
          pageContext={pageContext}
          confirmEmail={confirmEmail}
          urls={{ login: urls.login }}
        />
      )}
    />
    <AuthRoute
      open
      path={urls.resetPassword}
      render={({ location }) => (
        <ResetPasswordPage
          search={location.search}
          resetPassword={resetPassword}
          pageContext={pageContext}
          urls={{ home: urls.welcome, user: urls.profile }}
        />
      )}
    />
    <AuthRoute component={NotFoundPage} />
  </AuthRoutes>
);

export default AppRoutes;
