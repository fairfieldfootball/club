import { AuthTypes, BaseDocument } from '@makes-apps/lib';

export interface User extends AuthTypes.BaseUser, BaseDocument {
  first_name: string;
  last_name: string;
}
