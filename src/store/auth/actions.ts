import { adminActions, makesAuthActions } from '@makes-apps/lib';
import { UserPasswordCredential } from 'mongodb-stitch-browser-sdk';

import { RootContext, RootState } from '../../root';

export default makesAuthActions<RootState, RootContext>(
  'Fairfield Football Club',
  {
    addAlert: adminActions.addAlert.creator.action,
    startWork: adminActions.startWork.creator.action,
    endWork: adminActions.endWork.creator.action,
  },
  stitch => ({
    login: (email: string, password: string) =>
      stitch.stitch.auth.loginWithCredential(new UserPasswordCredential(email, password)),
    logout: () => stitch.stitch.auth.logout(),
    register: (email: string, password: string) => stitch.clients().emailPassword.registerWithEmail(email, password),
    sendConfirmationEmail: (email: string) => stitch.clients().emailPassword.resendConfirmationEmail(email),
    sendPasswordResetEmail: (email: string) => stitch.clients().emailPassword.sendResetPasswordEmail(email),
    confirmEmail: (token: string, tokenId: string) => stitch.clients().emailPassword.confirmUser(token, tokenId),
    resetPassword: (token: string, tokenId: string, password: string) =>
      stitch.clients().emailPassword.resetPassword(token, tokenId, password),
  })
);
